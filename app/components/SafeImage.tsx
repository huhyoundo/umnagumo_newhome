'use client';

import Image, { type ImageProps } from 'next/image';

function encodeLocalSrc(src: ImageProps['src']): ImageProps['src'] {
  if (typeof src !== 'string') return src;
  if (!src.startsWith('/')) return src;

  const match = src.match(/^([^?#]*)(.*)$/);
  if (!match) return src;

  const [, pathname, suffix] = match;
  return `${encodeURI(pathname)}${suffix}`;
}

export default function SafeImage(props: ImageProps) {
  return <Image {...props} src={encodeLocalSrc(props.src)} />;
}

