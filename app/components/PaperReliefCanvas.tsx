'use client';

import { useEffect, useRef } from 'react';

type PaperReliefCanvasProps = {
  className?: string;
  opacity?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createNoiseCanvas(size: number, seed: number) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return canvas;

  const rand = mulberry32(seed);
  const image = ctx.createImageData(size, size);
  const data = image.data;
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.floor(rand() * 255);
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 26;
  }
  ctx.putImageData(image, 0, 0);
  return canvas;
}

function drawEmbossedPath(
  ctx: CanvasRenderingContext2D,
  path: Path2D,
  options: {
    fill: string;
    shadowDark: string;
    shadowLight: string;
    blur: number;
    offset: number;
    edgeStroke?: string;
    edgeWidth?: number;
  }
) {
  const { fill, shadowDark, shadowLight, blur, offset, edgeStroke, edgeWidth } = options;

  ctx.save();
  ctx.fillStyle = fill;

  ctx.shadowColor = shadowDark;
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = offset;
  ctx.shadowOffsetY = offset;
  ctx.fill(path);

  ctx.shadowColor = shadowLight;
  ctx.shadowBlur = blur * 0.85;
  ctx.shadowOffsetX = -offset * 0.65;
  ctx.shadowOffsetY = -offset * 0.65;
  ctx.fill(path);

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = fill;
  ctx.globalAlpha = 0.96;
  ctx.fill(path);

  if (edgeStroke && edgeWidth) {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = edgeStroke;
    ctx.lineWidth = edgeWidth;
    ctx.stroke(path);
  }

  ctx.restore();
}

function flowerPath(x: number, y: number, size: number, rotation: number, petals: number) {
  const path = new Path2D();
  const petalRadius = size * 0.64;
  for (let i = 0; i < petals; i += 1) {
    const a = rotation + (i * Math.PI * 2) / petals;
    const px = x + Math.cos(a) * size * 0.62;
    const py = y + Math.sin(a) * size * 0.62;
    path.ellipse(px, py, petalRadius * 0.7, petalRadius * 0.38, a, 0, Math.PI * 2);
  }
  path.ellipse(x, y, size * 0.35, size * 0.35, 0, 0, Math.PI * 2);
  return path;
}

function leafPath(x: number, y: number, width: number, height: number, rotation: number) {
  const path = new Path2D();
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  const p0x = x - cos * width;
  const p0y = y - sin * width;
  const p1x = x + cos * width;
  const p1y = y + sin * width;

  const ctrl1x = x + -sin * height;
  const ctrl1y = y + cos * height;
  const ctrl2x = x - -sin * height;
  const ctrl2y = y - cos * height;

  path.moveTo(p0x, p0y);
  path.quadraticCurveTo(ctrl1x, ctrl1y, p1x, p1y);
  path.quadraticCurveTo(ctrl2x, ctrl2y, p0x, p0y);
  path.closePath();
  return path;
}

function birdPath(x: number, y: number, size: number, direction: 1 | -1) {
  const path = new Path2D();
  const s = size;

  path.moveTo(x - s * 0.95 * direction, y + s * 0.05);
  path.bezierCurveTo(
    x - s * 0.45 * direction,
    y - s * 0.65,
    x + s * 0.1 * direction,
    y - s * 0.35,
    x + s * 0.6 * direction,
    y - s * 0.05
  );
  path.bezierCurveTo(
    x + s * 0.95 * direction,
    y + s * 0.2,
    x + s * 0.55 * direction,
    y + s * 0.45,
    x + s * 0.25 * direction,
    y + s * 0.32
  );
  path.bezierCurveTo(
    x + s * 0.05 * direction,
    y + s * 0.25,
    x - s * 0.2 * direction,
    y + s * 0.25,
    x - s * 0.55 * direction,
    y + s * 0.42
  );
  path.bezierCurveTo(
    x - s * 0.85 * direction,
    y + s * 0.55,
    x - s * 0.9 * direction,
    y + s * 0.2,
    x - s * 0.95 * direction,
    y + s * 0.05
  );
  path.closePath();

  return path;
}

function buildReliefCanvas(width: number, height: number, dpr: number) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return canvas;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const rand = mulberry32(Math.floor(width * 10 + height * 100));
  const unit = clamp(Math.min(width, height) / 900, 0.6, 1.2);

  const fill = 'rgba(255,255,255,0.98)';
  const shadowDark = 'rgba(0,0,0,0.12)';
  const shadowLight = 'rgba(255,255,255,0.95)';
  const blur = 18 * unit;
  const offset = 10 * unit;
  const edgeStroke = 'rgba(0,0,0,0.028)';
  const edgeWidth = 0.8 * unit;

  const regions = [
    { x0: -0.08, x1: 0.28, y0: 0.1, y1: 0.92 },
    { x0: 0.72, x1: 1.08, y0: 0.08, y1: 0.92 },
    { x0: 0.18, x1: 0.82, y0: 0.68, y1: 1.08 },
  ];

  const shapes: Array<{ kind: 'flower' | 'leaf'; x: number; y: number; size: number; rotation: number }> = [];
  const shapeCount = 92;

  for (let i = 0; i < shapeCount; i += 1) {
    const region = regions[Math.floor(rand() * regions.length)];
    const x = (region.x0 + (region.x1 - region.x0) * rand()) * width;
    const y = (region.y0 + (region.y1 - region.y0) * rand()) * height;

    const edgeBias = Math.abs((x / width - 0.5) * 1.8) + Math.abs((y / height - 0.5) * 1.1);
    const size = clamp((14 + rand() * 34) * unit * (0.85 + edgeBias * 0.25), 10, 64);
    const rotation = rand() * Math.PI * 2;

    const kind: 'flower' | 'leaf' = rand() > 0.42 ? 'leaf' : 'flower';
    shapes.push({ kind, x, y, size, rotation });
  }

  for (const s of shapes) {
    if (s.kind === 'flower') {
      const petals = 5 + Math.floor(rand() * 3);
      const path = flowerPath(s.x, s.y, s.size, s.rotation, petals);
      drawEmbossedPath(ctx, path, { fill, shadowDark, shadowLight, blur, offset, edgeStroke, edgeWidth });
    } else {
      const path = leafPath(s.x, s.y, s.size * 0.62, s.size * 0.42, s.rotation);
      drawEmbossedPath(ctx, path, { fill, shadowDark, shadowLight, blur: blur * 0.9, offset: offset * 0.85, edgeStroke, edgeWidth });
    }
  }

  const birdCount = 3;
  for (let i = 0; i < birdCount; i += 1) {
    const x = (0.56 + (rand() - 0.5) * 0.32) * width;
    const y = (0.18 + rand() * 0.22) * height;
    const size = (70 + rand() * 50) * unit;
    const direction: 1 | -1 = rand() > 0.5 ? 1 : -1;
    const path = birdPath(x, y, size, direction);
    drawEmbossedPath(ctx, path, { fill, shadowDark, shadowLight, blur: blur * 1.1, offset: offset * 1.15, edgeStroke, edgeWidth });
  }

  return canvas;
}

export default function PaperReliefCanvas({ className, opacity = 1 }: PaperReliefCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0.5, y: 0.45, active: false };

    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    const noiseCanvas = createNoiseCanvas(300, 1337);
    let noisePattern: CanvasPattern | null = null;

    let reliefCanvas: HTMLCanvasElement | null = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      noisePattern = ctx.createPattern(noiseCanvas, 'repeat');
      reliefCanvas = buildReliefCanvas(width, height, dpr);
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

    let rafId = 0;
    const start = performance.now();

    const render = (now: number) => {
      const t = (now - start) / 1000;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = 'rgb(248, 246, 243)';
      ctx.fillRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(width * 0.55, height * 0.35, 0, width * 0.55, height * 0.35, Math.max(width, height) * 0.95);
      grad.addColorStop(0, 'rgba(255,255,255,0.92)');
      grad.addColorStop(1, 'rgba(0,0,0,0.07)');
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.55;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      if (noisePattern) {
        ctx.save();
        ctx.globalCompositeOperation = 'soft-light';
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = noisePattern;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      if (reliefCanvas) {
        const px = pointer.active ? pointer.x - 0.5 : 0;
        const py = pointer.active ? pointer.y - 0.5 : 0;

        const cx = (0.5 + Math.sin(t * 0.12) * 0.32 + px * 0.08) * width;
        const cy = (0.48 + Math.cos(t * 0.09) * 0.18 + py * 0.06) * height;
        const radius = (0.52 + Math.sin(t * 0.11 + 1.7) * 0.18 + (pointer.active ? 0.04 : 0)) * Math.max(width, height);

        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.drawImage(reliefCanvas, 0, 0, width, height);
        ctx.globalCompositeOperation = 'destination-in';

        const mask = ctx.createRadialGradient(cx, cy, radius * 0.18, cx, cy, radius);
        mask.addColorStop(0, 'rgba(0,0,0,1)');
        mask.addColorStop(0.82, 'rgba(0,0,0,0.92)');
        mask.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = mask;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

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
        filter: 'contrast(1.03) saturate(0.95)',
      }}
      aria-hidden="true"
    />
  );
}

