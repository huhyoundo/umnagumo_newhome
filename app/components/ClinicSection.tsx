'use client';

import Image from './SafeImage';
import Link from 'next/link';
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
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * -20,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-[var(--navy)]/8"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
            height: p.size,
            opacity: isVisible ? 0.5 : 0,
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
    <span style={{ perspective: '1000px' }}>
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
  );
}

const clinicItems = [
  {
    number: '01',
    title: '가슴재수술',
    subtitle: 'Breast Revision',
    description: '구축, 비대칭, 모양 불만족 등 이전 수술의 문제를 정밀하게 교정합니다.',
    image: '/메인페이지 사진/2(가슴재수술).png',
    href: '/breast-revision',
  },
  {
    number: '02',
    title: '유륜거상술',
    subtitle: 'Areola Lift',
    description: '처진 유두와 유륜의 위치를 자연스럽게 교정하여 아름다운 형태를 만듭니다.',
    image: '/메인페이지 사진/3(유륜거상술).png',
    href: '/areola-lift',
  },
  {
    number: '03',
    title: '안전케어',
    subtitle: 'Safety Care',
    description: '수술 전후 체계적인 관리 시스템으로 안전하고 빠른 회복을 도와드립니다.',
    image: '/메인페이지 사진/4(안전케어).jpg',
    href: '/safety-care',
  },
  {
    number: '04',
    title: '보형물가이드',
    subtitle: 'Implant Guide',
    description: 'FDA 승인 정품 보형물의 종류와 특징을 상세히 안내해 드립니다.',
    image: '/메인페이지 사진/5(보형물가이드).jpg',
    href: '/implant-guide',
  },
];

// 3D 클리닉 카드 컴포넌트
function ClinicCard({
  item,
  index,
  isVisible,
}: {
  item: typeof clinicItems[0];
  index: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -6;
    const rotateY = (x - 0.5) * 6;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    setMousePosition({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    setIsHovered(false);
  }, []);

  // Row-based delay: first row items appear before second row
  const row = Math.floor(index / 2);
  const col = index % 2;
  const delay = 0.2 + row * 0.2 + col * 0.1;

  return (
    <Link
      ref={cardRef}
      href={item.href}
      className="group bg-white overflow-hidden relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
          : 'translateY(60px) scale(0.95)',
        transition: isHovered
          ? 'transform 0.2s ease-out'
          : `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        boxShadow: isHovered
          ? '0 30px 60px -12px rgba(0, 0, 0, 0.2)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Glow effect following cursor */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, var(--navy) 0%, transparent 50%)`,
          opacity: isHovered ? 0.15 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-[45%] aspect-[4/3] md:aspect-auto md:min-h-[240px] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
            quality={100}
            sizes="(max-width: 768px) 100vw, 400px"
          />

          {/* Image overlay gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Number badge with reveal animation */}
          <div
            className="absolute top-4 left-4 overflow-hidden"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.6s ease ${delay + 0.2}s`,
            }}
          >
            <div
              className="w-10 h-10 bg-[var(--navy)] flex items-center justify-center relative overflow-hidden"
              style={{
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.3s ease',
              }}
            >
              {/* Shimmer on badge */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
              <span className="font-display text-[13px] text-white font-light relative z-10">
                {item.number}
              </span>
            </div>
          </div>

          {/* Category label on hover */}
          <div
            className="absolute bottom-4 left-4"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.3s ease',
            }}
          >
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-medium text-[var(--navy)] uppercase tracking-wider">
              {item.subtitle}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative">
          {/* Background pattern on content area */}
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-5"
            style={{
              background: `radial-gradient(circle, var(--navy) 1px, transparent 1px)`,
              backgroundSize: '10px 10px',
            }}
          />

          <p
            className="font-display text-[10px] tracking-[0.15em] text-[var(--navy)] mb-2 uppercase"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
              transition: `all 0.6s ease ${delay + 0.15}s`,
            }}
          >
            {item.subtitle}
          </p>

          <h3
            className="text-[20px] md:text-[22px] font-semibold text-[var(--ink)] mb-3 transition-colors duration-300"
            style={{
              color: isHovered ? 'var(--navy)' : 'var(--ink)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
              transition: `all 0.6s ease ${delay + 0.2}s, color 0.3s ease`,
            }}
          >
            {item.title}
          </h3>

          <p
            className="text-[13px] text-gray-500 leading-[1.8] mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
              transition: `all 0.6s ease ${delay + 0.25}s`,
            }}
          >
            {item.description}
          </p>

          {/* CTA with arrow animation */}
          <div
            className="flex items-center gap-2 text-[12px] font-medium text-[var(--navy)]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
              transition: `all 0.6s ease ${delay + 0.3}s`,
            }}
          >
            <span className="relative">
              자세히 보기
              <span
                className="absolute bottom-0 left-0 h-[1px] bg-[var(--navy)]"
                style={{
                  width: isHovered ? '100%' : '0%',
                  transition: 'width 0.3s ease',
                }}
              />
            </span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.3s ease',
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[3px]"
        style={{
          background: 'linear-gradient(90deg, var(--navy), var(--gold))',
          width: isHovered ? '100%' : '0%',
          transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </Link>
  );
}

export default function ClinicSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.15);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[var(--paper)] relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground isVisible={isVisible} />

      {/* Decorative elements */}
      <div
        className="absolute top-10 right-20 w-40 h-40 rounded-full bg-[var(--navy)]/5"
        style={{
          transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)',
          transition: 'all 1s ease 0.3s',
        }}
      />
      <div
        className="absolute bottom-40 left-10 w-24 h-24 rounded-full bg-[var(--gold)]/5"
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(0)',
          transition: 'transform 1s ease 0.5s',
        }}
      />

      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
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
            UMNAGUMO CLINIC
          </p>
          <h2 className="text-[26px] md:text-[34px] font-semibold text-[var(--ink)] mb-4 tracking-[-0.02em]">
            <AnimatedTitle isVisible={isVisible}>
              엄나구모 가슴클리닉
            </AnimatedTitle>
          </h2>
          <p
            className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.5s',
            }}
          >
            20년 이상의 경험과 노하우로 완성하는<br className="md:hidden" />
            자연스러운 아름다움
          </p>
        </div>

        {/* Clinic Grid - 2x2 on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {clinicItems.map((item, index) => (
            <ClinicCard
              key={item.title}
              item={item}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 flex justify-center">
          <div
            className="flex items-center gap-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.6s ease 1.2s',
            }}
          >
            <div
              className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[var(--navy)]/30"
              style={{
                transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'right',
                transition: 'transform 0.5s ease 1.2s',
              }}
            />
            <div
              className="w-3 h-3 rotate-45 border border-[var(--navy)]/30"
              style={{
                transform: isVisible ? 'scale(1) rotate(45deg)' : 'scale(0) rotate(45deg)',
                transition: 'transform 0.4s ease 1.3s',
              }}
            />
            <div
              className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[var(--navy)]/30"
              style={{
                transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.5s ease 1.2s',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
