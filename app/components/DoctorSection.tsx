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

// 마그네틱 버튼 컴포넌트
function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.2;
    const y = (e.clientY - centerY) * 0.2;
    setPosition({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <Link
      ref={buttonRef}
      href={href}
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </Link>
  );
}

// 애니메이션 텍스트 컴포넌트
function AnimatedText({ children, isVisible, delay = 0 }: { children: string; isVisible: boolean; delay?: number }) {
  const words = children.split(' ');
  return (
    <span>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block will-change-transform"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(30px) rotateX(-15deg)',
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

export default function DoctorSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.2);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  // 이미지 패럴랙스
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    const element = imageRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:py-8">
            {/* Subtitle */}
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
                MEDICAL TEAM
              </p>
            </div>

            {/* Title */}
            <h2 className="text-[24px] md:text-[32px] font-semibold text-[#2a2a2a] mb-6 tracking-[-0.02em]">
              <AnimatedText isVisible={isVisible} delay={0.1}>
                엄나구모 의료진 소개
              </AnimatedText>
            </h2>

            {/* Description with staggered lines */}
            <div className="space-y-1 mb-8">
              {[
                '축적된 경험과 전문적 기술로 가장 자연스러운',
                '아름다움을 실현하며, 체형과 균형을 기반으로 한',
                '정교한 디자인과 세심한 시술 과정 속에서 단 한 건',
                '한 건 최선의 결과를 돌봅니다.',
              ].map((line, index) => (
                <p
                  key={index}
                  className="text-[14px] md:text-[15px] text-gray-600 leading-[1.9]"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: `${0.3 + index * 0.1}s`,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* CTA Button */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.7s',
              }}
            >
              <MagneticButton
                href="/doctors"
                className="inline-flex items-center gap-2 text-[13px] text-[var(--ink)] border-b border-[var(--ink)] pb-1
                  hover:text-[var(--navy)] hover:border-[var(--navy)] transition-colors duration-300 font-medium group"
              >
                의료진 소개 자세히 보기
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </MagneticButton>
            </div>
          </div>

          {/* Right Image */}
          <div
            ref={imageRef}
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0) rotate(0)' : 'translateX(60px) rotate(2deg)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            {/* Decorative frame */}
            <div
              className="absolute -top-4 -right-4 w-full h-full border-2 border-[var(--navy)]/20"
              style={{
                transform: isVisible ? 'translate(16px, 16px)' : 'translate(0, 0)',
                transition: 'transform 1s ease 0.4s',
              }}
            />

            {/* Image container with parallax */}
            <div
              className="relative w-full aspect-[16/11] overflow-hidden group"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * -3}deg)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <Image
                src="/메인페이지 사진/6(원장님).jpg"
                alt="엄나구모 의료진"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                quality={100}
                sizes="(max-width: 1200px) 100vw, 800px"
              />

              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating badge */}
              <div
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-3 shadow-lg"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.6s ease 0.8s',
                }}
              >
                <p className="text-[11px] text-[var(--navy)] tracking-[0.15em] uppercase mb-1">Experience</p>
                <p className="text-[18px] font-semibold text-[var(--ink)]">20년+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
