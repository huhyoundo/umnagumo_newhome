'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    UnicornStudio?: {
      addScene?: (options: {
        projectId: string;
        element: HTMLElement;
        fps?: number;
        dpi?: number;
        scale?: number;
        production?: boolean;
        lazyLoad?: boolean;
        fixed?: boolean;
        altText?: string;
        ariaLabel?: string;
        interactivity?: {
          mouse?: {
            disableMobile?: boolean;
            disabled?: boolean;
          };
        } | null;
      }) => Promise<{ destroy?: () => void }>;
    };
    __unicornStudioScriptPromise?: Promise<void>;
  }
}

const UNICORN_STUDIO_SCRIPT_ID = 'unicornstudio-umd';
const UNICORN_STUDIO_SCRIPT_SRC =
  'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.3/dist/unicornStudio.umd.js';

function isWebGL2Available() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

function loadUnicornStudioScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.UnicornStudio?.addScene) return Promise.resolve();
  if (window.__unicornStudioScriptPromise) return window.__unicornStudioScriptPromise;

  const existingScript = document.getElementById(UNICORN_STUDIO_SCRIPT_ID) as HTMLScriptElement | null;
  if (existingScript) {
    window.__unicornStudioScriptPromise = new Promise((resolve, reject) => {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load UnicornStudio script')), { once: true });
    });
    return window.__unicornStudioScriptPromise;
  }

  window.__unicornStudioScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = UNICORN_STUDIO_SCRIPT_ID;
    script.src = UNICORN_STUDIO_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load UnicornStudio script'));
    (document.head || document.body).appendChild(script);
  });

  return window.__unicornStudioScriptPromise;
}

type UnicornStudioSceneProps = {
  projectId: string;
  className?: string;
  style?: CSSProperties;
  fps?: number;
  dpi?: number;
  scale?: number;
  production?: boolean;
  lazyLoad?: boolean;
  fixed?: boolean;
  altText?: string;
  ariaLabel?: string;
  disableMobile?: boolean;
  disableMouse?: boolean;
};

export default function UnicornStudioScene({
  projectId,
  className,
  style,
  fps,
  dpi,
  scale,
  production,
  lazyLoad,
  fixed,
  altText,
  ariaLabel,
  disableMobile,
  disableMouse,
}: UnicornStudioSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ destroy?: () => void } | null>(null);

  useEffect(() => {
    if (!isWebGL2Available()) return;

    let cancelled = false;

    const setup = async () => {
      await loadUnicornStudioScript();
      if (cancelled) return;

      const element = containerRef.current;
      if (!element || !window.UnicornStudio?.addScene) return;

      sceneRef.current?.destroy?.();
      sceneRef.current = null;

      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      if (cancelled || !containerRef.current) return;

      const interactivity =
        disableMobile || disableMouse
          ? {
              mouse: {
                disableMobile,
                disabled: disableMouse,
              },
            }
          : null;

      sceneRef.current = await window.UnicornStudio.addScene({
        projectId,
        element: containerRef.current,
        fps,
        dpi,
        scale,
        production,
        lazyLoad,
        fixed,
        altText,
        ariaLabel,
        interactivity,
      });
    };

    void setup();

    return () => {
      cancelled = true;
      sceneRef.current?.destroy?.();
      sceneRef.current = null;
    };
  }, [
    projectId,
    fps,
    dpi,
    scale,
    production,
    lazyLoad,
    fixed,
    altText,
    ariaLabel,
    disableMobile,
    disableMouse,
  ]);

  return <div ref={containerRef} className={className} style={style} data-us-project={projectId} />;
}
