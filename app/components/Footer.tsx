'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    naver: any;
  }
}

// 스크롤 애니메이션 훅
function useScrollAnimation(threshold = 0.2) {
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

const quickLinks = [
  { label: '가슴재수술', href: '/breast-revision' },
  { label: '유륜거상술', href: '/areola-lift' },
  { label: '안전케어', href: '/safety-care' },
  { label: '보형물가이드', href: '/implant-guide' },
  { label: '의료진소개', href: '/doctors' },
  { label: '전후사진', href: '/before-after' },
];

// 마그네틱 소셜 링크 컴포넌트
function SocialLink({
  href,
  label,
  children,
  hoverColor,
  index,
  isVisible,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  hoverColor: string;
  index: number;
  isVisible: boolean;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.25;
    const y = (e.clientY - centerY) * 0.25;
    setPosition({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const link = linkRef.current;
    if (link) {
      link.addEventListener('mousemove', handleMouseMove);
      link.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        link.removeEventListener('mousemove', handleMouseMove);
        link.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <Link
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden group"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.1 : 1})`,
        backgroundColor: isHovered ? hoverColor : '#374151',
        opacity: isVisible ? 1 : 0,
        transition: `transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, opacity 0.5s ease ${0.8 + index * 0.1}s`,
      }}
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: isHovered ? `0 0 20px ${hoverColor}60` : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

// 애니메이션 링크 컴포넌트
function AnimatedLink({
  href,
  children,
  delay,
  isVisible,
}: {
  href: string;
  children: React.ReactNode;
  delay: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="text-[12px] text-gray-400 hover:text-white transition-colors relative inline-block"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-15px)',
        transition: `all 0.5s ease ${delay}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative">
        {children}
        <span
          className="absolute bottom-0 left-0 h-[1px] bg-[var(--gold)]"
          style={{
            width: isHovered ? '100%' : '0%',
            transition: 'width 0.3s ease',
          }}
        />
      </span>
    </Link>
  );
}

// 연락처 링크 컴포넌트
function ContactLink({
  href,
  children,
  delay,
  isVisible,
}: {
  href: string;
  children: React.ReactNode;
  delay: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-[14px] text-gray-300 hover:text-[var(--gold)] transition-colors group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `all 0.5s ease ${delay}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-8 h-8 bg-[var(--navy)]/20 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: isHovered
            ? 'color-mix(in oklab, var(--navy) 30%, transparent)'
            : 'color-mix(in oklab, var(--navy) 20%, transparent)',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <svg className="w-4 h-4 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      {children}
    </Link>
  );
}

// 영업시간 행 컴포넌트
function HoursRow({
  label,
  hours,
  delay,
  isVisible,
}: {
  label: string;
  hours: string;
  delay: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="flex justify-between max-w-[200px]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: `all 0.5s ease ${delay}s`,
      }}
    >
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{hours}</span>
    </div>
  );
}

export default function Footer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);
  const { ref: footerRef, isVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.naver || !window.naver.maps || mapInitialized.current) return;

      mapInitialized.current = true;
      const location = new window.naver.maps.LatLng(37.5219756, 127.0363404);

      const map = new window.naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });

      new window.naver.maps.Marker({
        position: location,
        map: map,
      });
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const checkNaver = setInterval(() => {
        if (window.naver && window.naver.maps) {
          clearInterval(checkNaver);
          initMap();
        }
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(checkNaver);
      }, 10000);

      return () => {
        clearInterval(checkNaver);
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <footer ref={footerRef} className="bg-[var(--ink)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--navy)]/5"
        style={{
          transform: isVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
          transition: 'transform 1.5s ease 0.3s',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[var(--gold)]/5"
        style={{
          transform: isVisible ? 'translate(30%, 30%) scale(1)' : 'translate(30%, 30%) scale(0)',
          transition: 'transform 1.5s ease 0.5s',
        }}
      />

      {/* Map + Info Section */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Naver Map - Left Side */}
          <div className="lg:col-span-5">
            <h3
              className="font-display text-[11px] tracking-[0.2em] mb-4 uppercase"
              style={{
                background: 'linear-gradient(90deg, var(--navy) 0%, var(--gold) 50%, var(--navy) 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: isVisible ? 'gradientShift 4s ease infinite' : 'none',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            >
              LOCATION
            </h3>
            <div
              ref={mapRef}
              className="w-full h-[280px] lg:h-[300px] rounded-lg overflow-hidden bg-gray-700 relative"
              id="footer-map"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.2s',
              }}
            >
              {/* Map loading overlay */}
              <div
                className="absolute inset-0 bg-gray-700 flex items-center justify-center"
                style={{
                  opacity: mapInitialized.current ? 0 : 1,
                  pointerEvents: mapInitialized.current ? 'none' : 'auto',
                  transition: 'opacity 0.5s ease',
                }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[12px] text-gray-400">지도 로딩중...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info - Right Side */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div>
                <h3
                  className="font-display text-[11px] tracking-[0.2em] mb-4 uppercase"
                  style={{
                    background: 'linear-gradient(90deg, var(--navy) 0%, var(--gold) 50%, var(--navy) 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: isVisible ? 'gradientShift 4s ease infinite' : 'none',
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.5s ease 0.1s',
                  }}
                >
                  CONTACT
                </h3>
                <div className="space-y-4">
                  <div
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                      transition: 'all 0.5s ease 0.2s',
                    }}
                  >
                    <p className="text-white font-semibold text-[17px] md:text-[18px] mb-2">
                      엄나구모성형외과의원
                    </p>
                    <div className="space-y-1 text-[13px] text-gray-400">
                      <p>서울특별시 강남구 도산대로 318</p>
                      <p>SBI타워 6층</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <ContactLink href="tel:02-512-6838" delay={0.3} isVisible={isVisible}>
                      02-512-6838
                    </ContactLink>
                    <ContactLink href="tel:02-512-6864" delay={0.35} isVisible={isVisible}>
                      02-512-6864
                    </ContactLink>
                  </div>
                </div>
              </div>

              {/* Business Hours & Quick Links */}
              <div className="space-y-8">
                {/* Business Hours */}
                <div>
                  <h3
                    className="font-display text-[11px] tracking-[0.2em] mb-4 uppercase"
                    style={{
                      background: 'linear-gradient(90deg, var(--navy) 0%, var(--gold) 50%, var(--navy) 100%)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: isVisible ? 'gradientShift 4s ease infinite' : 'none',
                      opacity: isVisible ? 1 : 0,
                      transition: 'opacity 0.5s ease 0.15s',
                    }}
                  >
                    BUSINESS HOURS
                  </h3>
                  <div className="space-y-2 text-[13px]">
                    <HoursRow label="평일" hours="10:00 - 18:30" delay={0.4} isVisible={isVisible} />
                    <HoursRow label="토요일" hours="10:00 - 16:00" delay={0.45} isVisible={isVisible} />
                    <HoursRow label="점심시간" hours="13:00 - 14:00" delay={0.5} isVisible={isVisible} />
                    <p
                      className="text-gray-500 text-[11px] mt-2"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.5s ease 0.55s',
                      }}
                    >
                      * 일요일/공휴일 휴진
                    </p>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3
                    className="font-display text-[11px] tracking-[0.2em] mb-4 uppercase"
                    style={{
                      background: 'linear-gradient(90deg, var(--navy) 0%, var(--gold) 50%, var(--navy) 100%)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: isVisible ? 'gradientShift 4s ease infinite' : 'none',
                      opacity: isVisible ? 1 : 0,
                      transition: 'opacity 0.5s ease 0.2s',
                    }}
                  >
                    QUICK LINKS
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {quickLinks.map((link, index) => (
                      <AnimatedLink
                        key={link.href}
                        href={link.href}
                        delay={0.6 + index * 0.05}
                        isVisible={isVisible}
                      >
                        {link.label}
                      </AnimatedLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div
              className="mt-8 pt-8 border-t border-gray-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.5s ease 0.7s',
              }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="text-[11px] text-gray-500 tracking-wider"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                    transition: 'all 0.5s ease 0.75s',
                  }}
                >
                  FOLLOW US
                </span>
                <div className="flex items-center gap-3">
                  <SocialLink
                    href="https://instagram.com/umnagumo"
                    label="Instagram"
                    hoverColor="#E1306C"
                    index={0}
                    isVisible={isVisible}
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </SocialLink>
                  <SocialLink
                    href="https://blog.naver.com/umnagumo"
                    label="Naver Blog"
                    hoverColor="#03C75A"
                    index={1}
                    isVisible={isVisible}
                  >
                    <span className="text-white font-bold text-[10px]">N</span>
                  </SocialLink>
                  <SocialLink
                    href="https://youtube.com/@umnagumo"
                    label="YouTube"
                    hoverColor="#FF0000"
                    index={2}
                    isVisible={isVisible}
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </SocialLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Copyright */}
      <div className="border-t border-white/10 bg-[rgba(0,0,0,0.20)] relative">
        {/* Animated border line */}
        <div
          className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-[var(--navy)] via-[var(--gold)] to-[var(--navy)]"
          style={{
            width: isVisible ? '100%' : '0%',
            transition: 'width 1.5s ease 0.5s',
          }}
        />

        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div
              className="flex items-center gap-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.5s ease 0.9s',
              }}
            >
              <span
                className="font-display text-[14px] tracking-wide"
                style={{
                  background: 'linear-gradient(90deg, var(--navy) 0%, var(--gold) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                UMNAGUMO
              </span>
              <span className="text-gray-500 text-[11px]">
                사업자 등록번호: 211-09-47855
              </span>
            </div>
            <p
              className="text-gray-500 text-[11px]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.5s ease 0.95s',
              }}
            >
              Copyright 2024 UMNAGUMO PLASTIC SURGERY. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
