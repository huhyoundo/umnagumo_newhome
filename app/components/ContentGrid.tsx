'use client';

import Image from './SafeImage';
import Link from 'next/link';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function ContentGrid() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  // Animation delays for masonry effect (different delays for different grid positions)
  const gridItemDelays = [0, 150, 100, 200, 250, 300, 350];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Vertical Divider with grow animation */}
        <div
          ref={headerRef}
          className={`flex items-center justify-center mb-12 transition-all duration-1000 ease-out ${
            headerVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`w-px h-16 bg-gray-300 transition-transform duration-1000 ease-out origin-top ${
              headerVisible ? 'scale-y-100' : 'scale-y-0'
            }`}
          />
        </div>

        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            headerVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <h2 className="font-display text-[14px] md:text-[16px] font-semibold text-[#2a2a2a] tracking-[0.1em] mb-3 uppercase">
            UMNAGUMO PLASTIC SURGERY
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-500">
            가슴성형의 클래식, 현대적 혁신을 더하다.
          </p>
        </div>

        {/* Content Grid with masonry animation */}
        <div
          ref={gridRef}
          className="grid gap-2 md:gap-3 max-w-[900px] mx-auto"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            aspectRatio: '1/1',
          }}
        >
          {/* 이미지1 - col1, row1-2 (세로 2행) */}
          <div
            className={`relative overflow-hidden bg-gray-100 group transition-all duration-700 ease-out ${
              gridVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              gridColumn: '1',
              gridRow: '1 / 3',
              transitionDelay: `${gridItemDelays[0]}ms`,
            }}
          >
            <Image
              src="/메인페이지 사진/12(콘텐츠-이미지1).jpg"
              alt="엄나구모 위치"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              quality={100}
              sizes="(max-width: 768px) 33vw, 350px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* 이미지2 - col2, row1 */}
          <div
            className={`relative overflow-hidden bg-gray-100 group transition-all duration-700 ease-out ${
              gridVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              gridColumn: '2',
              gridRow: '1',
              transitionDelay: `${gridItemDelays[1]}ms`,
            }}
          >
            <Image
              src="/메인페이지 사진/12(콘텐츠-이미지2).jpg"
              alt="엄나구모 브랜딩"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              quality={100}
              sizes="(max-width: 768px) 33vw, 350px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* 이미지3 - 인스타그램 col3, row1 */}
          <Link
            href="https://instagram.com/umnagumo"
            target="_blank"
            rel="noopener noreferrer"
            className={`relative overflow-hidden bg-gray-100 group transition-all duration-700 ease-out ${
              gridVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              gridColumn: '3',
              gridRow: '1',
              transitionDelay: `${gridItemDelays[2]}ms`,
            }}
          >
            <Image
              src="/메인페이지 사진/12(콘텐츠-이미지3).jpg"
              alt="엄나구모 인스타그램"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              quality={100}
              sizes="(max-width: 768px) 33vw, 350px"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 px-3 py-2 flex items-center gap-1.5 shadow-sm
                transition-transform duration-300 group-hover:scale-105">
                <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-[10px] md:text-[11px] font-medium text-gray-700">@umnagumo</span>
              </div>
            </div>
          </Link>

          {/* 이미지4 - col2, row2 */}
          <div
            className={`relative overflow-hidden bg-gray-100 group transition-all duration-700 ease-out ${
              gridVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              gridColumn: '2',
              gridRow: '2',
              transitionDelay: `${gridItemDelays[3]}ms`,
            }}
          >
            <Image
              src="/메인페이지 사진/12(콘텐츠-이미지4).jpg"
              alt="엄나구모 조각상"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              quality={100}
              sizes="(max-width: 768px) 33vw, 350px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* 이미지7 - col3, row2-3 (세로 2행) */}
          <div
            className={`relative overflow-hidden bg-gray-100 group transition-all duration-700 ease-out ${
              gridVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              gridColumn: '3',
              gridRow: '2 / 4',
              transitionDelay: `${gridItemDelays[4]}ms`,
            }}
          >
            <Image
              src="/메인페이지 사진/12(콘텐츠-이미지7).jpg"
              alt="엄나구모 브랜드"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              quality={100}
              sizes="(max-width: 768px) 33vw, 350px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* 이미지5 - col1, row3 */}
          <div
            className={`relative overflow-hidden bg-gray-100 group transition-all duration-700 ease-out ${
              gridVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              gridColumn: '1',
              gridRow: '3',
              transitionDelay: `${gridItemDelays[5]}ms`,
            }}
          >
            <Image
              src="/메인페이지 사진/12(콘텐츠-이미지5).jpg"
              alt="수술 장비"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              quality={100}
              sizes="(max-width: 768px) 33vw, 350px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* 이미지6 - col2, row3 */}
          <div
            className={`relative overflow-hidden bg-gray-100 group transition-all duration-700 ease-out ${
              gridVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              gridColumn: '2',
              gridRow: '3',
              transitionDelay: `${gridItemDelays[6]}ms`,
            }}
          >
            <Image
              src="/메인페이지 사진/12(콘텐츠-이미지6).jpg"
              alt="엄나구모"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              quality={100}
              sizes="(max-width: 768px) 33vw, 350px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
