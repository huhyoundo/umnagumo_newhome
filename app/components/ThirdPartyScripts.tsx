'use client';

import { useEffect } from 'react';

type ThirdPartyScriptsProps = {
  gtmId: string;
  enableNaverAnalytics: boolean;
  naverAnalyticsWa: string;
};

function onFirstInteraction(callback: () => void) {
  let done = false;

  const handler = () => {
    if (done) return;
    done = true;
    callback();
  };

  const options: AddEventListenerOptions = { passive: true };
  const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart', 'wheel'];

  for (const eventName of events) window.addEventListener(eventName, handler, options);

  return () => {
    for (const eventName of events) window.removeEventListener(eventName, handler, options);
  };
}

function loadExternalScript(id: string, src: string) {
  if (document.getElementById(id)) return;

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadGtm(gtmId: string) {
  const win = window as unknown as { dataLayer?: unknown[] };
  win.dataLayer = win.dataLayer ?? [];
  win.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  loadExternalScript('gtm-script', `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
}

function loadNaverAnalytics(wa: string) {
  const win = window as unknown as {
    wcs_add?: Record<string, string>;
    wcs?: unknown;
    wcs_do?: () => void;
  };

  if (!win.wcs_add) win.wcs_add = {};
  win.wcs_add.wa = wa;

  const send = () => {
    if (win.wcs && typeof win.wcs_do === 'function') {
      win.wcs_do();
      return true;
    }
    return false;
  };

  const didSend = send();
  if (didSend) return;

  loadExternalScript('naver-wcslog', 'https://wcs.pstatic.net/wcslog.js');

  let tries = 0;
  const timer = window.setInterval(() => {
    tries += 1;
    if (send() || tries >= 50) window.clearInterval(timer);
  }, 100);
}

export default function ThirdPartyScripts({
  gtmId,
  enableNaverAnalytics,
  naverAnalyticsWa,
}: ThirdPartyScriptsProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    let didLoad = false;
    const loadAll = () => {
      if (didLoad) return;
      didLoad = true;

      loadGtm(gtmId);
      if (enableNaverAnalytics) loadNaverAnalytics(naverAnalyticsWa);
    };

    const cleanupInteraction = onFirstInteraction(loadAll);

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    // Keep 3rd-party scripts out of the critical rendering window.
    const fallbackDelayMs = isCoarsePointer ? 60000 : 45000;
    let timeout: number | null = null;

    const scheduleFallback = () => {
      timeout = window.setTimeout(loadAll, fallbackDelayMs);
    };

    if (document.readyState === 'complete') {
      scheduleFallback();
    } else {
      window.addEventListener('load', scheduleFallback, { once: true, passive: true });
    }

    return () => {
      if (timeout !== null) window.clearTimeout(timeout);
      window.removeEventListener('load', scheduleFallback);
      cleanupInteraction();
    };
  }, [enableNaverAnalytics, gtmId, naverAnalyticsWa]);

  return null;
}
