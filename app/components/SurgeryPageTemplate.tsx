'use client';

import Image from './SafeImage';
import Link from 'next/link';
import Header from './Header';
import FooterDeferred from './deferred/FooterDeferred';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

import PostOpTimeline from './PostOpTimeline';
import InteractiveSculpture from './InteractiveSculpture';
import ScarCareSection from './ScarCareSection';
import { generateFaqSchema } from '../lib/seo';

interface SurgeryPageProps {
  englishTitle: string;
  koreanTitle: string;
  heroImage: string;
  concerns: string[];
  ctaBackgroundImage?: string;
  sculptureImage: string;
  surgeryImage: string;
  surgeryImageVariant?: 'default' | 'circle';
  explanationTitle: string;
  explanationSubtitle?: string;
  explanationContent: string[];
  specialTitle: string;
  specialSubtitle: string;
  specialBackgroundImage?: string;
  specialPoints: {
    icon: 'design' | 'time' | 'feature';
    title: string;
    description: string;
  }[];
  faqTitle: string;
  faqs: FAQ[];
  showTimeline?: boolean;
  timelineSteps?: {
    period: string;
    items: string[];
  }[];
  showScarCare?: boolean;
}

// ===== 고급 스크롤 애니메이션 훅 =====
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

// ===== 텍스트 스크램블 훅 =====
function useTextScramble(text: string, isActive: boolean, delay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const chars = '가나다라마바사아자차카타파하';

  useEffect(() => {
    if (!isActive) return;

    const timeout = setTimeout(() => {
      const duration = 1200;
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
        if (progress < 1) requestAnimationFrame(animate);
        else setDisplayText(text);
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isActive, delay, chars]);

  return isActive ? displayText : '';
}

// ===== 파티클 배경 컴포넌트 =====
function createPrng(seed: number) {
  let state = seed | 0;
  return () => {
    state = (state + 0x6D2B79F5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleBackground({ isVisible }: { isVisible: boolean }) {
  const particles = useMemo(() => {
    const rand = createPrng(0x5f3759df);
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 3 + 1,
      duration: rand() * 15 + 10,
      delay: rand() * -10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[var(--gold)]/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: isVisible ? 0.6 : 0,
            animationName: isVisible ? 'particleFloat' : 'none',
            animationDuration: `${p.duration}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: `${p.delay}s`,
            transition: 'opacity 1s ease',
          }}
        />
      ))}
    </div>
  );
}

// ===== 글자 단위 애니메이션 컴포넌트 =====
interface AnimatedTextProps {
  children: string;
  isVisible: boolean;
  delay?: number;
  type?: 'char' | 'word' | 'line' | 'split' | 'wave';
  className?: string;
}

function AnimatedText({ children, isVisible, delay = 0, type = 'char', className = '' }: AnimatedTextProps) {
  if (type === 'line') {
    return (
      <span className={`block overflow-hidden ${className}`} style={{ perspective: '1000px' }}>
        <span
          className="block will-change-transform"
          style={{
            transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(110%) rotateX(-10deg)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: `${delay}s`,
            transformOrigin: 'top center',
          }}
        >
          {children}
        </span>
      </span>
    );
  }

  if (type === 'word') {
    const words = children.split(' ');
    return (
      <span className={className}>
        {words.map((word, index) => (
          <span
            key={index}
            className="inline-block will-change-transform"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(40px) rotateX(-20deg)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${delay + index * 0.08}s`,
            }}
          >
            {word}{index < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    );
  }

  if (type === 'split') {
    const chars = children.split('');
    const mid = Math.floor(chars.length / 2);
    return (
      <span className={className}>
        {chars.map((char, index) => {
          const fromLeft = index < mid;
          return (
            <span
              key={index}
              className="inline-block will-change-transform"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? 'translateX(0) scale(1)'
                  : `translateX(${fromLeft ? '-50px' : '50px'}) scale(0.8)`,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${delay + Math.abs(index - mid) * 0.03}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </span>
    );
  }

  if (type === 'wave') {
    const chars = children.split('');
    return (
      <span className={className}>
        {chars.map((char, index) => (
          <span
            key={index}
            className="inline-block will-change-transform"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : `translateY(${20 + Math.sin(index * 0.5) * 15}px)`,
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${delay + index * 0.025}s`,
              animation: isVisible ? `heroWave 3s ease-in-out infinite ${index * 0.1}s` : 'none',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    );
  }

  // Character animation (default)
  const chars = children.split('');
  return (
    <span className={className} style={{ perspective: '1000px' }}>
      {chars.map((char, index) => (
        <span
          key={index}
          className="inline-block will-change-transform"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? 'perspective(500px) rotateX(0) translateY(0)'
              : 'perspective(500px) rotateX(-90deg) translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: `${delay + index * 0.03}s`,
            transformOrigin: 'center bottom',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// ===== 섹션 타이틀 컴포넌트 =====
function SectionTitle({
  subtitle,
  title,
  description,
  isVisible,
  align = 'center',
}: {
  subtitle: string;
  title: string;
  description?: string;
  isVisible: boolean;
  align?: 'center' | 'left';
}) {
  return (
    <div className={`mb-14 ${align === 'center' ? 'text-center' : ''}`}>
      <div className="overflow-hidden mb-4">
        <p
          className="text-[12px] tracking-[0.2em] uppercase font-medium"
          style={{
            background: 'linear-gradient(90deg, var(--navy) 0%, var(--gold) 50%, var(--navy) 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: isVisible ? 'gradientShift 4s ease infinite' : 'none',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          {subtitle}
        </p>
      </div>
      <h2 className="text-[24px] md:text-[32px] font-semibold text-[var(--ink)] tracking-[-0.02em]">
        <AnimatedText isVisible={isVisible} delay={0.1} type="word">
          {title}
        </AnimatedText>
      </h2>
      {description && (
        <p
          className={`text-[14px] md:text-[15px] text-[#666] leading-relaxed mt-5 ${align === 'center' ? 'max-w-[700px] mx-auto' : ''
            }`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.3s',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// ===== 카운터 애니메이션 =====
function AnimatedCounter({ end, suffix = '', isVisible }: { end: number; suffix?: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * end));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isVisible, end]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

// ===== 3D 카드 컴포넌트 =====
function Card3D({
  children,
  className = '',
  delay = 0,
  isVisible,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  isVisible: boolean;
}) {
  const [transform, setTransform] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-500 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? transform || 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// ===== 글리치 텍스트 컴포넌트 =====
function GlitchText({ children, isVisible }: { children: string; isVisible: boolean }) {
  return (
    <span className="relative inline-block">
      <span
        className="relative z-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {children}
      </span>
      <span
        className="absolute inset-0 text-[var(--navy)]/30"
        style={{
          clipPath: 'inset(10% 0 60% 0)',
          animation: isVisible ? 'glitchText1 2s infinite linear alternate-reverse' : 'none',
        }}
        aria-hidden="true"
      >
        {children}
      </span>
      <span
        className="absolute inset-0 text-[var(--gold)]/30"
        style={{
          clipPath: 'inset(60% 0 10% 0)',
          animation: isVisible ? 'glitchText2 2s infinite linear alternate-reverse' : 'none',
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}

export default function SurgeryPageTemplate({
  englishTitle,
  koreanTitle,
  heroImage,
  concerns,
  sculptureImage,
  surgeryImage,
  surgeryImageVariant = 'default',
  explanationTitle,
  explanationSubtitle,
  explanationContent,
  specialTitle,
  specialSubtitle,
  specialBackgroundImage,
  specialPoints,
  faqTitle,
  faqs,
  showTimeline = false,
  timelineSteps,
  showScarCare = false,
}: SurgeryPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loadStage, setLoadStage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const isCircleSurgeryImage = surgeryImageVariant === 'circle';

  // 스크롤 애니메이션 훅
  const { ref: concernsRef, isVisible: concernsIsVisible } = useScrollAnimation(0.2);
  const { ref: ctaRef, isVisible: ctaIsVisible } = useScrollAnimation(0.3);
  const { ref: explanationRef, isVisible: explanationIsVisible } = useScrollAnimation(0.2);
  const { ref: specialRef, isVisible: specialIsVisible } = useScrollAnimation(0.2);
  const { ref: faqRef, isVisible: faqIsVisible } = useScrollAnimation(0.2);
  const { ref: finalCtaRef, isVisible: finalCtaIsVisible } = useScrollAnimation(0.3);

  // 텍스트 스크램블
  const scrambledSubtitle = useTextScramble(englishTitle, loadStage >= 1, 0);

  // 로딩 단계
  useEffect(() => {
    const timers = [
      setTimeout(() => setLoadStage(1), 100),
      setTimeout(() => setLoadStage(2), 500),
      setTimeout(() => setLoadStage(3), 1000),
      setTimeout(() => setLoadStage(4), 1500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // 마우스 패럴랙스
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    const element = heroRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  const iconComponents = {
    design: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    time: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    feature: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  };

  // Schema Generation
  const faqSchema = useMemo(() => (faqs ? generateFaqSchema(faqs) : null), [faqs]);

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Header />
      <main className="pt-[70px] md:pt-0">
        {/* Hero Section - 고급 인터랙티브 */}
        <section
          ref={heroRef}
          className="relative h-[65vh] min-h-[450px] max-h-[650px] overflow-hidden"
        >
          {/* 로딩 프로그레스 바 */}
          <div
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[var(--navy)] via-[var(--gold)] to-[var(--navy)] z-20"
            style={{
              width: `${loadStage * 25}%`,
              transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* 배경 패럴랙스 */}
          <div
            className="absolute inset-0 transition-transform duration-700"
            style={{
              transform: `scale(1.1) translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            }}
          >
            <Image
              src={heroImage}
              alt={koreanTitle}
              fill
              className="object-cover"
              priority
              quality={100}
              sizes="100vw"
            />
          </div>

          {/* 그라디언트 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />

          {/* 파티클 배경 */}
          <ParticleBackground isVisible={loadStage >= 2} />

          {/* 왼쪽 악센트 라인 */}
          <div
            className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--navy)] via-[var(--gold)] to-transparent z-10"
            style={{
              opacity: loadStage >= 1 ? 0.7 : 0,
              transform: loadStage >= 1 ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          />

          {/* 컨텐츠 */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-16 w-full">
              <div className="max-w-[650px]">
                {/* 영문 서브타이틀 - 스크램블 효과 */}
                <div className="overflow-hidden mb-5">
                  <p
                    className="font-display text-[12px] md:text-[14px] tracking-[0.3em] uppercase font-medium text-white/80"
                    style={{
                      opacity: loadStage >= 1 ? 1 : 0,
                      transform: loadStage >= 1 ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {scrambledSubtitle || englishTitle}
                  </p>
                </div>

                {/* 한글 타이틀 - 글자별 애니메이션 */}
                <h1
                  className="text-[34px] md:text-[48px] lg:text-[56px] font-bold text-white tracking-[-0.02em] leading-[1.15] mb-6"
                  style={{ perspective: '1000px' }}
                  aria-label={koreanTitle}
                >
                  <span aria-hidden="true">
                    {koreanTitle.split('').map((char, index) => (
                      <span
                        key={index}
                        className="inline-block will-change-transform"
                        style={{
                          opacity: loadStage >= 2 ? 1 : 0,
                          transform: loadStage >= 2
                            ? 'perspective(500px) rotateX(0) translateY(0) scale(1)'
                            : 'perspective(500px) rotateX(-90deg) translateY(50px) scale(0.8)',
                          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                          transitionDelay: `${0.6 + index * 0.04}s`,
                          transformOrigin: 'center bottom',
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </span>
                </h1>

                {/* 애니메이션 라인 */}
                <div className="relative h-[2px] w-24 overflow-hidden mb-8">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[var(--navy)] via-[var(--gold)] to-[var(--navy)]"
                    style={{
                      transform: loadStage >= 3 ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      animation: loadStage >= 3 ? 'shimmer 2s ease-in-out infinite' : 'none',
                    }}
                  />
                </div>

                {/* CTA 버튼 */}
                <div
                  style={{
                    opacity: loadStage >= 4 ? 1 : 0,
                    transform: loadStage >= 4 ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <Link
                    href="http://pf.kakao.com/_QRNzxj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--navy)] text-white text-[14px] font-medium overflow-hidden"
                  >
                    <span className="relative z-10">상담 예약하기</span>
                    <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[var(--primary-brown-dark)] to-[var(--navy)]"
                      style={{
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                    <style jsx>{`
                      .group:hover div {
                        transform: translateX(0) !important;
                      }
                    `}</style>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 플로팅 숫자 장식 */}
          <div
            className="absolute bottom-12 right-12 hidden lg:block font-display text-white/15 text-[100px] font-bold"
            style={{
              opacity: loadStage >= 3 ? 1 : 0,
              transform: loadStage >= 3
                ? `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
                : 'translateY(60px)',
              transition: 'opacity 1s ease 1s, transform 0.5s ease-out',
            }}
          >
            <GlitchText isVisible={loadStage >= 3}>01</GlitchText>
          </div>

          {/* 스크롤 인디케이터 */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{
              opacity: loadStage >= 4 ? 1 : 0,
              transition: 'opacity 0.6s ease 1.5s',
            }}
          >
            <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
            <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
              <div
                className="w-1 h-2 bg-white/60 rounded-full mt-1"
                style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}
              />
            </div>
          </div>
        </section>

        {/* Concerns Section */}
        <section className="py-20 md:py-28 bg-white" ref={concernsRef}>
          <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* 조각상 이미지 */}
              {/* 조각상 이미지 - Interactive Component */}
              <div className="flex justify-center order-2 lg:order-1 h-[450px]">
                <div
                  className="relative w-full h-full"
                  style={{
                    opacity: concernsIsVisible ? 1 : 0,
                    transform: concernsIsVisible ? 'translateX(0)' : 'translateX(-60px)',
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                  }}
                >
                  <InteractiveSculpture imageSrc={sculptureImage} />
                </div>
              </div>

              {/* 고민 리스트 */}
              <div className="order-1 lg:order-2">
                <SectionTitle
                  subtitle="Your Concerns"
                  title="이런 고민이 있으신가요?"
                  isVisible={concernsIsVisible}
                  align="left"
                />
                <div className="space-y-4">
                  {concerns.map((concern, index) => (
                    <Card3D
                      key={index}
                      isVisible={concernsIsVisible}
                      delay={0.3 + index * 0.1}
                      className="group"
                    >
                      <div className="flex items-start gap-4 p-5 bg-[#faf9f7] hover:bg-[#f5f3f0] transition-all duration-300 cursor-default">
                        <span className="flex-shrink-0 w-9 h-9 bg-[var(--navy)] text-white text-[12px] font-medium flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <p className="text-[14px] md:text-[15px] text-[#444] leading-relaxed pt-1 group-hover:text-[#2a2a2a] transition-colors">
                          {concern}
                        </p>
                      </div>
                    </Card3D>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section
          className="relative py-16 md:py-20 bg-[var(--navy)] overflow-hidden"
          ref={ctaRef}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%),
                               radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
              transform: ctaIsVisible ? 'scale(1)' : 'scale(1.3)',
              transition: 'transform 2s ease',
            }}
          />

          <div className="relative max-w-[900px] mx-auto px-6 lg:px-10 text-center">
            <p
              className="text-white/80 text-[14px] mb-3"
              style={{
                opacity: ctaIsVisible ? 1 : 0,
                transform: ctaIsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease',
              }}
            >
              이런 고민을 가지고 있다면,
            </p>
            <p className="text-white text-[20px] md:text-[28px] font-medium tracking-[-0.02em]">
              <AnimatedText isVisible={ctaIsVisible} delay={0.2} type="wave">
                지금이 바로 전문의 상담이 필요한 때입니다.
              </AnimatedText>
            </p>
          </div>
        </section>

        {/* Explanation Section */}
        <section className="py-20 md:py-28 bg-[var(--paper)]" ref={explanationRef}>
          <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* 수술 이미지 */}
              <div
                className="relative"
                style={{
                  opacity: explanationIsVisible ? 1 : 0,
                  transform: explanationIsVisible ? 'translateX(0)' : 'translateX(-50px)',
                  transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-[var(--navy)]/15 ${isCircleSurgeryImage ? 'rounded-full' : ''}`}
                  style={{
                    transform: explanationIsVisible ? 'translate(20px, 20px)' : 'translate(0, 0)',
                    transition: 'transform 1s ease 0.3s',
                  }}
                />
                <div className={`relative overflow-hidden group ${isCircleSurgeryImage ? 'aspect-square rounded-full bg-[var(--paper)]' : ''}`}>
                  {isCircleSurgeryImage ? (
                    <Image
                      src={surgeryImage}
                      alt={koreanTitle}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      quality={100}
                    />
                  ) : (
                    <Image
                      src={surgeryImage}
                      alt={koreanTitle}
                      width={700}
                      height={525}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      quality={100}
                    />
                  )}
                </div>
              </div>

              {/* 설명 컨텐츠 */}
              <div>
                <div
                  className="flex items-center gap-4 mb-6"
                  style={{
                    opacity: explanationIsVisible ? 1 : 0,
                    transform: explanationIsVisible ? 'translateX(0)' : 'translateX(30px)',
                    transition: 'all 0.6s ease',
                  }}
                >
                  <div
                    className="w-14 h-[1px] bg-[var(--navy)]"
                    style={{
                      transform: explanationIsVisible ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.8s ease 0.2s',
                    }}
                  />
                  <span className="text-[12px] text-[var(--navy)] tracking-[0.2em] uppercase">About Surgery</span>
                </div>
                <h2 className="text-[26px] md:text-[34px] font-semibold text-[var(--ink)] leading-[1.3] tracking-[-0.02em]">
                  <AnimatedText isVisible={explanationIsVisible} delay={0.2} type="split">
                    {explanationTitle}
                  </AnimatedText>
                </h2>
                {explanationSubtitle && (
                  <p
                    className="text-[18px] md:text-[22px] font-medium text-[var(--navy)] mt-2 mb-8"
                    style={{
                      opacity: explanationIsVisible ? 1 : 0,
                      transition: 'opacity 0.6s ease 0.4s',
                    }}
                  >
                    {explanationSubtitle}
                  </p>
                )}
                {!explanationSubtitle && <div className="mb-8" />}
                <div className="space-y-5">
                  {explanationContent.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[14px] md:text-[15px] text-[#555] leading-[1.9]"
                      style={{
                        opacity: explanationIsVisible ? 1 : 0,
                        transform: explanationIsVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: `all 0.6s ease ${0.4 + index * 0.1}s`,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div
                  style={{
                    opacity: explanationIsVisible ? 1 : 0,
                    transform: explanationIsVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease 0.6s',
                  }}
                >
                  <Link
                    href="http://pf.kakao.com/_QRNzxj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-[#2a2a2a] text-white text-[14px] font-medium hover:bg-[#1a1a1a] transition-colors group"
                  >
                    상담 예약하기
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Points Section */}
        <section className="relative py-20 md:py-28 overflow-hidden" ref={specialRef}>
          {specialBackgroundImage && (
            <>
              <Image
                src={specialBackgroundImage}
                alt="배경"
                fill
                className="object-cover"
                quality={100}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-white/92 backdrop-blur-sm" />
            </>
          )}
          {!specialBackgroundImage && <div className="absolute inset-0 bg-white" />}

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16">
            <SectionTitle
              subtitle="Why Choose Us"
              title={specialTitle}
              description={specialSubtitle}
              isVisible={specialIsVisible}
            />

            <div className="grid md:grid-cols-3 gap-6">
              {specialPoints.map((point, index) => (
                <Card3D
                  key={index}
                  isVisible={specialIsVisible}
                  delay={0.3 + index * 0.15}
                  className="group"
                >
                  <div className="bg-white border border-gray-100 p-8 md:p-10 hover:border-[var(--navy)]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500">
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-[var(--navy)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        {iconComponents[point.icon]}
                      </div>
                      <span className="text-[44px] font-light text-gray-100 group-hover:text-[var(--navy)]/20 transition-colors duration-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-[18px] font-semibold text-[var(--ink)] mb-3 group-hover:text-[var(--navy)] transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-[14px] text-[#666] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </Card3D>
              ))}
            </div>
          </div>
        </section>

        {showTimeline && <PostOpTimeline steps={timelineSteps} />}

        {showScarCare && <ScarCareSection />}

        {/* FAQ Section */}
        <section className="py-20 md:py-28 bg-[var(--paper)]" ref={faqRef}>
          <div className="max-w-[800px] mx-auto px-6 lg:px-10">
            <SectionTitle
              subtitle="FAQ"
              title={faqTitle}
              isVisible={faqIsVisible}
            />

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 overflow-hidden"
                  style={{
                    opacity: faqIsVisible ? 1 : 0,
                    transform: faqIsVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
                    transitionDelay: `${0.2 + index * 0.08}s`,
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 text-[13px] font-medium text-[var(--navy)]">
                        Q{String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[15px] font-medium text-[var(--ink)]">
                        {faq.question}
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[var(--navy)] transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-out ${openFaq === index ? 'max-h-[500px]' : 'max-h-0'
                      }`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="pl-12 border-l-2 border-[var(--navy)]/30">
                        <p className="text-[14px] text-[#666] leading-[1.8]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-24 bg-[#2a2a2a] overflow-hidden" ref={finalCtaRef}>
          <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
            <p
              className="text-[12px] tracking-[0.2em] uppercase mb-6"
              style={{
                background: 'linear-gradient(90deg, var(--navy) 0%, var(--gold) 50%, var(--navy) 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: finalCtaIsVisible ? 'gradientShift 4s ease infinite' : 'none',
                opacity: finalCtaIsVisible ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            >
              Consultation
            </p>
            <h2 className="text-[24px] md:text-[32px] font-semibold text-white mb-4 tracking-[-0.02em]">
              <AnimatedText isVisible={finalCtaIsVisible} delay={0.1} type="word">
                전문의와 상담하세요
              </AnimatedText>
            </h2>
            <p
              className="text-[14px] md:text-[15px] text-white/70 mb-10 leading-relaxed"
              style={{
                opacity: finalCtaIsVisible ? 1 : 0,
                transform: finalCtaIsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.3s',
              }}
            >
              25년 이상의 경험을 가진 전문의가 직접 상담해 드립니다.<br />
              개인별 맞춤 진단과 최적의 수술 계획을 제안받으세요.
            </p>
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{
                opacity: finalCtaIsVisible ? 1 : 0,
                transform: finalCtaIsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.4s',
              }}
            >
              <Link
                href="http://pf.kakao.com/_QRNzxj"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-10 py-4 bg-[var(--navy)] text-white text-[14px] font-medium overflow-hidden"
              >
                <span className="relative z-10">카카오톡 상담</span>
                <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="tel:025126838"
                className="inline-flex items-center gap-2 px-10 py-4 border border-white/30 text-white text-[14px] font-medium hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                02-512-6838
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterDeferred />
    </>
  );
}
