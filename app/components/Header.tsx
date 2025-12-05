'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const surgeryItems = [
  { name: '가슴재수술', href: '/breast-revision' },
  { name: '보형물제거', href: '/implant-removal' },
  { name: '유두축소', href: '/nipple-reduction' },
  { name: '유륜거상술', href: '/areola-lift' },
  { name: '축소거상', href: '/reduction-lift' },
];

const aboutItems = [
  { name: '의료진 소개', href: '/doctors' },
  { name: '보형물 가이드', href: '/implant-guide' },
  { name: '안전케어', href: '/safety-care' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-white'
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="엄나구모 성형외과"
              width={140}
              height={40}
              className="h-[32px] md:h-[36px] w-auto transition-transform group-hover:scale-105"
              priority
            />
            <span className="text-[15px] md:text-[17px] font-semibold text-[#2a2a2a] tracking-[-0.02em]">
              엄나구모 성형외과
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" ref={dropdownRef}>
            {/* 병원 소개 */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="relative text-[14px] text-gray-600 hover:text-[#8B7355] transition-colors font-medium tracking-[-0.01em] py-6 group flex items-center gap-1">
                병원 소개
                <svg className={`w-3 h-3 transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-100 py-2 min-w-[160px]">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2.5 text-[13px] text-gray-600 hover:text-[#8B7355] hover:bg-gray-50 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 가슴성형 */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('surgery')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="relative text-[14px] text-gray-600 hover:text-[#8B7355] transition-colors font-medium tracking-[-0.01em] py-6 group flex items-center gap-1">
                가슴성형
                <svg className={`w-3 h-3 transition-transform ${activeDropdown === 'surgery' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'surgery' && (
                <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-100 py-2 min-w-[160px]">
                  {surgeryItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2.5 text-[13px] text-gray-600 hover:text-[#8B7355] hover:bg-gray-50 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 수술 후기 */}
            <Link
              href="/before-after"
              className="relative text-[14px] text-gray-600 hover:text-[#8B7355] transition-colors font-medium tracking-[-0.01em] py-6"
            >
              수술 후기
            </Link>

            {/* 커뮤니티 */}
            <Link
              href="/community"
              className="relative text-[14px] text-[#8B7355] font-medium tracking-[-0.01em] py-6"
            >
              커뮤니티
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[500px] pb-4' : 'max-h-0'}`}>
          <nav className="flex flex-col border-t border-gray-100 pt-4">
            {/* 병원 소개 */}
            <div className="py-2">
              <p className="text-[13px] font-semibold text-gray-800 mb-2">병원 소개</p>
              <div className="pl-3 space-y-1">
                {aboutItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-[14px] text-gray-600 hover:text-[#8B7355] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* 가슴성형 */}
            <div className="py-2">
              <p className="text-[13px] font-semibold text-gray-800 mb-2">가슴성형</p>
              <div className="pl-3 space-y-1">
                {surgeryItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-[14px] text-gray-600 hover:text-[#8B7355] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/before-after"
              className="py-3 text-[14px] text-gray-600 hover:text-[#8B7355] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              수술 후기
            </Link>
            <Link
              href="/community"
              className="py-3 text-[14px] text-[#8B7355] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              커뮤니티
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
