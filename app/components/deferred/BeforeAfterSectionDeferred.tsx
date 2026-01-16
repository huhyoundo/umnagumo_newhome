'use client';

import dynamic from 'next/dynamic';
import DeferredMount from '../DeferredMount';

const BeforeAfterSection = dynamic(() => import('../BeforeAfterSection'), { ssr: false });

export default function BeforeAfterSectionDeferred() {
  return (
    <DeferredMount
      fallback={<div className="py-20 md:py-28 bg-[var(--paper)] min-h-[900px]" aria-hidden="true" />}
    >
      <BeforeAfterSection />
    </DeferredMount>
  );
}
