'use client';

import dynamic from 'next/dynamic';
import DeferredMount from '../DeferredMount';

const YouTubeFeaturedSectionClient = dynamic(() => import('../YouTubeFeaturedSectionClient'), { ssr: false });

export default function YouTubeFeaturedSectionDeferred() {
  return (
    <DeferredMount
      fallback={<div className="py-20 md:py-28 bg-white min-h-[560px]" aria-hidden="true" />}
      rootMargin="0px"
    >
      <YouTubeFeaturedSectionClient />
    </DeferredMount>
  );
}

