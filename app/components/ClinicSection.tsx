'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

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

export default function ClinicSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-[#f8f6f3]">
      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 md:mb-20 transition-all duration-700 ease-out ${
            headerVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display text-[11px] md:text-[12px] tracking-[0.2em] text-[#8B7355] mb-4 uppercase">
            UMNAGUMO CLINIC
          </p>
          <h2 className="text-[26px] md:text-[34px] font-semibold text-[#2a2a2a] mb-4 tracking-[-0.02em]">
            엄나구모 가슴클리닉
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed">
            20년 이상의 경험과 노하우로 완성하는<br className="md:hidden" />
            자연스러운 아름다움
          </p>
        </div>

        {/* Clinic Grid - 2x2 on large screens */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {clinicItems.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group bg-white overflow-hidden transition-all duration-700 ease-out
                hover:shadow-xl ${
                  gridVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: gridVisible ? `${index * 100}ms` : '0ms' }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative w-full md:w-[45%] aspect-[4/3] md:aspect-auto md:min-h-[240px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  {/* Number badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-[#8B7355] flex items-center justify-center">
                    <span className="font-display text-[13px] text-white font-light">{item.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <p className="font-display text-[10px] tracking-[0.15em] text-[#8B7355] mb-2 uppercase">
                    {item.subtitle}
                  </p>
                  <h3 className="text-[20px] md:text-[22px] font-semibold text-[#2a2a2a] mb-3
                    group-hover:text-[#8B7355] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-[1.8] mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-[12px] font-medium text-[#8B7355]
                    group-hover:gap-3 transition-all duration-300">
                    <span>자세히 보기</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
