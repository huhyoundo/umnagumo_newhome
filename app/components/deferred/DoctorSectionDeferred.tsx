'use client';

import dynamic from 'next/dynamic';
import DeferredMount from '../DeferredMount';

const DoctorSection = dynamic(() => import('../DoctorSection'), { ssr: false });

export default function DoctorSectionDeferred() {
  return (
    <DeferredMount fallback={<div className="py-20 md:py-28 bg-white min-h-[800px]" aria-hidden="true" />}>
      <DoctorSection />
    </DeferredMount>
  );
}
