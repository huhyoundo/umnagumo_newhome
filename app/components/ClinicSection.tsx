'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const clinicItems = [
  {
    title: '가슴재수술',
    image: '/메인페이지 사진/2(가슴재수술).png',
    href: '/breast-revision',
  },
  {
    title: '유륜거상술',
    image: '/메인페이지 사진/3(유륜거상술).png',
    href: '/areola-lift',
  },
  {
    title: '안전케어',
    image: '/메인페이지 사진/4(안전케어).jpg',
    href: '/safety-care',
  },
  {
    title: '보형물가이드',
    image: '/메인페이지 사진/5(보형물가이드).jpg',
    href: '/implant-guide',
  },
];

export default function ClinicSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Section Header with fade animation */}
        <div
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${
            headerVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-[24px] md:text-[32px] font-semibold text-[#2a2a2a] mb-3 tracking-[-0.02em]">
            엄나구모 가슴클리닉
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-500">
            가슴성형의 명가, 10년을 향한 믿음의 여정
          </p>
        </div>

        {/* Clinic Grid - 4 columns with staggered animation */}
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {clinicItems.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group relative aspect-[3/4] overflow-hidden bg-[#f8f6f3] hover-lift
                transition-all duration-700 ease-out ${
                  gridVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: gridVisible ? `${index * 100}ms` : '0ms' }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                transition-opacity duration-300 group-hover:from-black/80" />

              {/* Title at bottom left with slide-up effect */}
              <div className="absolute bottom-5 left-5 overflow-hidden">
                <h3 className="text-white font-medium text-[15px] md:text-[17px]
                  transition-transform duration-300 group-hover:translate-y-[-2px]">
                  {item.title}
                </h3>
              </div>

              {/* Hover arrow indicator */}
              <div className="absolute bottom-5 right-5 opacity-0 translate-x-2
                transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
