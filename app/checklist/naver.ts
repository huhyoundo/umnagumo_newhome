import { cache } from 'react';
import fs from 'fs/promises';
import path from 'path';

export type NaverPostPayload = {
  title: string;
  html: string;
  source?: string;
  blogId?: string;
  logNo?: string;
  fetchedAt?: string;
};

export type LocalNaverPostIndexEntry = Pick<NaverPostPayload, 'title' | 'source' | 'blogId' | 'logNo' | 'fetchedAt'> & {
  blogId: string;
  logNo: string;
  title: string;
};

const DEFAULT_NAVER_BLOG_ID = process.env.NAVER_BLOG_ID ?? 'umnagumo';
const DEFAULT_NAVER_LOG_NO = process.env.NAVER_LOG_NO ?? '223849151079';
const INTERNAL_ROUTE_BASE = '/checklist';
const REVALIDATE_SECONDS = Number.parseInt(process.env.NAVER_POST_REVALIDATE_SECONDS ?? '86400', 10);

export const getLocalNaverPostIndex = cache(async (): Promise<LocalNaverPostIndexEntry[]> => {
  const dir = path.join(process.cwd(), 'public', 'content', 'naver', DEFAULT_NAVER_BLOG_ID);

  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }

  const entries: LocalNaverPostIndexEntry[] = [];
  for (const file of files) {
    if (!file.toLowerCase().endsWith('.json')) continue;
    const match = file.match(/^(\d+)\.json$/);
    if (!match) continue;

    const logNo = match[1];
    try {
      const filePath = path.join(dir, file);
      const raw = await fs.readFile(filePath, 'utf-8');
      const payload = JSON.parse(raw) as NaverPostPayload;
      if (!payload?.title || !payload?.html) continue;

      entries.push({
        blogId: payload.blogId ?? DEFAULT_NAVER_BLOG_ID,
        logNo: payload.logNo ?? logNo,
        title: payload.title,
        fetchedAt: payload.fetchedAt,
        source: payload.source,
      });
    } catch {
      continue;
    }
  }

  return entries.sort((a, b) => {
    const aTime = a.fetchedAt ? Date.parse(a.fetchedAt) : 0;
    const bTime = b.fetchedAt ? Date.parse(b.fetchedAt) : 0;
    if (aTime !== bTime) return bTime - aTime;
    return b.logNo.localeCompare(a.logNo);
  });
});

function toPostViewUrl({ blogId, logNo }: { blogId: string; logNo: string }) {
  const url = new URL('https://blog.naver.com/PostView.naver');
  url.searchParams.set('blogId', blogId);
  url.searchParams.set('logNo', logNo);
  url.searchParams.set('redirect', 'Dlog');
  url.searchParams.set('widgetTypeCall', 'true');
  url.searchParams.set('noTrackingCode', 'true');
  url.searchParams.set('directAccess', 'false');
  return url;
}

function extractMetaOgTitle(html: string) {
  const match = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  return match?.[1]?.trim() ?? null;
}

function extractDivOuterHtml(html: string, className: string) {
  const startMatch = html.match(new RegExp(`<div[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>`, 'i'));
  if (!startMatch || startMatch.index == null) return null;

  const startIndex = startMatch.index;
  const startTag = startMatch[0];
  let cursor = startIndex + startTag.length;
  let depth = 1;

  while (cursor < html.length) {
    const nextOpen = html.indexOf('<div', cursor);
    const nextClose = html.indexOf('</div', cursor);

    if (nextClose === -1) return null;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      cursor = nextOpen + 4;
      continue;
    }

    depth -= 1;
    const closeEnd = html.indexOf('>', nextClose);
    if (closeEnd === -1) return null;

    cursor = closeEnd + 1;
    if (depth === 0) {
      return html.slice(startIndex, cursor);
    }
  }

  return null;
}

function stripScripts(html: string) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

function stripEventHandlers(html: string) {
  return html.replace(/\son[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, '');
}

function normalizeLazyImages(html: string) {
  return html.replace(/<img\b[^>]*>/gi, (imgTag) => {
    const dataLazy = imgTag.match(/\bdata-lazy-src\s*=\s*("([^"]*)"|'([^']*)')/i);
    const dataSrc = imgTag.match(/\bdata-src\s*=\s*("([^"]*)"|'([^']*)')/i);
    const preferred = (dataLazy?.[2] ?? dataLazy?.[3] ?? dataSrc?.[2] ?? dataSrc?.[3] ?? '').trim();
    if (!preferred) return imgTag;

    const hasSrc = /\bsrc\s*=\s*("([^"]*)"|'([^']*)')/i.test(imgTag);
    if (hasSrc) {
      return imgTag.replace(/\bsrc\s*=\s*("([^"]*)"|'([^']*)')/i, `src="${preferred}"`);
    }

    return imgTag.replace(/<img\b/i, `<img src="${preferred}"`);
  });
}

function parseNaverPostUrl(rawUrl: string) {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  const isNaverBlog = host === 'blog.naver.com' || host === 'm.blog.naver.com';
  if (!isNaverBlog) return null;

  if (url.pathname.toLowerCase().endsWith('/postview.naver')) {
    const parsedBlogId = url.searchParams.get('blogId')?.trim();
    const parsedLogNo = url.searchParams.get('logNo')?.trim();
    if (!parsedBlogId || !parsedLogNo) return null;
    return { blogId: parsedBlogId, logNo: parsedLogNo };
  }

  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length >= 2) {
    const parsedBlogId = parts[0];
    const parsedLogNo = parts[1];
    if (!parsedBlogId || !parsedLogNo) return null;
    return { blogId: parsedBlogId, logNo: parsedLogNo };
  }

  if (parts.length === 1) {
    const parsedBlogId = parts[0];
    const parsedLogNo = url.searchParams.get('logNo')?.trim();
    if (!parsedBlogId || !parsedLogNo) return null;
    return { blogId: parsedBlogId, logNo: parsedLogNo };
  }

  return null;
}

function rewriteLinksToInternalRoutes(html: string, { blogId, internalRouteBase }: { blogId: string; internalRouteBase: string }) {
  return html.replace(/\bhref\s*=\s*("([^"]*)"|'([^']*)')/gi, (full, _q, d, s) => {
    const href = (d ?? s ?? '').trim();
    const parsed = parseNaverPostUrl(href);
    if (!parsed) return full;
    if (parsed.blogId !== blogId) return full;
    if (!/^\d+$/.test(parsed.logNo)) return full;
    return `href="${internalRouteBase}/${parsed.logNo}"`;
  });
}

function stripTargetBlankOnInternalLinks(html: string, { internalRouteBase }: { internalRouteBase: string }) {
  const routeBase = internalRouteBase.replace(/\/+$/, '');
  const escaped = routeBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const anchorPattern = new RegExp(`<a\\b[^>]*\\bhref\\s*=\\s*("|\')${escaped}\\/\\d+\\1[^>]*>`, 'gi');

  return html.replace(anchorPattern, (tag) =>
    tag.replace(/\s*target\s*=\s*("([^"]*)"|'([^']*)'|[^\s>]+)/i, '')
  );
}


export const getNaverPostByLogNo = cache(async (logNo: string): Promise<NaverPostPayload | null> => {
  const resolvedLogNo = logNo || DEFAULT_NAVER_LOG_NO;

  // Priority: Read from local JSON file for the main checklist to support custom edits
  if (resolvedLogNo === DEFAULT_NAVER_LOG_NO) {
    try {
      const localFilePath = path.join(process.cwd(), 'public', 'content', 'checklist-naver-post.json');
      const fileContent = await fs.readFile(localFilePath, 'utf-8');
      const payload = JSON.parse(fileContent) as NaverPostPayload;

      if (payload) {
        // Apply link rewriting + cleanup even for local file
        // 1. Rewrite internal links
        const withInternalLinks = rewriteLinksToInternalRoutes(payload.html, {
          blogId: DEFAULT_NAVER_BLOG_ID,
          internalRouteBase: INTERNAL_ROUTE_BASE
        });

        // 2. Strip target="_blank" so they open in same tab
        const finalHtml = stripTargetBlankOnInternalLinks(withInternalLinks, {
          internalRouteBase: INTERNAL_ROUTE_BASE
        });

        return {
          ...payload,
          html: finalHtml
        };
      }
    } catch (error) {
      // Ignore error and fall back to fetch
      console.warn('Local checklist file not found or invalid, falling back to fetch:', error);
    }
  }

  if (!/^\d+$/.test(resolvedLogNo)) return null;

  // Prefer local cached JSON posts when available (generated by scripts/sync-checklist-from-naver.mjs)
  try {
    const cachedPath = path.join(
      process.cwd(),
      'public',
      'content',
      'naver',
      DEFAULT_NAVER_BLOG_ID,
      `${resolvedLogNo}.json`
    );
    const raw = await fs.readFile(cachedPath, 'utf-8');
    const payload = JSON.parse(raw) as NaverPostPayload;

    if (payload?.html && payload?.title) {
      const withInternalLinks = rewriteLinksToInternalRoutes(payload.html, {
        blogId: DEFAULT_NAVER_BLOG_ID,
        internalRouteBase: INTERNAL_ROUTE_BASE,
      });

      const finalHtml = stripTargetBlankOnInternalLinks(withInternalLinks, {
        internalRouteBase: INTERNAL_ROUTE_BASE,
      });

      return {
        ...payload,
        blogId: payload.blogId ?? DEFAULT_NAVER_BLOG_ID,
        logNo: payload.logNo ?? resolvedLogNo,
        html: finalHtml,
      };
    }
  } catch {
    // Ignore and fall back to fetch
  }

  const resolvedRevalidate = Number.isFinite(REVALIDATE_SECONDS) && REVALIDATE_SECONDS >= 0 ? REVALIDATE_SECONDS : 86400;
  const postViewUrl = toPostViewUrl({ blogId: DEFAULT_NAVER_BLOG_ID, logNo: resolvedLogNo });

  const response = await fetch(postViewUrl, {
    redirect: 'follow',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    },
    next: { revalidate: resolvedRevalidate },
  });

  if (!response.ok) return null;

  const html = await response.text();
  const title = extractMetaOgTitle(html);
  if (!title) return null;

  const seMain = extractDivOuterHtml(html, 'se-main-container');
  if (!seMain) return null;

  const cleaned = normalizeLazyImages(stripEventHandlers(stripScripts(seMain))).trim();
  const withInternalLinks = rewriteLinksToInternalRoutes(cleaned, { blogId: DEFAULT_NAVER_BLOG_ID, internalRouteBase: INTERNAL_ROUTE_BASE });
  const finalHtml = stripTargetBlankOnInternalLinks(withInternalLinks, { internalRouteBase: INTERNAL_ROUTE_BASE });

  return {
    source: postViewUrl.toString(),
    blogId: DEFAULT_NAVER_BLOG_ID,
    logNo: resolvedLogNo,
    title,
    fetchedAt: new Date().toISOString(),
    html: finalHtml,
  };
});
