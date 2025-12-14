'use client';

import Link from 'next/link';
import { useEffect, useState, useRef, useCallback } from 'react';
import LiquidRevealCanvas from './LiquidRevealCanvas';

// 텍스트 스크램블 효과 (해커 스타일)
function useTextScramble(text: string, isActive: boolean, delay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const chars = '가나다라마바사아자차카타파하';

  useEffect(() => {
    if (!isActive) {
      setDisplayText('');
      return;
    }

    const timeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isActive, delay]);

  return displayText;
}

// 스플릿 텍스트 애니메이션 (글자가 펼쳐지며 등장)
interface SplitTextProps {
  children: string;
  isVisible: boolean;
  delay?: number;
  className?: string;
}

function SplitText({ children, isVisible, delay = 0, className = '' }: SplitTextProps) {
  const chars = children.split('');
  const midPoint = Math.floor(chars.length / 2);

  return (
    <span className={`inline-flex justify-center ${className}`}>
      {chars.map((char, index) => {
        const distanceFromMid = index - midPoint;
        const initialX = distanceFromMid * 50;

        return (
          <span
            key={index}
            className="inline-block will-change-transform"
            style={{
              transform: isVisible
                ? 'translateX(0) scale(1) rotateY(0deg)'
                : `translateX(${initialX}px) scale(0) rotateY(${distanceFromMid * 30}deg)`,
              opacity: isVisible ? 1 : 0,
              filter: isVisible ? 'blur(0px)' : 'blur(8px)',
              transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)`,
              transitionDelay: `${delay + Math.abs(distanceFromMid) * 0.05}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </span>
  );
}

// 키네틱 웨이브 텍스트
interface WaveTextProps {
  children: string;
  isVisible: boolean;
  delay?: number;
  className?: string;
}

function WaveText({ children, isVisible, delay = 0, className = '' }: WaveTextProps) {
  const [waveActive, setWaveActive] = useState(false);
  const chars = children.split('');

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setWaveActive(true), (delay + 1) * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <span className={className}>
      {chars.map((char, index) => (
        <span
          key={index}
          className="inline-block will-change-transform"
          style={{
            transform: isVisible
              ? 'translateY(0) rotateX(0deg)'
              : 'translateY(100%) rotateX(-90deg)',
            opacity: isVisible ? 1 : 0,
            transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1)`,
            transitionDelay: `${delay + index * 0.03}s`,
            animation: waveActive ? `heroWave 3s ease-in-out ${index * 0.1}s infinite` : 'none',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// 마그네틱 커서 텍스트
interface MagneticTextProps {
  children: string;
  className?: string;
}

function MagneticText({ children, className = '' }: MagneticTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [charPositions, setCharPositions] = useState<{ x: number; y: number }[]>([]);
  const chars = children.split('');

  useEffect(() => {
    setCharPositions(chars.map(() => ({ x: 0, y: 0 })));
  }, [children]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const charElements = Array.from(containerRef.current.querySelectorAll<HTMLElement>('.magnetic-char'));
    const newPositions = charElements.map((el) => {
      const charRect = el.getBoundingClientRect();
      const charCenterX = charRect.left - rect.left + charRect.width / 2;
      const charCenterY = charRect.top - rect.top + charRect.height / 2;

      const distX = mouseX - charCenterX;
      const distY = mouseY - charCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const maxDistance = 150;
      const intensity = Math.max(0, 1 - distance / maxDistance);

      return {
        x: distX * intensity * 0.3,
        y: distY * intensity * 0.3 - intensity * 8,
      };
    });

    setCharPositions(newPositions);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCharPositions(chars.map(() => ({ x: 0, y: 0 })));
  }, [chars.length]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {chars.map((char, index) => (
        <span
          key={index}
          className="magnetic-char inline-block transition-all duration-200 ease-out cursor-default"
          style={{
            transform: `translate(${charPositions[index]?.x || 0}px, ${charPositions[index]?.y || 0}px) scale(${1 + Math.abs(charPositions[index]?.y || 0) * 0.01})`,
            color: Math.abs(charPositions[index]?.y || 0) > 3 ? 'var(--gold)' : undefined,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// 클립패스 리빌 컴포넌트
interface ClipRevealProps {
  children: React.ReactNode;
  isVisible: boolean;
  delay?: number;
  direction?: 'left' | 'right' | 'center' | 'top';
  className?: string;
}

function ClipReveal({ children, isVisible, delay = 0, direction = 'left', className = '' }: ClipRevealProps) {
  const getClipPath = () => {
    if (isVisible) return 'inset(0 0 0 0)';
    switch (direction) {
      case 'left': return 'inset(0 100% 0 0)';
      case 'right': return 'inset(0 0 0 100%)';
      case 'center': return 'inset(0 50% 0 50%)';
      case 'top': return 'inset(100% 0 0 0)';
      default: return 'inset(0 100% 0 0)';
    }
  };

  return (
    <span
      className={`inline-block ${className}`}
      style={{
        clipPath: getClipPath(),
        transition: `clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1)`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </span>
  );
}

// 글리치 텍스트 효과
interface GlitchTextProps {
  children: string;
  isVisible: boolean;
  delay?: number;
  className?: string;
}

function GlitchText({ children, isVisible, delay = 0, className = '' }: GlitchTextProps) {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setGlitchActive(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        opacity: glitchActive ? 1 : 0,
        transform: glitchActive ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <span className="relative z-10">{children}</span>
      {glitchActive && (
        <>
          <span
            className="absolute top-0 left-0 w-full h-full text-[var(--gold)] opacity-80"
            style={{
              animation: 'glitchText1 2.5s infinite',
              clipPath: 'inset(40% 0 40% 0)',
            }}
          >
            {children}
          </span>
          <span
            className="absolute top-0 left-0 w-full h-full text-[var(--navy)] opacity-80"
            style={{
              animation: 'glitchText2 2.5s infinite',
              clipPath: 'inset(60% 0 20% 0)',
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

// 파티클 배경 효과
function ParticleBackground({ isVisible }: { isVisible: boolean }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    if (isVisible) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 2,
      }));
      setParticles(newParticles);
    }
  }, [isVisible]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-[var(--gold)]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: isVisible ? 0.3 : 0,
            animation: isVisible ? `particleFloat 4s ease-in-out ${particle.delay}s infinite` : 'none',
            transition: 'opacity 1s ease',
          }}
        />
      ))}
    </div>
  );
}

// 스크롤 인디케이터 (개선됨)
function ScrollIndicator({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className="flex flex-col items-center gap-2"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: '2s',
      }}
    >
      <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase font-display">
        Scroll
      </span>
      <div className="relative w-6 h-10 border-2 border-[var(--navy)]/30 rounded-full">
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-[var(--navy)] rounded-full"
          style={{
            animation: isVisible ? 'scrollBounce 1.5s ease-in-out infinite' : 'none',
          }}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const [loadStage, setLoadStage] = useState(0);

  const scrambledSubtitle = useTextScramble('UMNAGUMO PLASTIC SURGERY', loadStage >= 1, 200);

  // 단계별 로딩 애니메이션
  useEffect(() => {
    const timers = [
      setTimeout(() => setLoadStage(1), 100),
      setTimeout(() => setLoadStage(2), 600),
      setTimeout(() => setLoadStage(3), 1200),
      setTimeout(() => setLoadStage(4), 1800),
      setTimeout(() => setLoadStage(5), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const title1 = '가슴성형의 클래식,';
  const title2 = '현대적 혁신을 더하다.';

  return (
    <section
      className="relative pt-[70px] bg-[var(--paper)]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 pb-10">
        {/* Sway 스타일: 라운드 메인 비주얼 컨테이너 */}
        <div
          className="relative mt-6 md:mt-8 rounded-[28px] md:rounded-[50px] overflow-hidden border border-line bg-[var(--paper)]"
          style={{
            height: 'calc(100vh - 120px)',
            minHeight: 560,
            maxHeight: 900,
          }}
        >
          {/* Background */}
          <div className="absolute inset-0">
            <LiquidRevealCanvas
              className="absolute inset-0 w-full h-full pointer-events-none"
              imageSrc="/메인페이지 사진/1(메인).jpg"
              introHoldMs={700}
              introFadeMs={1400}
              opacity={loadStage >= 1 ? 1 : 0}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(248,246,243,0.88) 0%, rgba(248,246,243,0.70) 46%, rgba(248,246,243,0.40) 72%, rgba(29,35,86,0.08) 100%)',
                opacity: loadStage >= 1 ? 1 : 0,
                transition: 'opacity 1.8s ease',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="pt-10 md:pt-14 px-7 md:px-14">
              {/* Subtitle */}
              <div className="overflow-hidden h-6 mb-7">
                <span
                  className="inline-block font-display text-[11px] md:text-[13px] tracking-[0.32em] uppercase font-medium"
                  style={{
                    color: 'var(--navy)',
                    opacity: loadStage >= 2 ? 1 : 0,
                    transform: loadStage >= 2 ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {scrambledSubtitle}
                </span>
              </div>

              {/* Title */}
              <div className="mb-8">
                <div
                  className="w-7 h-[1px] bg-[var(--ink)]/40 mb-4"
                  style={{
                    opacity: loadStage >= 2 ? 1 : 0,
                    transform: loadStage >= 2 ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                  }}
                />
                <h1 className="text-[34px] md:text-[52px] lg:text-[58px] font-semibold text-[var(--ink)] leading-[1.15] tracking-[-0.03em]">
                  <span className="block mb-2" style={{ perspective: '1000px' }}>
                    <ClipReveal isVisible={loadStage >= 2} delay={0.05} direction="left">
                      <MagneticText>{title1}</MagneticText>
                    </ClipReveal>
                  </span>
                  <span className="block" style={{ perspective: '1000px' }}>
                    <WaveText isVisible={loadStage >= 2} delay={0.2} className="text-[var(--navy)]">
                      {title2}
                    </WaveText>
                  </span>
                </h1>
              </div>

              {/* Description */}
              <div className="max-w-[520px] mb-10">
                <GlitchText
                  isVisible={loadStage >= 3}
                  delay={0.35}
                  className="text-[15px] md:text-[17px] text-[var(--ink-muted)] leading-relaxed"
                >
                  20년 노하우의 정교한 기술력으로
                </GlitchText>
                <br />
                <GlitchText
                  isVisible={loadStage >= 3}
                  delay={0.5}
                  className="text-[15px] md:text-[17px] text-[var(--ink-muted)] leading-relaxed"
                >
                  당신만의 아름다움을 완성합니다.
                </GlitchText>
              </div>

              {/* CTA */}
              <div
                className="flex flex-col sm:flex-row gap-3"
                style={{
                  opacity: loadStage >= 4 ? 1 : 0,
                  transform: loadStage >= 4 ? 'translateY(0)' : 'translateY(18px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <Link
                  href="http://pf.kakao.com/_QRNzxj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 bg-[var(--navy)] text-white px-8 py-4
                    overflow-hidden text-[14px] font-semibold tracking-wide rounded-full
                    hover:shadow-[0_18px_45px_rgba(29,35,86,0.35)] transition-all duration-500"
                >
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    style={{
                      transform: 'translateX(-100%) skewX(-15deg)',
                      animation: 'shimmer 3.2s ease-in-out infinite',
                    }}
                  />
                  <span className="relative z-10">상담 예약 바로 가기</span>
                  <svg
                    className="relative z-10 w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/before-after"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-[14px] font-semibold tracking-wide
                    border border-line bg-white/70 backdrop-blur-sm text-[var(--ink)]
                    hover:bg-white transition-colors"
                >
                  전후사진 보기
                </Link>
              </div>
            </div>

            {/* Bottom bar: scroll + pagination */}
            <div className="flex items-end justify-between px-7 md:px-14 pb-7 md:pb-10">
              <div className="hidden md:block">
                <ScrollIndicator isVisible={loadStage >= 5} />
              </div>
              <div
                className="ml-auto flex items-end gap-3 text-[var(--ink)] font-display"
                style={{
                  opacity: loadStage >= 5 ? 1 : 0,
                  transform: loadStage >= 5 ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <span className="text-[56px] md:text-[72px] leading-[0.85] font-bold">01</span>
                <span className="pb-2 text-[14px] md:text-[15px] text-[var(--ink-muted)]">/ 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
