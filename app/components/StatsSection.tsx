'use client';

import Image from './SafeImage';
import { useState, useEffect, useRef } from 'react';

// 스크롤 애니메이션 훅
function useScrollAnimation(threshold = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
  }, [threshold]);

  return { ref, isVisible };
}

// 카운터 애니메이션 훅
function useCounterAnimation(end: number, options: { duration?: number; delay?: number } = {}) {
  const { duration = 2500, delay = 0 } = options;
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

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        // Spring-like easing
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.round(eased * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [hasStarted, end, duration, delay]);

  return { ref, count };
}

// 파티클 배경 컴포넌트 (클라이언트 전용)
function ParticleOverlay({ isVisible }: { isVisible: boolean }) {
  const [particles, setParticles] = useState<Array<{
    id: number; x: number; y: number; size: number; duration: number; delay: number;
  }>>([]);

  useEffect(() => {
    // 클라이언트에서만 파티클 생성 (hydration 불일치 방지)
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * -10,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[var(--gold)]/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: isVisible ? 0.6 : 0,
            animation: isVisible ? `particleFloat ${p.duration}s ease-in-out infinite` : 'none',
            animationDelay: `${p.delay}s`,
            transition: 'opacity 1s ease',
          }}
        />
      ))}
    </div>
  );
}

// 애니메이션 텍스트 컴포넌트
function AnimatedTitle({ children, isVisible }: { children: string; isVisible: boolean }) {
  const chars = children.split('');
  return (
    <span aria-label={children}>
      <span aria-hidden="true" style={{ perspective: '1000px' }}>
        {chars.map((char, index) => (
          <span
            key={index}
            className="inline-block will-change-transform"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translateY(0) rotateX(0)'
                : 'translateY(40px) rotateX(-60deg)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${0.3 + index * 0.03}s`,
              transformOrigin: 'center bottom',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  );
}

// Stat 카드 컴포넌트
function StatCard({
  index,
  title,
  subtitle,
  description,
  value,
  suffix,
  prefix = '',
  isVisible,
}: {
  index: number;
  title: string;
  subtitle: string;
  description: string;
  value: number;
  suffix: string;
  prefix?: string;
  isVisible: boolean;
}) {
  const { ref, count } = useCounterAnimation(value, { duration: 2500, delay: index * 200 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="text-center p-6 md:p-8 border border-white/20 backdrop-blur-sm relative overflow-hidden group cursor-default"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${0.2 + index * 0.15}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/20 to-transparent"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4">
          <span className="font-display text-[48px] md:text-[56px] lg:text-[64px] font-light text-white tracking-tight">
            {prefix}
            {/* Screen Reader / SEO Only Value */}
            <span className="sr-only">{value.toLocaleString()}</span>
            {/* Visual Animated Counter */}
            <span ref={ref} className="text-[var(--gold)]" aria-hidden="true">
              {count.toLocaleString()}
            </span>
          </span>
          <span className="text-[18px] md:text-[20px] font-light text-white ml-1">{suffix}</span>
        </div>
        <p className="text-white/90 text-[14px] md:text-[15px] font-medium mb-2">
          {title}
        </p>
        <p className="text-white/60 text-[12px] md:text-[13px] leading-relaxed">
          {subtitle}<br />{description}
        </p>
      </div>

      {/* Corner decoration */}
      <div
        className="absolute top-0 right-0 w-16 h-16"
        style={{
          background: 'linear-gradient(135deg, transparent 50%, var(--gold) 50%)',
          opacity: isHovered ? 0.12 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
}

export default function StatsSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.2);

  const stats = [
    {
      title: '가슴성형 전문 경력',
      subtitle: '성형외과 전문의로서',
      description: '축적된 노하우',
      value: 25,
      suffix: '년+',
      prefix: '',
    },
    {
      title: '가슴성형 수술 케이스',
      subtitle: '풍부한 임상 경험으로',
      description: '최적의 결과 도출',
      value: 12163,
      suffix: '케이스',
      prefix: '',
    },
    {
      title: '병원 개설',
      subtitle: '한결같은 마음으로',
      description: '아름다움을 실현',
      value: 8394,
      suffix: '일',
      prefix: 'D+',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image with parallax */}
      <div className="absolute inset-0">
        <Image
          src="/메인페이지 사진/7.jpg"
          alt="배경"
          fill
          className="object-cover"
          style={{
            transform: isVisible ? 'scale(1)' : 'scale(1.1)',
            transition: 'transform 2s ease-out',
          }}
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 50%, var(--gold) 0%, transparent 50%)',
          animation: isVisible ? 'subtleFloat 8s ease-in-out infinite' : 'none',
        }}
      />

      {/* Particle overlay */}
      <ParticleOverlay isVisible={isVisible} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="font-display text-[11px] md:text-[12px] tracking-[0.2em] mb-4 uppercase"
            style={{
              background: 'linear-gradient(90deg, var(--navy) 0%, var(--gold) 50%, var(--navy) 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: isVisible ? 'gradientShift 4s ease infinite' : 'none',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            UMNAGUMO PLASTIC SURGERY
          </p>
          <h2 className="text-[22px] md:text-[28px] lg:text-[32px] font-medium text-white leading-[1.5]">
            <AnimatedTitle isVisible={isVisible}>
              가슴성형의 명가, 세대를 잇는 아름다움
            </AnimatedTitle>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              index={index}
              {...stat}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
