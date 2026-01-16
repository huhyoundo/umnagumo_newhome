'use client';

import { useEffect, useRef, useState } from 'react';

type DeferredMountProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
};

export default function DeferredMount({
  children,
  fallback = null,
  rootMargin = '0px',
  threshold = 0.01,
}: DeferredMountProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) return;
    const target = containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isMounted, rootMargin, threshold]);

  return <div ref={containerRef}>{isMounted ? children : fallback}</div>;
}
