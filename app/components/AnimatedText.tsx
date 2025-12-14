'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

type AnimationType =
  | 'char-stagger'      // 글자별 스태거 애니메이션
  | 'word-stagger'      // 단어별 스태거 애니메이션
  | 'line-mask'         // 라인 마스크 리빌
  | 'typewriter'        // 타이핑 효과
  | 'wave'              // 웨이브 효과
  | 'glitch'            // 글리치 효과
  | 'blur-in'           // 블러에서 선명하게
  | 'split-reveal'      // 양쪽에서 합쳐지기
  | 'rotate-in';        // 회전하며 등장

interface AnimatedTextProps {
  children: string;
  type?: AnimationType;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  trigger?: 'mount' | 'scroll' | 'hover';
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  threshold?: number;
  once?: boolean;
}

export default function AnimatedText({
  children,
  type = 'char-stagger',
  className = '',
  delay = 0,
  duration = 0.6,
  staggerDelay = 0.03,
  trigger = 'mount',
  tag: Tag = 'span',
  threshold = 0.3,
  once = true,
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(trigger === 'mount');
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Split text into characters or words
  const elements = useMemo(() => {
    if (type === 'word-stagger') {
      return children.split(' ').map((word, i) => ({ text: word, key: i }));
    }
    return children.split('').map((char, i) => ({
      text: char === ' ' ? '\u00A0' : char,
      key: i
    }));
  }, [children, type]);

  // Mount animation
  useEffect(() => {
    if (trigger === 'mount') {
      const timer = setTimeout(() => setMounted(true), delay * 1000);
      return () => clearTimeout(timer);
    }
    setMounted(true);
  }, [trigger, delay]);

  // Scroll trigger
  useEffect(() => {
    if (trigger !== 'scroll') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [trigger, threshold, once]);

  // Determine if animation should play
  const shouldAnimate = useMemo(() => {
    if (trigger === 'hover') return isHovered;
    if (trigger === 'scroll') return isVisible;
    return mounted;
  }, [trigger, isHovered, isVisible, mounted]);

  // Get animation styles for each element
  const getAnimationStyle = (index: number) => {
    const baseDelay = delay + (index * staggerDelay);

    const baseStyle = {
      display: 'inline-block',
      transitionDuration: `${duration}s`,
      transitionDelay: `${baseDelay}s`,
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    };

    if (!shouldAnimate) {
      switch (type) {
        case 'char-stagger':
        case 'word-stagger':
          return { ...baseStyle, opacity: 0, transform: 'translateY(100%)' };
        case 'line-mask':
          return { ...baseStyle, clipPath: 'inset(0 100% 0 0)' };
        case 'typewriter':
          return { ...baseStyle, opacity: 0, width: '0' };
        case 'wave':
          return { ...baseStyle, opacity: 0, transform: `translateY(${20 + Math.sin(index) * 10}px)` };
        case 'glitch':
          return { ...baseStyle, opacity: 0, transform: 'skewX(-20deg) translateX(-20px)' };
        case 'blur-in':
          return { ...baseStyle, opacity: 0, filter: 'blur(10px)', transform: 'scale(0.8)' };
        case 'split-reveal':
          return {
            ...baseStyle,
            opacity: 0,
            transform: index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)'
          };
        case 'rotate-in':
          return {
            ...baseStyle,
            opacity: 0,
            transform: 'rotateX(-90deg) translateY(20px)',
            transformOrigin: 'top center'
          };
        default:
          return baseStyle;
      }
    }

    // Animated state
    switch (type) {
      case 'char-stagger':
      case 'word-stagger':
        return { ...baseStyle, opacity: 1, transform: 'translateY(0)' };
      case 'line-mask':
        return { ...baseStyle, clipPath: 'inset(0 0% 0 0)' };
      case 'typewriter':
        return { ...baseStyle, opacity: 1, width: 'auto' };
      case 'wave':
        return { ...baseStyle, opacity: 1, transform: 'translateY(0)' };
      case 'glitch':
        return { ...baseStyle, opacity: 1, transform: 'skewX(0) translateX(0)' };
      case 'blur-in':
        return { ...baseStyle, opacity: 1, filter: 'blur(0)', transform: 'scale(1)' };
      case 'split-reveal':
        return { ...baseStyle, opacity: 1, transform: 'translateX(0)' };
      case 'rotate-in':
        return { ...baseStyle, opacity: 1, transform: 'rotateX(0) translateY(0)' };
      default:
        return baseStyle;
    }
  };

  const containerStyle: React.CSSProperties = {
    overflow: 'hidden',
    display: 'inline-block',
    perspective: type === 'rotate-in' ? '1000px' : undefined,
  };

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={containerStyle}
      onMouseEnter={() => trigger === 'hover' && setIsHovered(true)}
      onMouseLeave={() => trigger === 'hover' && setIsHovered(false)}
    >
      {elements.map(({ text, key }) => (
        <span
          key={key}
          style={getAnimationStyle(key)}
          className="will-change-transform"
        >
          {text}
          {type === 'word-stagger' && key < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
}

// 스크롤 트리거 텍스트 리빌 컴포넌트
interface ScrollRevealTextProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export function ScrollRevealText({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  threshold = 0.3,
  once = true,
}: ScrollRevealTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, once]);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0) scale(1) rotate(0)';

    switch (direction) {
      case 'up': return 'translateY(60px)';
      case 'down': return 'translateY(-60px)';
      case 'left': return 'translateX(60px)';
      case 'right': return 'translateX(-60px)';
      case 'scale': return 'scale(0.8)';
      case 'rotate': return 'rotateX(-15deg) translateY(30px)';
      default: return 'translateY(60px)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        perspective: direction === 'rotate' ? '1000px' : undefined,
      }}
    >
      {children}
    </div>
  );
}

// 마스크 리빌 텍스트 컴포넌트
interface MaskRevealTextProps {
  children: string;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  trigger?: 'mount' | 'scroll';
  threshold?: number;
}

export function MaskRevealText({
  children,
  className = '',
  direction = 'left',
  delay = 0,
  duration = 1,
  trigger = 'mount',
  threshold = 0.3,
}: MaskRevealTextProps) {
  const [isVisible, setIsVisible] = useState(trigger === 'mount');
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger === 'mount') {
      const timer = setTimeout(() => setMounted(true), delay * 1000);
      return () => clearTimeout(timer);
    }
    setMounted(true);
  }, [trigger, delay]);

  useEffect(() => {
    if (trigger !== 'scroll') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [trigger, threshold]);

  const shouldShow = trigger === 'mount' ? mounted : isVisible;

  const getClipPath = () => {
    if (shouldShow) return 'inset(0 0% 0 0)';

    switch (direction) {
      case 'left': return 'inset(0 100% 0 0)';
      case 'right': return 'inset(0 0 0 100%)';
      case 'up': return 'inset(100% 0 0 0)';
      case 'down': return 'inset(0 0 100% 0)';
      default: return 'inset(0 100% 0 0)';
    }
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        clipPath: getClipPath(),
        transition: `clip-path ${duration}s cubic-bezier(0.77, 0, 0.175, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// 호버 인터랙티브 텍스트 컴포넌트
interface HoverTextProps {
  children: string;
  className?: string;
  hoverEffect?: 'wave' | 'scatter' | 'bounce' | 'rotate' | 'scale';
}

export function HoverText({
  children,
  className = '',
  hoverEffect = 'wave',
}: HoverTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chars = children.split('');

  const getHoverStyle = (index: number): React.CSSProperties => {
    const isNear = hoveredIndex !== null && Math.abs(index - hoveredIndex) <= 2;
    const distance = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : 0;
    const intensity = isNear ? 1 - (distance * 0.3) : 0;

    const baseStyle: React.CSSProperties = {
      display: 'inline-block',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      cursor: 'default',
    };

    if (!isNear) return baseStyle;

    switch (hoverEffect) {
      case 'wave':
        return { ...baseStyle, transform: `translateY(${-10 * intensity}px)` };
      case 'scatter':
        return {
          ...baseStyle,
          transform: `translate(${(Math.random() - 0.5) * 10 * intensity}px, ${(Math.random() - 0.5) * 10 * intensity}px)`
        };
      case 'bounce':
        return { ...baseStyle, transform: `scale(${1 + 0.2 * intensity})` };
      case 'rotate':
        return { ...baseStyle, transform: `rotate(${(index % 2 === 0 ? 1 : -1) * 10 * intensity}deg)` };
      case 'scale':
        return { ...baseStyle, transform: `scale(${1 + 0.3 * intensity})`, color: 'var(--navy)' };
      default:
        return baseStyle;
    }
  };

  return (
    <span className={className}>
      {chars.map((char, index) => (
        <span
          key={index}
          style={getHoverStyle(index)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// 카운트업 애니메이션 텍스트
interface CountUpTextProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  trigger?: 'mount' | 'scroll';
  threshold?: number;
}

export function CountUpText({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
  trigger = 'scroll',
  threshold = 0.5,
}: CountUpTextProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (trigger === 'mount') {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [trigger, threshold, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4); // Ease out quart

      setCount(Math.round(eased * end));

      if (now < endTime) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// 글리치 텍스트 효과
interface GlitchTextProps {
  children: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlitchText({
  children,
  className = '',
  intensity = 'medium',
}: GlitchTextProps) {
  const intensityValues = {
    low: { offset: 2, duration: '0.3s' },
    medium: { offset: 4, duration: '0.2s' },
    high: { offset: 8, duration: '0.1s' },
  };

  const { offset } = intensityValues[intensity];

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ '--glitch-offset': `${offset}px` } as React.CSSProperties}
    >
      <span className="glitch-text" data-text={children}>
        {children}
      </span>
    </span>
  );
}
