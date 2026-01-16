'use client';

import { useEffect } from 'react';

const INTERACTION_EVENTS = ['touchstart', 'pointerdown', 'keydown', 'wheel'] as const;

function getCssVarValue(name: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!value) return null;
  return value.replace(/^['"]|['"]$/g, '');
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => window.setTimeout(() => reject(new Error('timeout')), timeoutMs)),
  ]);
}

async function loadPretendardFull() {
  const family = getCssVarValue('--font-pretendard-full');
  if (!family || !('fonts' in document)) return;

  try {
    await withTimeout(
      Promise.all([
        document.fonts.load(`400 1em ${family}`),
        document.fonts.load(`600 1em ${family}`),
      ]),
      6000
    );
  } catch {
    // Ignore font load failures/timeouts; swap will still occur when available.
  }
}

export default function PretendardFullLoader() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains('pretendard-full')) return;

    const isCoarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    const fallbackDelayMs = isCoarsePointer ? 60000 : 45000;

    let started = false;
    let fallbackTimeout: number | null = null;

    const cleanup = () => {
      for (const eventName of INTERACTION_EVENTS) {
        window.removeEventListener(eventName, onInteraction);
      }
      if (fallbackTimeout !== null) window.clearTimeout(fallbackTimeout);
    };

    const start = async () => {
      if (started) return;
      started = true;
      cleanup();

      await loadPretendardFull();
      root.classList.add('pretendard-full');
    };

    const onInteraction = () => {
      start();
    };

    for (const eventName of INTERACTION_EVENTS) {
      window.addEventListener(eventName, onInteraction, { passive: true });
    }

    fallbackTimeout = window.setTimeout(start, fallbackDelayMs);

    return cleanup;
  }, []);

  return null;
}
