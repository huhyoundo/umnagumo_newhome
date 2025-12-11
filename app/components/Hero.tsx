'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef, useCallback } from 'react';

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

    const charElements = containerRef.current.querySelectorAll('.magnetic-char');
    const newPositions = Array.from(charElements).map((el) => {
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
            color: Math.abs(charPositions[index]?.y || 0) > 3 ? '#C4A574' : undefined,
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
            className="absolute top-0 left-0 w-full h-full text-[#C4A574] opacity-80"
            style={{
              animation: 'glitchText1 2.5s infinite',
              clipPath: 'inset(40% 0 40% 0)',
            }}
          >
            {children}
          </span>
          <span
            className="absolute top-0 left-0 w-full h-full text-[#8B7355] opacity-80"
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
          className="absolute rounded-full bg-[#C4A574]"
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
      <div className="relative w-6 h-10 border-2 border-[#8B7355]/30 rounded-full">
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#8B7355] rounded-full"
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

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

  const title1 = '가슴성형의 클래식,';
  const title2 = '현대적 혁신을 더하다.';

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-[70px] md:pt-0 overflow-hidden bg-[#fafafa]"
    >
      {/* 배경 이미지 + 패럴랙스 */}
      <div className="absolute inset-0 pt-[70px] md:pt-0">
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${loadStage >= 1 ? 1 : 1.15}) translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
            transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Image
            src="/메인페이지 사진/1(메인).jpg"
            alt="엄나구모 성형외과"
            fill
            className="object-cover object-center"
            style={{
              filter: loadStage >= 1 ? 'none' : 'blur(10px)',
              transition: 'filter 1.5s ease',
            }}
            priority
            quality={100}
            sizes="100vw"
          />
        </div>

        {/* 오버레이 그라데이션 */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg,
              rgba(255,255,255,${loadStage >= 2 ? 0.1 : 0}) 0%,
              transparent 40%,
              rgba(139,115,85,${loadStage >= 2 ? 0.08 : 0}) 100%)`,
            transition: 'all 1.5s ease',
          }}
        />

        {/* 비네팅 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.15) 100%)',
            opacity: loadStage >= 1 ? 1 : 0,
            transition: 'opacity 2s ease',
          }}
        />
      </div>

      {/* 파티클 효과 */}
      <ParticleBackground isVisible={loadStage >= 3} />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 h-full">
        <div className="flex flex-col justify-center min-h-[calc(100vh-70px)] py-16 lg:py-0">
          <div className="max-w-[650px]">

            {/* 서브타이틀 - 스크램블 효과 */}
            <div className="mb-8 overflow-hidden h-6">
              <span
                className="inline-block font-display text-[11px] md:text-[13px] tracking-[0.3em] uppercase font-medium"
                style={{
                  background: 'linear-gradient(90deg, #8B7355 0%, #C4A574 50%, #8B7355 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: loadStage >= 2 ? 'gradientShift 3s ease infinite' : 'none',
                }}
              >
                {scrambledSubtitle}
              </span>
            </div>

            {/* 메인 타이틀 - 멀티 애니메이션 */}
            <h1 className="text-[32px] md:text-[44px] lg:text-[56px] font-bold text-[#1a1a1a] leading-[1.2] tracking-[-0.03em] mb-4">
              {/* 첫 번째 줄 - 마그네틱 + 클립 리빌 */}
              <span className="block mb-2" style={{ perspective: '1000px' }}>
                <ClipReveal isVisible={loadStage >= 2} delay={0} direction="center">
                  <MagneticText>{title1}</MagneticText>
                </ClipReveal>
              </span>

              {/* 두 번째 줄 - 웨이브 텍스트 */}
              <span className="block" style={{ perspective: '1000px' }}>
                <WaveText isVisible={loadStage >= 2} delay={0.3} className="text-[#2a2a2a]">
                  {title2}
                </WaveText>
              </span>
            </h1>

            {/* 액센트 라인 - 양방향 확장 */}
            <div className="relative h-[4px] w-32 mt-8 mb-10 overflow-hidden">
              <div
                className="absolute left-1/2 top-0 h-full bg-gradient-to-r from-[#C4A574] via-[#8B7355] to-[#C4A574]"
                style={{
                  width: loadStage >= 3 ? '100%' : '0%',
                  transform: 'translateX(-50%)',
                  transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: loadStage >= 3 ? '0 0 20px rgba(196,165,116,0.5)' : 'none',
                }}
              />
            </div>

            {/* 설명 텍스트 - 글리치 효과 */}
            <div className="mb-10">
              <GlitchText
                isVisible={loadStage >= 3}
                delay={0.5}
                className="text-[15px] md:text-[17px] text-[#444] leading-relaxed"
              >
                20년 노하우의 정교한 기술력으로
              </GlitchText>
              <br />
              <GlitchText
                isVisible={loadStage >= 3}
                delay={0.7}
                className="text-[15px] md:text-[17px] text-[#444] leading-relaxed"
              >
                당신만의 아름다움을 완성합니다.
              </GlitchText>
            </div>

            {/* CTA 버튼 - 3D 호버 */}
            <div
              style={{
                opacity: loadStage >= 4 ? 1 : 0,
                transform: loadStage >= 4
                  ? 'translateY(0) rotateX(0deg)'
                  : 'translateY(40px) rotateX(-15deg)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                perspective: '1000px',
              }}
            >
              <Link
                href="http://pf.kakao.com/_QRNzxj"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 bg-[#8B7355] text-white px-10 py-5
                  overflow-hidden text-[15px] font-semibold tracking-wide rounded-sm
                  hover:shadow-[0_20px_50px_rgba(139,115,85,0.4)] transition-all duration-500
                  transform hover:scale-105 hover:-translate-y-1"
              >
                {/* 쉬머 효과 */}
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    transform: 'translateX(-100%) skewX(-15deg)',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                />

                <span className="relative z-10">상담 예약 바로 가기</span>
                <svg
                  className="relative z-10 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 플로팅 장식 요소들 */}
      <div
        className="absolute top-1/4 right-[8%] w-40 h-40 rounded-full opacity-30 pointer-events-none hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(196,165,116,0.4) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px) scale(${loadStage >= 3 ? 1 : 0})`,
          transition: 'transform 0.5s ease-out',
        }}
      />

      <div
        className="absolute bottom-1/4 right-[15%] w-24 h-24 rounded-full opacity-20 pointer-events-none hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(139,115,85,0.5) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px) scale(${loadStage >= 4 ? 1 : 0})`,
          transition: 'transform 0.5s ease-out',
        }}
      />

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator isVisible={loadStage >= 5} />
      </div>

      {/* 사이드 데코레이션 */}
      <div
        className="absolute bottom-20 left-6 lg:left-16 hidden md:block"
        style={{
          opacity: loadStage >= 5 ? 0.4 : 0,
          transform: loadStage >= 5 ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'bottom',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '0.3s',
        }}
      >
        <div className="w-[2px] h-24 bg-gradient-to-t from-[#8B7355] to-transparent" />
      </div>

      <div
        className="absolute top-1/3 right-6 lg:right-16 hidden md:block font-display"
        style={{
          opacity: loadStage >= 5 ? 0.25 : 0,
          transform: loadStage >= 5
            ? 'translateX(0) rotate(90deg)'
            : 'translateX(20px) rotate(90deg)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '0.5s',
          transformOrigin: 'center center',
        }}
      >
        <span className="text-[11px] tracking-[0.3em] text-[#8B7355] font-medium">SINCE 2004</span>
      </div>

      {/* 진행 바 (로딩 인디케이터) */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gray-200/30 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#8B7355] to-[#C4A574]"
          style={{
            width: `${loadStage * 20}%`,
            transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    </section>
  );
}
