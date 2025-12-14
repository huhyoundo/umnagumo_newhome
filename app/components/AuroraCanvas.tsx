'use client';

import { useEffect, useRef } from 'react';

type AuroraCanvasProps = {
  className?: string;
  opacity?: number;
};

type Rgb = { r: number; g: number; b: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseHexColor(hex: string): Rgb | null {
  const normalized = hex.trim().replace('#', '');
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(normalized)) return null;
  const full = normalized.length === 3 ? normalized.split('').map((c) => c + c).join('') : normalized;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  return { r, g, b };
}

function parseRgbColor(input: string): Rgb | null {
  const match = input
    .trim()
    .match(/^rgba?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})(?:\s*,\s*([0-9.]+))?\s*\)$/i);
  if (!match) return null;
  const r = clamp(Number(match[1]), 0, 255);
  const g = clamp(Number(match[2]), 0, 255);
  const b = clamp(Number(match[3]), 0, 255);
  return { r, g, b };
}

function parseColor(input: string): Rgb | null {
  if (!input) return null;
  if (input.trim().startsWith('#')) return parseHexColor(input);
  if (input.trim().startsWith('rgb')) return parseRgbColor(input);
  return null;
}

function rgba({ r, g, b }: Rgb, alpha: number) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getCssVarRgb(varName: string, fallback: string): Rgb {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return parseColor(value) || parseColor(fallback) || { r: 0, g: 0, b: 0 };
}

export default function AuroraCanvas({ className, opacity = 0.9 }: AuroraCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const navy = getCssVarRgb('--navy', '#1f4d5a');
    const ink = getCssVarRgb('--ink', '#1e2023');
    const gold = getCssVarRgb('--gold', '#6ed6d0');

    const pointer = { x: 0.5, y: 0.45, active: false };

    const dpr = clamp(window.devicePixelRatio || 1, 1, 1.75);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      pointer.x = clamp(x, 0, 1);
      pointer.y = clamp(y, 0, 1);
      pointer.active = x >= 0 && x <= 1 && y >= 0 && y <= 1;
    };

    window.addEventListener('pointermove', handleMove, { passive: true });

    const blobs = [
      { color: navy, baseX: 0.14, baseY: 0.22, ampX: 0.06, ampY: 0.05, radius: 0.7, speed: 0.18, alpha: 0.32 },
      { color: ink, baseX: 0.92, baseY: 0.66, ampX: 0.08, ampY: 0.06, radius: 0.72, speed: 0.14, alpha: 0.18 },
      { color: gold, baseX: 0.78, baseY: 0.18, ampX: 0.05, ampY: 0.05, radius: 0.62, speed: 0.12, alpha: 0.12 },
    ] as const;

    let rafId = 0;
    const start = performance.now();

    const render = (now: number) => {
      const t = (now - start) / 1000;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'screen';

      const px = pointer.active ? pointer.x - 0.5 : 0;
      const py = pointer.active ? pointer.y - 0.5 : 0;

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        const phase = i * 1.7;
        const driftX = Math.sin(t * (0.9 + b.speed) + phase) * b.ampX;
        const driftY = Math.cos(t * (1.1 + b.speed) + phase) * b.ampY;

        const cx = (b.baseX + driftX + px * 0.08) * width;
        const cy = (b.baseY + driftY + py * 0.08) * height;
        const radius = Math.max(width, height) * b.radius;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, rgba(b.color, b.alpha));
        gradient.addColorStop(1, rgba(b.color, 0));

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = 'source-over';
      rafId = requestAnimationFrame(render);
    };

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(render);
    } else {
      render(start);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        opacity,
        filter: 'blur(22px) saturate(1.15)',
        transform: 'scale(1.08)',
        transformOrigin: 'center',
      }}
      aria-hidden="true"
    />
  );
}
