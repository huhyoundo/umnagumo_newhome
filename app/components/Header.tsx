'use client';

import Link from 'next/link';
import Image from './SafeImage';
import { useState, useEffect } from 'react';

const surgeryItems = [
  { name: '가슴 첫수술', href: '/breast-augmentation' },
  { name: '가슴 재수술', href: '/breast-revision' },
  { name: '가슴 축소/거상술', href: '/reduction-lift' },
  { name: '가슴 재건술', href: '/breast-reconstruction' },
];

const aboutItems = [
  { name: '의료진 소개', href: '/doctors' },
  { name: '보형물 가이드', href: '/implant-guide' },
  { name: '안전케어', href: '/safety-care' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const desktopNavColumnClass = 'w-[220px] px-8';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed md:sticky top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${isScrolled
          ? 'bg-[rgba(248,246,243,0.92)] backdrop-blur-md shadow-[0_1px_18px_rgba(0,0,0,0.06)] border-b border-line'
          : 'bg-[rgba(248,246,243,0.82)] backdrop-blur-md border-b border-line'
        }`}
    >
      {/* Main Header */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-center h-[70px]">
          {/* Logo - Left */}
          <Link href="/" className="absolute left-6 lg:left-10 flex items-center">
            <Image
              src="/logo.png"
              alt="엄나구모 성형외과"
              width={160}
              height={45}
              className="h-[36px] md:h-[42px] w-auto"
              priority
              quality={100}
            />
            <span className="ml-3 text-[14px] md:text-[15px] font-semibold tracking-[-0.01em] text-[var(--ink)]">
              엄나구모 성형외과
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div
            className="hidden lg:block relative"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            {/* Main Menu Items */}
            <nav className="flex items-center justify-center">
              <Link
                href="#"
                className={`${desktopNavColumnClass} py-6 text-[17px] text-[var(--ink)] hover:text-[var(--navy)] transition-colors tracking-[-0.01em] font-medium text-center`}
                onClick={(e) => e.preventDefault()}
              >
                병원 소개
              </Link>
              <Link
                href="#"
                className={`${desktopNavColumnClass} py-6 text-[17px] text-[var(--ink)] hover:text-[var(--navy)] transition-colors tracking-[-0.01em] font-medium text-center`}
                onClick={(e) => e.preventDefault()}
              >
                가슴성형
              </Link>
              <Link
                href="/before-after"
                className={`${desktopNavColumnClass} py-6 text-[17px] text-[var(--ink)] hover:text-[var(--navy)] transition-colors tracking-[-0.01em] font-medium text-center`}
              >
                전후사진
              </Link>
              <Link
                href="https://blog.naver.com/umnagumo/223849151079"
                target="_blank"
                rel="noopener noreferrer"
                className={`${desktopNavColumnClass} py-6 text-[17px] text-[var(--ink)] hover:text-[var(--navy)] transition-colors tracking-[-0.01em] font-medium text-center`}
              >
                체크 리스트
              </Link>
            </nav>

            {/* Unified Mega Menu Panel - Full Width */}
            <div
              className={`fixed top-[70px] inset-x-0 transition-all duration-300 ${showMegaMenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
            >
              <div className="bg-[rgba(248,246,243,0.92)] backdrop-blur-md shadow-[0_8px_28px_rgba(0,0,0,0.06)] border-t border-line">
                {/* Align columns with nav items above */}
                <div className="flex justify-center py-5">
                  <div className="flex">
                    {/* Column 1: 병원 소개 - matches nav item width */}
                    <div className={`${desktopNavColumnClass} text-center`}>
                      <div className="space-y-1">
                        {aboutItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block py-1 text-[15px] text-[var(--ink-muted)] hover:text-[var(--navy)] transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: 가슴성형 */}
                    <div className={`${desktopNavColumnClass} text-center`}>
                      <div className="space-y-1">
                        {surgeryItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block py-1 text-[15px] text-[var(--ink-muted)] hover:text-[var(--navy)] transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: 전후사진 */}
                    <div className={`${desktopNavColumnClass} text-center`}>
                      <div className="space-y-1">
                        <Link
                          href="/before-after"
                          className="block py-1 text-[15px] text-[var(--ink-muted)] hover:text-[var(--navy)] transition-colors"
                        >
                          전후사진
                        </Link>
                      </div>
                    </div>

                    {/* Column 4: 체크 리스트 */}
                    <div className={`${desktopNavColumnClass} text-center`}>
                      <div className="space-y-1">
                        <Link
                          href="https://blog.naver.com/umnagumo/223849151079"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-1 text-[15px] text-[var(--ink-muted)] hover:text-[var(--navy)] transition-colors"
                        >
                          체크 리스트
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button - Right */}
          <Link
            href="http://pf.kakao.com/_QRNzxj"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block absolute right-6 lg:right-10 px-6 py-2.5 rounded-full text-[14px] font-semibold tracking-[-0.01em]
              bg-[var(--navy)] text-white hover:shadow-[0_18px_45px_rgba(29,35,86,0.30)] transition-shadow"
          >
            상담예약
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden absolute right-6 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴"
          >
            <svg className="w-6 h-6 text-[var(--ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden bg-[var(--paper)] overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[600px]' : 'max-h-0'}`}>
        <nav className="px-6 py-6 border-t border-line">
          {/* 병원 소개 */}
          <div className="mb-6">
            <p className="text-[12px] text-[var(--navy)] mb-3 tracking-[0.1em]">ABOUT</p>
            <div className="space-y-1">
              {aboutItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-[15px] text-[var(--ink)] hover:text-[var(--navy)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 가슴성형 */}
          <div className="mb-6">
            <p className="text-[12px] text-[var(--navy)] mb-3 tracking-[0.1em]">SURGERY</p>
            <div className="space-y-1">
              {surgeryItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-[15px] text-[var(--ink)] hover:text-[var(--navy)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 전후사진 */}
          <div className="mb-6 pt-4 border-t border-line">
            <Link
              href="/before-after"
              className="block py-2 text-[15px] text-[var(--ink)] hover:text-[var(--navy)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              전후사진
            </Link>
          </div>

          {/* 체크 리스트 */}
          <div className="mb-6 pt-4 border-t border-line">
            <Link
              href="https://blog.naver.com/umnagumo/223849151079"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-[15px] text-[var(--ink)] hover:text-[var(--navy)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              체크 리스트
            </Link>
          </div>

          {/* Contact */}
          <div className="pt-4 border-t border-line">
            <Link
              href="tel:025126838"
              className="flex items-center gap-3 py-3"
            >
              <span className="text-[18px] font-light text-[var(--ink)] tracking-wide">02-512-6838</span>
            </Link>
            <p className="text-[12px] text-[var(--ink-muted)] mb-4">평일 10:00-18:30 · 토 10:00-16:00</p>
            <Link
              href="http://pf.kakao.com/_QRNzxj"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 rounded-full bg-[var(--navy)] text-white text-center text-[14px] font-semibold tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              카카오톡 상담예약
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
