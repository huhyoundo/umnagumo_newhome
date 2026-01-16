'use client';

import dynamic from 'next/dynamic';
import DeferredMount from '../DeferredMount';

const StatsSection = dynamic(() => import('../StatsSection'), { ssr: false });

export default function StatsSectionDeferred() {
  return (
    <DeferredMount fallback={<div className="py-24 bg-[var(--navy)] min-h-[600px]" aria-hidden="true" />}>
      <StatsSection />
    </DeferredMount>
  );
}
