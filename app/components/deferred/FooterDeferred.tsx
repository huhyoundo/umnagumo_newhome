'use client';

import dynamic from 'next/dynamic';
import DeferredMount from '../DeferredMount';

const Footer = dynamic(() => import('../Footer'), { ssr: false });

export default function FooterDeferred() {
  return (
    <DeferredMount fallback={<div className="py-12 bg-[var(--ink)] min-h-[520px]" aria-hidden="true" />}>
      <Footer />
    </DeferredMount>
  );
}
