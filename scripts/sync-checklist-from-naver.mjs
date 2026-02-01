#!/usr/bin/env node
/**
 * Sync a Naver Blog post body into a local JSON file for the checklist page.
 *
 * Why: avoids pasting long copyrighted text into source diffs, while keeping
 *      the on-site page identical to the original post (verbatim).
 *
 * Usage:
 *   node scripts/sync-checklist-from-naver.mjs
 *
 * Options (env):
 *   NAVER_BLOG_ID=umnagumo
 *   NAVER_LOG_NO=223849151079
 *   OUT_FILE=public/content/checklist-naver-post.json
 *   OUT_DIR=public/content/naver
 *   INTERNAL_ROUTE_BASE=/checklist
 *   MAX_DEPTH=1 (how many link-hops to also sync)
 *   MAX_POSTS=25 (safety cap)
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const blogId = process.env.NAVER_BLOG_ID ?? 'umnagumo';
const logNo = process.env.NAVER_LOG_NO ?? '223849151079';
const outFile = process.env.OUT_FILE ?? path.join('public', 'content', 'checklist-naver-post.json');
const outDir = process.env.OUT_DIR ?? path.join('public', 'content', 'naver');
const internalRouteBase = process.env.INTERNAL_ROUTE_BASE ?? '/checklist';
const maxDepth = Number.parseInt(process.env.MAX_DEPTH ?? '1', 10);
const maxPosts = Number.parseInt(process.env.MAX_POSTS ?? '25', 10);

function toPostViewUrl({ blogId: postBlogId, logNo: postLogNo }) {
  const postViewUrl = new URL('https://blog.naver.com/PostView.naver');
  postViewUrl.searchParams.set('blogId', postBlogId);
  postViewUrl.searchParams.set('logNo', postLogNo);
  postViewUrl.searchParams.set('redirect', 'Dlog');
  postViewUrl.searchParams.set('widgetTypeCall', 'true');
  postViewUrl.searchParams.set('noTrackingCode', 'true');
  postViewUrl.searchParams.set('directAccess', 'false');
  return postViewUrl;
}

function extractMetaOgTitle(html) {
  const match = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  return match?.[1]?.trim() ?? null;
}

function extractDivOuterHtml(html, className) {
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

function stripScripts(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

function stripEventHandlers(html) {
  // Remove inline `on*=` handlers (safety). Keep other attributes untouched.
  return html.replace(/\son[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, '');
}

function normalizeLazyImages(html) {
  // Naver often uses `data-lazy-src` or `data-src` with a placeholder `src`.
  // Make sure `src` always points at the real image URL.
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

function extractHrefs(html) {
  const hrefs = [];
  for (const match of html.matchAll(/\bhref\s*=\s*("([^"]*)"|'([^']*)')/gi)) {
    const value = (match[2] ?? match[3] ?? '').trim();
    if (value) hrefs.push(value);
  }
  return hrefs;
}

function parseNaverPostUrl(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  const isNaverBlog = host === 'blog.naver.com' || host === 'm.blog.naver.com';
  if (!isNaverBlog) return null;

  // PostView URL style
  if (url.pathname.toLowerCase().endsWith('/postview.naver')) {
    const parsedBlogId = url.searchParams.get('blogId')?.trim();
    const parsedLogNo = url.searchParams.get('logNo')?.trim();
    if (!parsedBlogId || !parsedLogNo) return null;
    return { blogId: parsedBlogId, logNo: parsedLogNo };
  }

  const parts = url.pathname.split('/').filter(Boolean);
  // Short URL style: /{blogId}/{logNo}
  if (parts.length >= 2) {
    const parsedBlogId = parts[0];
    const parsedLogNo = parts[1];
    if (!parsedBlogId || !parsedLogNo) return null;
    return { blogId: parsedBlogId, logNo: parsedLogNo };
  }

  // Redirect style: /{blogId}?Redirect=Log&logNo=...
  if (parts.length === 1) {
    const parsedBlogId = parts[0];
    const parsedLogNo = url.searchParams.get('logNo')?.trim();
    if (!parsedBlogId || !parsedLogNo) return null;
    return { blogId: parsedBlogId, logNo: parsedLogNo };
  }

  return null;
}

function rewriteInternalLinks(html, { internalKeys, internalRouteBase }) {
  return html.replace(/\bhref\s*=\s*("([^"]*)"|'([^']*)')/gi, (full, _q, d, s) => {
    const href = (d ?? s ?? '').trim();
    const parsed = parseNaverPostUrl(href);
    if (!parsed) return full;

    const key = `${parsed.blogId}:${parsed.logNo}`;
    if (!internalKeys.has(key)) return full;

    return `href="${internalRouteBase}/${parsed.logNo}"`;
  });
}

function stripTargetBlankOnInternalLinks(html, { internalRouteBase }) {
  const routeBase = internalRouteBase.replace(/\/+$/, '');
  const escaped = routeBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const anchorPattern = new RegExp(`<a\\b[^>]*\\bhref\\s*=\\s*("|\')${escaped}\\/\\d+\\1[^>]*>`, 'gi');

  return html.replace(anchorPattern, (tag) =>
    tag.replace(/\s*target\s*=\s*("([^"]*)"|'([^']*)'|[^\s>]+)/i, '')
  );
}

async function fetchPost({ blogId: postBlogId, logNo: postLogNo }) {
  const postViewUrl = toPostViewUrl({ blogId: postBlogId, logNo: postLogNo });
  const response = await fetch(postViewUrl, {
    redirect: 'follow',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch PostView (${response.status}): ${postViewUrl.toString()}`);
  }

  const html = await response.text();
  const title = extractMetaOgTitle(html);
  if (!title) throw new Error(`Failed to extract og:title from PostView HTML (${postBlogId}/${postLogNo})`);

  const seMain = extractDivOuterHtml(html, 'se-main-container');
  if (!seMain) throw new Error(`Failed to extract .se-main-container from PostView HTML (${postBlogId}/${postLogNo})`);

  const cleaned = normalizeLazyImages(stripEventHandlers(stripScripts(seMain))).trim();

  return {
    source: postViewUrl.toString(),
    blogId: postBlogId,
    logNo: postLogNo,
    title,
    fetchedAt: new Date().toISOString(),
    html: cleaned,
  };
}

async function crawlPosts({ blogId: rootBlogId, logNo: rootLogNo, maxDepth, maxPosts }) {
  const queue = [{ blogId: rootBlogId, logNo: rootLogNo, depth: 0 }];
  const posts = new Map();

  while (queue.length > 0) {
    if (posts.size >= maxPosts) break;

    const next = queue.shift();
    if (!next) break;

    const key = `${next.blogId}:${next.logNo}`;
    if (posts.has(key)) continue;

    const payload = await fetchPost({ blogId: next.blogId, logNo: next.logNo });
    posts.set(key, payload);

    if (next.depth >= maxDepth) continue;

    for (const href of extractHrefs(payload.html)) {
      const parsed = parseNaverPostUrl(href);
      if (!parsed) continue;
      if (parsed.blogId !== rootBlogId) continue; // safety: only mirror own blog

      const childKey = `${parsed.blogId}:${parsed.logNo}`;
      if (posts.has(childKey)) continue;

      queue.push({ blogId: parsed.blogId, logNo: parsed.logNo, depth: next.depth + 1 });
    }
  }

  return posts;
}

async function main() {
  if (!Number.isFinite(maxDepth) || maxDepth < 0) throw new Error(`Invalid MAX_DEPTH: ${process.env.MAX_DEPTH}`);
  if (!Number.isFinite(maxPosts) || maxPosts < 1) throw new Error(`Invalid MAX_POSTS: ${process.env.MAX_POSTS}`);

  const posts = await crawlPosts({ blogId, logNo, maxDepth, maxPosts });
  const internalKeys = new Set(posts.keys());

  // Rewrite links only to posts we actually mirrored.
  for (const [key, payload] of posts) {
    const withInternalLinks = rewriteInternalLinks(payload.html, { internalKeys, internalRouteBase });
    posts.set(key, {
      ...payload,
      html: stripTargetBlankOnInternalLinks(withInternalLinks, { internalRouteBase }),
    });
  }

  // 1) Write individual post JSON files (for internal routes)
  for (const payload of posts.values()) {
    const outPath = path.resolve(outDir, payload.blogId, `${payload.logNo}.json`);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, JSON.stringify(payload, null, 2), 'utf8');
  }

  // 2) Write the checklist alias file (used by /checklist)
  const rootKey = `${blogId}:${logNo}`;
  const rootPayload = posts.get(rootKey);
  if (!rootPayload) throw new Error('Internal error: missing root payload after crawl');

  const aliasPath = path.resolve(outFile);
  await fs.mkdir(path.dirname(aliasPath), { recursive: true });
  await fs.writeFile(aliasPath, JSON.stringify(rootPayload, null, 2), 'utf8');

  process.stdout.write(`Synced posts: ${posts.size}\n`);
  process.stdout.write(`Root: ${aliasPath}\n`);
  process.stdout.write(`Dir: ${path.resolve(outDir, blogId)}\n`);
  process.stdout.write(`Title: ${rootPayload.title}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exit(1);
});
