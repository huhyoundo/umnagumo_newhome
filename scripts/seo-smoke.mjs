#!/usr/bin/env node
/**
 * SEO smoke checks (no test runner needed).
 *
 * Usage:
 *   BASE_URL=https://www.bust1.com node scripts/seo-smoke.mjs
 */

const baseUrl = (process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

const paths = {
  modal: process.env.MODAL_PATH ?? '/before-after/(.)21',
  case: process.env.CASE_PATH ?? '/before-after/21',
  namStyle: process.env.NAM_STYLE_PATH ?? '/nam-style',
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getTitle(html) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1]?.trim() ?? null;
}

function getLinkHref(html, rel) {
  const pattern = new RegExp(
    `<link[^>]*\\brel=["']${escapeRegExp(rel)}["'][^>]*\\bhref=["']([^"']+)["'][^>]*>`,
    'i'
  );
  const match = html.match(pattern);
  return match?.[1]?.trim() ?? null;
}

function getMetaContent(html, key) {
  const escapedKey = escapeRegExp(key);
  const pattern = new RegExp(
    `<meta[^>]*\\b(?:name|property)=["']${escapedKey}["'][^>]*\\bcontent=["']([^"']+)["'][^>]*>`,
    'i'
  );
  const match = html.match(pattern);
  return match?.[1]?.trim() ?? null;
}

async function fetchHtml(pathname) {
  const url = new URL(pathname, baseUrl);
  const response = await fetch(url, { redirect: 'follow' });
  const body = await response.text();
  return { url: url.toString(), status: response.status, body };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const failures = [];

  async function check(name, fn) {
    try {
      await fn();
      process.stdout.write(`PASS ${name}\n`);
    } catch (error) {
      failures.push(`FAIL ${name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  await check('modal route should be noindex + canonical to case', async () => {
    const { url, status, body } = await fetchHtml(paths.modal);
    assert(status === 200, `expected 200 for ${url}, got ${status}`);

    const robots = getMetaContent(body, 'robots');
    assert(robots, `missing <meta name="robots"> for ${url}`);
    assert(/\bnoindex\b/i.test(robots), `expected robots to include "noindex" for ${url}, got "${robots}"`);

    const canonical = getLinkHref(body, 'canonical');
    const expectedCanonical = new URL(paths.case, baseUrl).toString();
    assert(canonical === expectedCanonical, `expected canonical=${expectedCanonical} for ${url}, got ${canonical ?? 'null'}`);
  });

  await check('case route twitter should match OG (title/desc/image)', async () => {
    const { url, status, body } = await fetchHtml(paths.case);
    assert(status === 200, `expected 200 for ${url}, got ${status}`);

    const ogTitle = getMetaContent(body, 'og:title');
    const twTitle = getMetaContent(body, 'twitter:title');
    assert(ogTitle && twTitle, `missing og:title or twitter:title for ${url}`);
    assert(twTitle === ogTitle, `expected twitter:title to match og:title for ${url}`);

    const ogDesc = getMetaContent(body, 'og:description');
    const twDesc = getMetaContent(body, 'twitter:description');
    assert(ogDesc && twDesc, `missing og:description or twitter:description for ${url}`);
    assert(twDesc === ogDesc, `expected twitter:description to match og:description for ${url}`);

    const ogImage = getMetaContent(body, 'og:image');
    const twImage = getMetaContent(body, 'twitter:image');
    assert(ogImage && twImage, `missing og:image or twitter:image for ${url}`);
    assert(twImage === ogImage, `expected twitter:image to match og:image for ${url}`);
  });

  await check('nam-style should not duplicate site name in <title>', async () => {
    const { url, status, body } = await fetchHtml(paths.namStyle);
    assert(status === 200, `expected 200 for ${url}, got ${status}`);

    const title = getTitle(body);
    assert(title, `missing <title> for ${url}`);
    assert(!/\|\s*엄나구모 성형외과\s*\|\s*엄나구모 성형외과\s*$/i.test(title), `duplicate site name in title: "${title}"`);
  });

  if (failures.length) {
    for (const failure of failures) {
      process.stderr.write(`${failure}\n`);
    }
    process.stderr.write(`\n${failures.length} check(s) failed\n`);
    process.exit(1);
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exit(1);
});

