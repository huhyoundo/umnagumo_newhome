'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 카테고리 정의
const categories = [
  { id: 'all', label: '전체보기' },
  { id: 'axillary', label: '겨드랑이 절개' },
  { id: 'inframammary', label: '밑선 절개' },
  { id: 'areola', label: '유륜 절개' },
];

// 갤러리 이미지와 수술 정보
const galleryImages = [
  {
    id: 1,
    image: '/gallery/1_surgery.png',
    title: '겨드랑이 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 좌측 구축 양측 피막절제 및 밑선교정 시행',
    category: 'axillary',
  },
  {
    id: 2,
    image: '/gallery/2_surgery.png',
    title: '밑선 절개 재수술',
    description: '세빈 보형물 양측 각각 스무스타입 및 양측 피막절제 및 포켓 재조정 시행',
    category: 'inframammary',
  },
  {
    id: 3,
    image: '/gallery/3_surgery.png',
    title: '겨드랑이 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 우측 구축 양측 피막절제 및 밑선교정 시행',
    category: 'axillary',
  },
  {
    id: 4,
    image: '/gallery/4_surgery.png',
    title: '유륜 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 양측 피막절제 및 포켓 재조정 시행',
    category: 'areola',
  },
  {
    id: 5,
    image: '/gallery/5_surgery.png',
    title: '겨드랑이 절개 재수술',
    description: '세빈 보형물 양측 각각 마이크로타입 및 양측 피막절제 시행',
    category: 'axillary',
  },
  {
    id: 6,
    image: '/gallery/6_surgery.png',
    title: '밑선 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 양측 구축 피막절제 및 밑선교정 시행',
    category: 'inframammary',
  },
  {
    id: 7,
    image: '/gallery/7_surgery.png',
    title: '겨드랑이 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 좌측 구축 양측 피막절제 시행',
    category: 'axillary',
  },
  {
    id: 8,
    image: '/gallery/8_surgery.png',
    title: '유륜 절개 재수술',
    description: '세빈 보형물 양측 각각 스무스타입 및 양측 피막절제 및 포켓 재조정 시행',
    category: 'areola',
  },
  {
    id: 9,
    image: '/gallery/9_surgery.png',
    title: '겨드랑이 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 양측 피막절제 및 밑선교정 시행',
    category: 'axillary',
  },
  {
    id: 10,
    image: '/gallery/10_surgery.png',
    title: '밑선 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 우측 구축 양측 피막절제 시행',
    category: 'inframammary',
  },
  {
    id: 11,
    image: '/gallery/11_surgery.png',
    title: '겨드랑이 절개 재수술',
    description: '세빈 보형물 양측 각각 마이크로타입 및 양측 피막절제 및 포켓 재조정 시행',
    category: 'axillary',
  },
  {
    id: 12,
    image: '/gallery/12_surgery.png',
    title: '유륜 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 좌측 구축 피막절제 및 밑선교정 시행',
    category: 'areola',
  },
  {
    id: 13,
    image: '/gallery/13_surgery.png',
    title: '겨드랑이 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 양측 피막절제 시행',
    category: 'axillary',
  },
  {
    id: 14,
    image: '/gallery/14_surgery.png',
    title: '밑선 절개 재수술',
    description: '세빈 보형물 양측 각각 스무스타입 및 양측 구축 피막절제 및 밑선교정 시행',
    category: 'inframammary',
  },
  {
    id: 15,
    image: '/gallery/15_surgery.png',
    title: '겨드랑이 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 양측 피막절제 및 포켓 재조정 시행',
    category: 'axillary',
  },
  {
    id: 16,
    image: '/gallery/16_surgery.png',
    title: '유륜 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 우측 구축 양측 피막절제 시행',
    category: 'areola',
  },
  {
    id: 17,
    image: '/gallery/17_surgery.png',
    title: '겨드랑이 절개 재수술',
    description: '세빈 보형물 양측 각각 마이크로타입 및 양측 피막절제 및 밑선교정 시행',
    category: 'axillary',
  },
];

export default function BeforeAfterSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: swiperRef, isVisible: swiperVisible } = useScrollAnimation({ threshold: 0.1 });

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Section Header with animation */}
        <div
          ref={headerRef}
          className={`text-center mb-8 md:mb-12 transition-all duration-700 ease-out ${
            headerVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display text-[11px] md:text-[12px] tracking-[0.2em] text-[#8B7355] mb-4 uppercase">
            BEFORE & AFTER
          </p>
          <h2 className="text-[24px] md:text-[32px] font-semibold text-[#2a2a2a] mb-4 tracking-[-0.02em]">
            엄나구모 전후 사진
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed">
            지식 / 기술 / 윤리와 혼이 깃든 장인정신의 조화,<br className="md:hidden" />
            바로 엄나구모 성형외과입니다.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12 transition-all duration-700 ease-out ${
            headerVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 md:px-6 py-2.5 text-[12px] md:text-[13px] font-medium transition-all duration-300
                ${activeCategory === category.id
                  ? 'bg-[#8B7355] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Swiper with animation */}
        <div
          ref={swiperRef}
          className={`before-after-swiper transition-all duration-1000 ease-out ${
            swiperVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <Swiper
            key={activeCategory} // Re-render swiper when category changes
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={false}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 24,
              },
            }}
          >
            {filteredImages.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* 수술 제목 (상단) */}
                  <div className="py-3 px-4 border-b border-gray-100 bg-[#8B7355]">
                    <p className="text-[13px] md:text-[14px] font-medium text-white text-center">
                      {item.title}
                    </p>
                  </div>
                  {/* 이미지 */}
                  <div className="relative bg-gray-50">
                    <Image
                      src={item.image}
                      alt={`${item.title} 수술 전후`}
                      width={900}
                      height={675}
                      className="w-full h-auto object-contain"
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 700px"
                    />
                  </div>
                  {/* 수술 상세 정보 (하단) */}
                  <div className="p-4 border-t border-gray-100 bg-white">
                    <p className="text-[11px] md:text-[12px] text-gray-600 leading-[1.7] text-center">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View More Button */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            href="/before-after"
            className="inline-flex items-center gap-2 bg-[#2a2a2a] text-white px-8 py-3.5
              hover:bg-[#1a1a1a] transition-all duration-300 text-[13px] font-medium"
          >
            전체 후기 보기
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
