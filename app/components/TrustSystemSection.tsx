'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// 스크롤 애니메이션 훅
function useScrollAnimation(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
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

// 파티클 배경 컴포넌트 (클라이언트 전용)
function ParticleBackground({ isVisible }: { isVisible: boolean }) {
  const [particles, setParticles] = useState<Array<{
    id: number; x: number; y: number; size: number; duration: number; delay: number;
  }>>([]);

  useEffect(() => {
    // 클라이언트에서만 파티클 생성 (hydration 불일치 방지)
    setParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * -15,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[var(--navy)]/10"
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

// 프로그레스 링 컴포넌트
function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 3,
  isVisible,
  delay = 0,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  isVisible: boolean;
  delay?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const timeout = setTimeout(() => {
      const duration = 1500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const prog = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - prog, 3);
        setCurrentProgress(eased * progress);

        if (prog < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, progress, delay]);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-[var(--navy)]/10"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className="text-[var(--navy)]"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: circumference - (currentProgress / 100) * circumference,
          transition: 'stroke-dashoffset 0.1s ease-out',
        }}
      />
    </svg>
  );
}

// 아이콘 컴포넌트
const icons = {
  customized: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  safety: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  premium: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  aftercare: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
};

const trustItems = [
  {
    number: '01',
    title: '1:1 맞춤 상담',
    subtitle: 'Customized',
    description: '체형, 피부 상태, 라이프스타일을 고려한 개인 맞춤 수술 계획을 수립합니다.',
    icon: 'customized' as const,
    progress: 100,
  },
  {
    number: '02',
    title: '안전 수술 시스템',
    subtitle: 'Safety',
    description: '대학병원급 마취 시스템과 응급대응으로 안전한 수술 환경을 제공합니다.',
    icon: 'safety' as const,
    progress: 100,
  },
  {
    number: '03',
    title: '정품 보형물 사용',
    subtitle: 'Premium',
    description: 'FDA 승인 정품 보형물만 사용하며, 정품 인증서를 제공합니다.',
    icon: 'premium' as const,
    progress: 100,
  },
  {
    number: '04',
    title: '체계적 사후관리',
    subtitle: 'After Care',
    description: '수술 후 정기 검진과 회복 프로그램으로 최상의 결과를 유지합니다.',
    icon: 'aftercare' as const,
    progress: 100,
  },
];

// 3D 틸트 카드 컴포넌트 (최적화됨)
function TrustCard({
  item,
  index,
  isVisible,
}: {
  item: typeof trustItems[0];
  index: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // 애니메이션 상태를 위한 Ref (렌더링 유발 X)
  const isHoveredRef = useRef(false);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHoveredRef.current) return;

    // RAF를 사용하여 프레임 드롭 방지
    if (rafId.current) return;

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current || !glowRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -10;
      const rotateY = (x - 0.5) * 10;

      // Direct DOM update
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      glowRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, var(--navy) 0%, transparent 50%)`;

      rafId.current = null;
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.2s ease-out, box-shadow 0.3s ease';
      cardRef.current.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.15)';
    }
    if (glowRef.current) glowRef.current.style.opacity = '0.15';
    if (accentRef.current) accentRef.current.style.opacity = '0.12';
    if (bottomLineRef.current) bottomLineRef.current.style.width = '100%';
    if (iconRef.current) iconRef.current.style.transform = 'scale(1.15) rotate(5deg)';
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }

    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      cardRef.current.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
    }
    if (glowRef.current) glowRef.current.style.opacity = '0';
    if (accentRef.current) accentRef.current.style.opacity = '0';
    if (bottomLineRef.current) bottomLineRef.current.style.width = '0%';
    if (iconRef.current) iconRef.current.style.transform = 'scale(1) rotate(0)';
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white p-6 md:p-8 relative overflow-hidden cursor-default"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
          : 'translateY(60px) scale(0.95)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Glow effect that follows cursor */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, var(--navy) 0%, transparent 50%)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Corner accent */}
      <div
        ref={accentRef}
        className="absolute top-0 right-0 w-20 h-20"
        style={{
          background: 'linear-gradient(135deg, transparent 50%, var(--gold) 50%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Number & Progress Ring */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="relative">
          <ProgressRing
            progress={item.progress}
            size={70}
            strokeWidth={2}
            isVisible={isVisible}
            delay={300 + index * 150}
          />
          <span
            className="absolute inset-0 flex items-center justify-center font-display text-[28px] font-light text-[var(--navy)]/40"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.6s ease ${0.4 + index * 0.1}s`,
            }}
          >
            {item.number}
          </span>
        </div>
        <div
          ref={iconRef}
          className="text-[var(--navy)] transition-all duration-500"
        >
          {icons[item.icon]}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10" ref={contentRef}>
        <p
          className="font-display text-[10px] tracking-[0.15em] text-[var(--navy)] mb-2 uppercase"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
            transition: `all 0.6s ease ${0.3 + index * 0.1}s`,
          }}
        >
          {item.subtitle}
        </p>
        <h3
          className="text-[16px] md:text-[17px] font-semibold text-[var(--ink)] mb-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
            transition: `all 0.6s ease ${0.35 + index * 0.1}s`,
          }}
        >
          {item.title}
        </h3>
        <p
          className="text-[12px] md:text-[13px] text-gray-500 leading-[1.8]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
            transition: `all 0.6s ease ${0.4 + index * 0.1}s`,
          }}
        >
          {item.description}
        </p>
      </div>

      {/* Bottom line accent */}
      <div
        ref={bottomLineRef}
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[var(--navy)] to-[var(--gold)]"
        style={{
          width: '0%',
          transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}

// 연결 라인 컴포넌트 (데스크탑용)
function ConnectionLine({ isVisible, index }: { isVisible: boolean; index: number }) {
  return (
    <div
      className="hidden lg:flex absolute top-1/2 -translate-y-1/2 items-center justify-center"
      style={{
        left: `${((index + 1) / 4) * 100}%`,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
        transition: `opacity 0.6s ease ${0.5 + index * 0.15}s`,
      }}
    >
      <div className="flex items-center gap-1">
        <div
          className="w-8 h-[1px] bg-[var(--navy)]/30"
          style={{
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: `transform 0.4s ease ${0.6 + index * 0.15}s`,
          }}
        />
        <div
          className="w-2 h-2 rounded-full border border-[var(--navy)]/30"
          style={{
            transform: isVisible ? 'scale(1)' : 'scale(0)',
            transition: `transform 0.3s ease ${0.7 + index * 0.15}s`,
          }}
        />
        <div
          className="w-8 h-[1px] bg-[var(--navy)]/30"
          style={{
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            transition: `transform 0.4s ease ${0.8 + index * 0.15}s`,
          }}
        />
      </div>
    </div>
  );
}

export default function TrustSystemSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.15);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[var(--paper)] relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground isVisible={isVisible} />

      {/* Decorative elements */}
      <div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[var(--navy)]/5"
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(0)',
          transition: 'transform 1s ease 0.5s',
        }}
      />
      <div
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[var(--gold)]/5"
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(0)',
          transition: 'transform 1s ease 0.7s',
        }}
      />

      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
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
            TRUST SYSTEM
          </p>
          <h2 className="text-[24px] md:text-[32px] font-semibold text-[var(--ink)] mb-4 tracking-[-0.02em]">
            <AnimatedTitle isVisible={isVisible}>
              엄나구모 4가지 약속
            </AnimatedTitle>
          </h2>
          <p
            className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed max-w-[500px] mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.5s',
            }}
          >
            환자의 안전과 만족을 위해 엄나구모 성형외과가<br className="hidden md:block" />
            지켜나가는 약속입니다.
          </p>
        </div>

        {/* Trust Items Grid with Connection Lines */}
        <div className="relative">
          {/* Connection lines (desktop only) */}
          {[0, 1, 2].map((index) => (
            <ConnectionLine key={index} isVisible={isVisible} index={index} />
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {trustItems.map((item, index) => (
              <TrustCard
                key={item.number}
                item={item}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex justify-center">
          <div
            className="flex items-center gap-3"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.6s ease 1s',
            }}
          >
            <div
              className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--navy)]/30"
              style={{
                transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'right',
                transition: 'transform 0.6s ease 1s',
              }}
            />
            <div
              className="w-2 h-2 rounded-full bg-[var(--navy)]/30"
              style={{
                transform: isVisible ? 'scale(1)' : 'scale(0)',
                transition: 'transform 0.3s ease 1.1s',
              }}
            />
            <div
              className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--navy)]/30"
              style={{
                transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.6s ease 1s',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
