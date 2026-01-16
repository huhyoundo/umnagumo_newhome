'use client';

import dynamic from 'next/dynamic';
import DeferredMount from '../DeferredMount';

const ContentGrid = dynamic(() => import('../ContentGrid'), { ssr: false });

export default function ContentGridDeferred() {
  return (
    <DeferredMount fallback={<div className="py-20 md:py-28 bg-white min-h-[800px]" aria-hidden="true" />}>
      <ContentGrid />
    </DeferredMount>
  );
}
