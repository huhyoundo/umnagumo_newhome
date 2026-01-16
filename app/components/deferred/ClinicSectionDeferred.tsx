'use client';

import dynamic from 'next/dynamic';
import DeferredMount from '../DeferredMount';

const ClinicSection = dynamic(() => import('../ClinicSection'), { ssr: false });

export default function ClinicSectionDeferred() {
  return (
    <DeferredMount
      fallback={<div className="py-20 md:py-28 bg-[var(--paper)] min-h-[900px]" aria-hidden="true" />}
    >
      <ClinicSection />
    </DeferredMount>
  );
}
