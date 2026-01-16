'use client';

import Image, { type ImageProps } from 'next/image';

function encodeLocalSrc(src: ImageProps['src']): ImageProps['src'] {
  if (typeof src !== 'string') return src;
  if (!src.startsWith('/')) return src;

  const match = src.match(/^([^?#]*)(.*)$/);
  if (!match) return src;

  const [, pathname, suffix] = match;
  // Next.js image optimizer internally re-requests local assets using the decoded `url` query param.
  // Ampersands must remain percent-encoded there (otherwise Next will 404 the file path).
  const encodedPathname = encodeURI(pathname).replace(/&/g, '%26');
  return `${encodedPathname}${suffix}`;
}

export default function SafeImage(props: ImageProps) {
  return <Image {...props} src={encodeLocalSrc(props.src)} />;
}
