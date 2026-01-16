'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// ===== 기본 스크롤 애니메이션 훅 =====
interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.2, rootMargin = '0px', once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

// ===== 카운터 애니메이션 훅 =====
interface CounterOptions {
  duration?: number;
  delay?: number;
  easing?: 'linear' | 'easeOut' | 'easeInOut' | 'spring';
}

export function useCounterAnimation(
  end: number,
  options: CounterOptions = {}
) {
  const { duration = 2000, delay = 0, easing = 'easeOut' } = options;
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const timeout = setTimeout(() => {
      const startTime = Date.now();

      const easingFunctions = {
        linear: (t: number) => t,
        easeOut: (t: number) => 1 - Math.pow(1 - t, 4),
        easeInOut: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
        spring: (t: number) => {
          const c4 = (2 * Math.PI) / 3;
          return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
        },
      };

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easingFunctions[easing](progress);
        setCount(Math.round(eased * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [hasStarted, end, duration, delay, easing]);

  return { ref, count };
}

// ===== 마우스 패럴랙스 훅 =====
interface ParallaxOptions {
  intensity?: number;
  smoothing?: number;
}

export function useMouseParallax(options: ParallaxOptions = {}) {
  const { intensity = 20, smoothing = 0.1 } = options;
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | undefined>(undefined);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * intensity;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * intensity;
    targetPosition.current = { x, y };
  }, [intensity]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (targetPosition.current.x - prev.x) * smoothing,
        y: prev.y + (targetPosition.current.y - prev.y) * smoothing,
      }));
      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [handleMouseMove, smoothing]);

  return { ref, position };
}

// ===== 텍스트 스크램블 훅 =====
interface ScrambleOptions {
  chars?: string;
  duration?: number;
  delay?: number;
}

export function useTextScramble(
  text: string,
  isActive: boolean,
  options: ScrambleOptions = {}
) {
  const {
    chars = '가나다라마바사아자차카타파하',
    duration = 1500,
    delay = 0
  } = options;
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timeout = setTimeout(() => {
      setDisplayText('');
      setIsComplete(false);

      const startTime = Date.now();
      const textLength = text.length;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const revealedChars = Math.floor(progress * textLength);

        let result = '';
        for (let i = 0; i < textLength; i++) {
          if (i < revealedChars) {
            result += text[i];
          } else if (text[i] === ' ') {
            result += ' ';
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
          setIsComplete(true);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isActive, chars, duration, delay]);

  return {
    displayText: isActive ? displayText : '',
    isComplete: isActive ? isComplete : false,
  };
}

// ===== 스태거 애니메이션 훅 =====
interface StaggerOptions {
  staggerDelay?: number;
  duration?: number;
  initialDelay?: number;
}

export function useStaggerAnimation(
  itemCount: number,
  isVisible: boolean,
  options: StaggerOptions = {}
) {
  const { staggerDelay = 0.1, duration = 0.6, initialDelay = 0 } = options;

  const getItemStyle = useCallback((index: number) => {
    const delay = initialDelay + index * staggerDelay;
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    };
  }, [isVisible, staggerDelay, duration, initialDelay]);

  return { getItemStyle };
}

// ===== 3D 틸트 효과 훅 =====
interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

export function useTilt(options: TiltOptions = {}) {
  const { maxTilt = 10, perspective = 1000, scale = 1.02 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -maxTilt;
    const rotateY = (x - 0.5) * maxTilt;
    setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
  }, [maxTilt, perspective, scale]);

  const handleMouseLeave = useCallback(() => {
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`);
  }, [perspective]);

  return { ref, transform, handleMouseMove, handleMouseLeave };
}

// ===== 마그네틱 버튼 효과 훅 =====
interface MagneticOptions {
  strength?: number;
  duration?: number;
}

export function useMagnetic(options: MagneticOptions = {}) {
  const { strength = 30, duration = 0.3 } = options;
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / rect.width * strength;
    const y = (e.clientY - centerY) / rect.height * strength;
    setPosition({ x, y });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const style = useMemo(() => ({
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
  }), [position, duration]);

  return { ref, style, handleMouseMove, handleMouseLeave };
}

// ===== 스플릿 텍스트 유틸리티 =====
export function useSplitText(text: string) {
  const chars = useMemo(() =>
    text.split('').map((char, i) => ({
      char: char === ' ' ? '\u00A0' : char,
      key: i,
    })), [text]);

  const words = useMemo(() =>
    text.split(' ').map((word, i) => ({
      word,
      key: i,
    })), [text]);

  return { chars, words };
}

// ===== 프로그레스 바 훅 =====
interface ProgressOptions {
  duration?: number;
  delay?: number;
}

export function useProgressAnimation(
  targetValue: number,
  isVisible: boolean,
  options: ProgressOptions = {}
) {
  const { duration = 1500, delay = 0 } = options;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      setProgress(0);
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - rawProgress, 3);
        setProgress(eased * targetValue);

        if (rawProgress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, targetValue, duration, delay]);

  return isVisible ? progress : 0;
}

// ===== 타이핑 효과 훅 =====
interface TypingOptions {
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

export function useTypingEffect(
  text: string,
  isActive: boolean,
  options: TypingOptions = {}
) {
  const { speed = 50, delay = 0, cursor = true } = options;
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(cursor);

  useEffect(() => {
    if (!isActive) {
      setDisplayText('');
      return;
    }

    let currentIndex = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          // Blink cursor after typing complete
          if (cursor) {
            const blinkInterval = setInterval(() => {
              setShowCursor(prev => !prev);
            }, 530);
            return () => clearInterval(blinkInterval);
          }
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isActive, speed, delay, cursor]);

  return { displayText, showCursor };
}

// ===== 파티클 생성 훅 =====
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export function useParticles(count: number = 20) {
  const pseudoRandom = useCallback((seed: number) => {
    const value = Math.sin(seed) * 10000;
    return value - Math.floor(value);
  }, []);

  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: pseudoRandom((i + 1) * 12.9898) * 100,
      y: pseudoRandom((i + 1) * 78.233) * 100,
      size: pseudoRandom((i + 1) * 45.164) * 4 + 2,
      opacity: pseudoRandom((i + 1) * 93.989) * 0.5 + 0.1,
      duration: pseudoRandom((i + 1) * 12.345) * 20 + 10,
      delay: pseudoRandom((i + 1) * 67.89) * -20,
    })), [count, pseudoRandom]);

  return particles;
}

// ===== 인터섹션 관찰 훅 (여러 요소) =====
export function useIntersectionObserver(
  elementsRef: React.RefObject<(HTMLElement | null)[]>,
  options: IntersectionObserverInit = {}
) {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = elementsRef.current?.findIndex(el => el === entry.target);
        if (index !== undefined && index !== -1) {
          setVisibleIndices(prev => {
            const next = new Set(prev);
            if (entry.isIntersecting) {
              next.add(index);
            }
            return next;
          });
        }
      });
    }, { threshold: 0.2, ...options });

    elementsRef.current?.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [elementsRef, options]);

  return visibleIndices;
}

// ===== 스무스 스크롤 훅 =====
export function useSmoothScroll() {
  const scrollTo = useCallback((targetId: string, offset: number = 0) => {
    const element = document.getElementById(targetId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return { scrollTo };
}

// ===== 로딩 단계 훅 =====
export function useLoadingStages(stageCount: number, interval: number = 500) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    for (let i = 1; i <= stageCount; i++) {
      timers.push(
        setTimeout(() => setCurrentStage(i), i * interval)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [stageCount, interval]);

  return currentStage;
}

// Re-export existing hooks for compatibility
export { useScrollAnimation as useScrollAnimationCompat };
