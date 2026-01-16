'use client';

import { useEffect, useRef } from 'react';

type LiquidRevealCanvasProps = {
  className?: string;
  imageSrc: string;
  introHoldMs?: number;
  introFadeMs?: number;
  opacity?: number;
};

const POINT_COUNT = 18;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) || 'Unknown shader error';
    gl.deleteShader(shader);
    throw new Error(log);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string) {
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create program');

  const vs = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) || 'Unknown program error';
    gl.deleteProgram(program);
    throw new Error(log);
  }

  return program;
}

function isWebGLAvailable(canvas: HTMLCanvasElement) {
  try {
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    return !!gl;
  } catch {
    return false;
  }
}

export default function LiquidRevealCanvas({
  className,
  imageSrc,
  introHoldMs = 700,
  introFadeMs = 1400,
  opacity = 1,
}: LiquidRevealCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isWebGLAvailable(canvas)) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const vertexSource = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_pos + 1.0) * 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;
      varying vec2 v_uv;

      uniform vec2 u_resolution;
      uniform vec2 u_texSize;
      uniform float u_time;
      uniform float u_introHold;
      uniform float u_introFade;
      uniform vec2 u_hover;
      uniform float u_hoverActive;
      uniform vec3 u_points[${POINT_COUNT}];
      uniform sampler2D u_tex;

      float tri(float x) {
        return abs(fract(x) - 0.5);
      }

      float triNoise(vec2 p) {
        float n = 0.0;
        float s = 1.0;
        for (int i = 0; i < 3; i += 1) {
          float t = (tri(p.x * s) + tri(p.y * s) + tri((p.x + p.y) * s)) / 3.0;
          n += (t - 0.5) / s;
          s *= 1.75;
        }
        return n;
      }

      vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return fract(sin(p) * 43758.5453123);
      }

      float voronoi(vec2 x) {
        vec2 n = floor(x);
        vec2 f = fract(x);
        float md = 8.0;
        for (int j = -1; j <= 1; j += 1) {
          for (int i = -1; i <= 1; i += 1) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = hash2(n + g);
            vec2 r = g + o - f;
            float d = dot(r, r);
            md = min(md, d);
          }
        }
        return sqrt(md);
      }

      vec2 coverUv(vec2 uv, vec2 texSize, vec2 res, out vec2 scale) {
        float canvasAspect = res.x / res.y;
        float texAspect = texSize.x / texSize.y;
        vec2 outUv = uv;
        scale = vec2(1.0);

        if (texAspect > canvasAspect) {
          scale.x = texAspect / canvasAspect;
          outUv.x = (uv.x - 0.5) * scale.x + 0.5;
        } else {
          scale.y = canvasAspect / texAspect;
          outUv.y = (uv.y - 0.5) * scale.y + 0.5;
        }
        return outUv;
      }

      void main() {
        vec2 res = max(u_resolution, vec2(1.0));
        vec2 uv = v_uv;

        float intro = smoothstep(u_introHold, u_introHold + u_introFade, u_time);
        intro = clamp(intro, 0.0, 1.0);

        float reveal = 0.0;
        float hoverMask = 0.0;
        vec2 disp = vec2(0.0);

        for (int i = 0; i < ${POINT_COUNT}; i += 1) {
          vec3 pt = u_points[i];
          if (pt.z < 0.0) continue;

          float age = u_time - pt.z;
          if (age < 0.0) continue;

          float fade = exp(-age * 1.1);
          if (fade < 0.02) continue;

          vec2 p = uv - pt.xy;
          float d = length(p);

          float baseR = 0.055;
          float spread = 0.24;
          float r = baseR + age * spread;

          float v = voronoi(uv * 7.0 + pt.xy * 5.0);
          float tn = triNoise(uv * 14.0 + pt.xy * 3.0);

          float a = atan(p.y, p.x);
          float facets = 7.0 + mod(float(i), 4.0);
          float angularPhase = dot(pt.xy, vec2(12.9898, 78.233)) * 6.28318;
          float angular = cos(a * facets + angularPhase) * 0.012;

          float warp = (v - 0.5) * 0.065 + tn * 0.045 + angular;

          float soft = 0.03;
          float m = 1.0 - smoothstep(r - soft, r + soft * 0.65, d + warp);
          float add = m * fade;
          reveal = max(reveal, add);

          float edgeDist = abs((d + warp) - r);
          float wave = sin(edgeDist * 55.0 - age * 12.0) * exp(-edgeDist * 10.0) * exp(-age * 1.4);
          vec2 dir = normalize(p + vec2(1e-4, 1e-4));
          disp += dir * wave * 0.006 * add;
        }

        reveal = clamp(reveal, 0.0, 1.0);

        if (u_hoverActive > 0.5) {
          vec2 hp = uv - u_hover;
          float hd = length(hp);
          float hv = voronoi(uv * 6.6 + u_hover * 4.0);
          float htn = triNoise(uv * 12.0 + u_hover * 3.2);
          float ha = atan(hp.y, hp.x);
          float hfacets = 9.0;
          float hphase = dot(u_hover, vec2(27.31, 11.17)) * 6.28318;
          float hang = cos(ha * hfacets + hphase) * 0.012;
          float hwarp = (hv - 0.5) * 0.072 + htn * 0.050 + hang;

          float hr = 0.13;
          float hsoft = 0.045;
          hoverMask = 1.0 - smoothstep(hr - hsoft, hr + hsoft, hd + hwarp);
          hoverMask = clamp(hoverMask, 0.0, 1.0);
        }

        float show = max(intro, max(reveal, hoverMask));

        vec2 coverScale;
        vec2 texUv = coverUv(uv, u_texSize, res, coverScale);
        vec2 sampleUv = texUv + disp * coverScale;
        sampleUv = clamp(sampleUv, vec2(0.001), vec2(0.999));

        vec3 img = texture2D(u_tex, sampleUv).rgb;
        img = mix(img, vec3(1.0), 0.08);

        vec3 base = vec3(0.9725, 0.9647, 0.9529);
        vec3 color = mix(base, img, show);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let texture: WebGLTexture | null = null;

    try {
      program = createProgram(gl, vertexSource, fragmentSource);
      gl.useProgram(program);

      buffer = gl.createBuffer();
      if (!buffer) throw new Error('Failed to create buffer');
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

      const posLoc = gl.getAttribLocation(program, 'a_pos');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      texture = gl.createTexture();
      if (!texture) throw new Error('Failed to create texture');
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      const timeLoc = gl.getUniformLocation(program, 'u_time');
      const resLoc = gl.getUniformLocation(program, 'u_resolution');
      const texSizeLoc = gl.getUniformLocation(program, 'u_texSize');
      const pointsLoc = gl.getUniformLocation(program, 'u_points[0]');
      const introHoldLoc = gl.getUniformLocation(program, 'u_introHold');
      const introFadeLoc = gl.getUniformLocation(program, 'u_introFade');
      const hoverLoc = gl.getUniformLocation(program, 'u_hover');
      const hoverActiveLoc = gl.getUniformLocation(program, 'u_hoverActive');
      const texLoc = gl.getUniformLocation(program, 'u_tex');

      if (
        !timeLoc ||
        !resLoc ||
        !texSizeLoc ||
        !pointsLoc ||
        !introHoldLoc ||
        !introFadeLoc ||
        !hoverLoc ||
        !hoverActiveLoc ||
        !texLoc
      ) {
        throw new Error('Missing uniforms');
      }

      gl.uniform1f(introHoldLoc, Math.max(0, introHoldMs) / 1000);
      gl.uniform1f(introFadeLoc, Math.max(0.1, introFadeMs) / 1000);
      gl.uniform2f(hoverLoc, 0.5, 0.5);
      gl.uniform1f(hoverActiveLoc, 0);
      gl.uniform1i(texLoc, 0);

      const points: Array<{ x: number; y: number; t: number }> = Array.from({ length: POINT_COUNT }, () => ({
        x: 0.5,
        y: 0.5,
        t: -1,
      }));
      const pointsData = new Float32Array(POINT_COUNT * 3);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([248, 246, 243, 255])
      );
      gl.uniform2f(texSizeLoc, 1, 1);

      const startTime = performance.now() / 1000;
      const introEnd = (Math.max(0, introHoldMs) + Math.max(0.1, introFadeMs)) / 1000;
      const pointerIsCoarse = window.matchMedia('(pointer: coarse)').matches;

      const pushPoint = (x: number, y: number, t: number) => {
        points.pop();
        points.unshift({ x, y, t });
      };

      let lastAdd = 0;
      let hoverActive = false;
      let hoverX = 0.5;
      let hoverY = 0.5;
      let rafId = 0;
      let textureReady = false;

      const hasActivePoints = (t: number) => {
        const maxAge = 3.6;
        return points.some((p) => p.t >= 0 && t - p.t < maxAge);
      };

      const render = () => {
        rafId = 0;
        const now = performance.now() / 1000;
        const t = now - startTime;
        gl.uniform1f(timeLoc, t);

        gl.uniform2f(hoverLoc, hoverX, hoverY);
        gl.uniform1f(hoverActiveLoc, hoverActive ? 1 : 0);

        for (let i = 0; i < POINT_COUNT; i += 1) {
          const p = points[i];
          pointsData[i * 3] = p.x;
          pointsData[i * 3 + 1] = p.y;
          pointsData[i * 3 + 2] = p.t;
        }
        gl.uniform3fv(pointsLoc, pointsData);

        if (!textureReady) {
          // draw a neutral frame while loading
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        if (prefersReducedMotion) return;

        const keepAnimating = t < introEnd || hoverActive || hasActivePoints(t);
        if (keepAnimating) rafId = requestAnimationFrame(render);
      };

      const scheduleRender = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(render);
      };

      const addPointFromEvent = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        const rawX = (e.clientX - rect.left) / rect.width;
        const rawY = 1 - (e.clientY - rect.top) / rect.height;
        if (rawX < 0 || rawX > 1 || rawY < 0 || rawY > 1) {
          hoverActive = false;
          return;
        }
        const nx = clamp(rawX, 0, 1);
        const ny = clamp(rawY, 0, 1);
        hoverActive = true;
        hoverX = nx;
        hoverY = ny;

        const now = performance.now() / 1000;
        if (now - lastAdd < 0.028) return;
        lastAdd = now;
        pushPoint(nx, ny, now - startTime);
        scheduleRender();
      };

      const handlePointerMove = (e: PointerEvent) => addPointFromEvent(e);
      const handlePointerDown = (e: PointerEvent) => {
        addPointFromEvent(e);
        lastAdd = 0;
      };

      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerdown', handlePointerDown, { passive: true });

      let width = 1;
      let height = 1;
      let resizeObserver: ResizeObserver | null = null;

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const dprMax = pointerIsCoarse ? 1.5 : 2;
        const dpr = clamp(window.devicePixelRatio || 1, 1, dprMax);
        width = Math.max(1, rect.width);
        height = Math.max(1, rect.height);
        const nextWidth = Math.max(1, Math.floor(width * dpr));
        const nextHeight = Math.max(1, Math.floor(height * dpr));
        if (canvas.width !== nextWidth) canvas.width = nextWidth;
        if (canvas.height !== nextHeight) canvas.height = nextHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(resLoc, width, height);
      };

      resize();
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => resize());
        resizeObserver.observe(canvas);
      }
      const handleResize = () => {
        resize();
        scheduleRender();
      };
      window.addEventListener('resize', handleResize, { passive: true });

      const img = new Image();
      img.decoding = 'async';

      const uploadTexture = () => {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.uniform2f(texSizeLoc, img.naturalWidth || img.width, img.naturalHeight || img.height);
        textureReady = true;
        scheduleRender();
      };

      img.onload = () => uploadTexture();
      img.src = imageSrc;
      if (img.complete && img.naturalWidth > 0) uploadTexture();

      scheduleRender();

      return () => {
        cancelAnimationFrame(rafId);
        resizeObserver?.disconnect();
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerdown', handlePointerDown);
        if (program) gl.deleteProgram(program);
        if (buffer) gl.deleteBuffer(buffer);
        if (texture) gl.deleteTexture(texture);
      };
    } catch {
      if (program) gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
      if (texture) gl.deleteTexture(texture);
      return;
    }
  }, [imageSrc, introHoldMs, introFadeMs]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity, width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    />
  );
}
