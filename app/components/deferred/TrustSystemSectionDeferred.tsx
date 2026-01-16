'use client';

import dynamic from 'next/dynamic';
import DeferredMount from '../DeferredMount';

const TrustSystemSection = dynamic(() => import('../TrustSystemSection'), { ssr: false });

export default function TrustSystemSectionDeferred() {
  return (
    <DeferredMount
      fallback={<div className="py-20 md:py-28 bg-[var(--paper)] min-h-[900px]" aria-hidden="true" />}
    >
      <TrustSystemSection />
    </DeferredMount>
  );
}
