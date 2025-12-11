'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

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

// 카테고리 정의
const categories = [
  { id: 'all', label: '전체보기', count: 17 },
  { id: 'axillary', label: '겨드랑이 절개', count: 9 },
  { id: 'inframammary', label: '밑선 절개', count: 4 },
  { id: 'areola', label: '유륜 절개', count: 4 },
];

// 갤러리 이미지와 수술 정보
const galleryImages = [
  { id: 1, image: '/gallery/1_surgery.png', title: '겨드랑이 절개 재수술', description: '모티바 보형물 양측 각각 진라인 및 좌측 구축 양측 피막절제 및 밑선교정 시행', category: 'axillary' },
  { id: 2, image: '/gallery/2_surgery.png', title: '밑선 절개 재수술', description: '세빈 보형물 양측 각각 스무스타입 및 양측 피막절제 및 포켓 재조정 시행', category: 'inframammary' },
  { id: 3, image: '/gallery/3_surgery.png', title: '겨드랑이 절개 재수술', description: '모티바 보형물 양측 각각 진라인 및 우측 구축 양측 피막절제 및 밑선교정 시행', category: 'axillary' },
  { id: 4, image: '/gallery/4_surgery.png', title: '유륜 절개 재수술', description: '모티바 보형물 양측 각각 진라인 및 양측 피막절제 및 포켓 재조정 시행', category: 'areola' },
  { id: 5, image: '/gallery/5_surgery.png', title: '겨드랑이 절개 재수술', description: '세빈 보형물 양측 각각 마이크로타입 및 양측 피막절제 시행', category: 'axillary' },
  { id: 6, image: '/gallery/6_surgery.png', title: '밑선 절개 재수술', description: '모티바 보형물 양측 각각 진라인 및 양측 구축 피막절제 및 밑선교정 시행', category: 'inframammary' },
  { id: 7, image: '/gallery/7_surgery.png', title: '겨드랑이 절개 재수술', description: '모티바 보형물 양측 각각 진라인 및 좌측 구축 양측 피막절제 시행', category: 'axillary' },
  { id: 8, image: '/gallery/8_surgery.png', title: '유륜 절개 재수술', description: '세빈 보형물 양측 각각 스무스타입 및 양측 피막절제 및 포켓 재조정 시행', category: 'areola' },
  { id: 9, image: '/gallery/9_surgery.png', title: '겨드랑이 절개 재수술', description: '모티바 보형물 양측 각각 진라인 및 양측 피막절제 및 밑선교정 시행', category: 'axillary' },
  { id: 10, image: '/gallery/10_surgery.png', title: '밑선 절개 재수술', description: '모티바 보형물 양측 각각 진라인 및 우측 구축 양측 피막절제 시행', category: 'inframammary' },
  { id: 11, image: '/gallery/11_surgery.png', title: '겨드랑이 절개 재수술', description: '세빈 보형물 양측 각각 마이크로타입 및 양측 피막절제 및 포켓 재조정 시행', category: 'axillary' },
  { id: 12, image: '/gallery/12_surgery.png', title: '유륜 절개 재수술', description: '모티바 보형물 양측 각각 진라인 및 좌측 구축 피막절제 및 밑선교정 시행', category: 'areola' },
  { id: 13, image: '/gallery/13_surgery.png', title: '겨드랑이 절개 재수술', description: '모티바 보형물 양측 각각 진라인 및 양측 피막절제 시행', category: 'axillary' },
  { id: 14, image: '/gallery/14_surgery.png', title: '밑선 절개 재수술', description: '세빈 보형물 양측 각각 스무스타입 및 양측 구축 피막절제 및 밑선교정 시행', category: 'inframammary' },
  { id: 15, image: '/gallery/15_surgery.png', title: '겨드랑이 절개 재수술', description: '모티바 보형물 양측 각각 진라인 및 양측 피막절제 및 포켓 재조정 시행', category: 'axillary' },
  { id: 16, image: '/gallery/16_surgery.png', title: '유륜 절개 재수술', description: '모티바 보형물 양측 각각 진라인 및 우측 구축 양측 피막절제 시행', category: 'areola' },
  { id: 17, image: '/gallery/17_surgery.png', title: '겨드랑이 절개 재수술', description: '세빈 보형물 양측 각각 마이크로타입 및 양측 피막절제 및 밑선교정 시행', category: 'axillary' },
];

// 애니메이션 텍스트 컴포넌트
function AnimatedTitle({ children, isVisible }: { children: string; isVisible: boolean }) {
  const chars = children.split('');
  return (
    <span style={{ perspective: '1000px' }}>
      {chars.map((char, index) => (
        <span
          key={index}
          className="inline-block will-change-transform"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? 'translateY(0) rotateX(0)'
              : 'translateY(40px) rotateX(-60deg)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: `${0.3 + index * 0.025}s`,
            transformOrigin: 'center bottom',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// 마그네틱 탭 버튼 컴포넌트
function CategoryTab({
  category,
  isActive,
  onClick,
  index,
  isVisible,
}: {
  category: { id: string; label: string; count: number };
  isActive: boolean;
  onClick: () => void;
  index: number;
  isVisible: boolean;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.15;
    const y = (e.clientY - centerY) * 0.15;
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
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`relative px-5 md:px-6 py-2.5 text-[12px] md:text-[13px] font-medium transition-all duration-300 overflow-hidden group
        ${isActive
          ? 'bg-[#8B7355] text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? `translateY(0) translate(${position.x}px, ${position.y}px)`
          : 'translateY(20px)',
        transition: `opacity 0.5s ease ${0.1 + index * 0.05}s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      {/* Shimmer effect on hover */}
      <div
        className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700
          ${isActive ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-[#8B7355]/10 to-transparent'}`}
      />
      <span className="relative z-10">{category.label}</span>
      {/* Count badge */}
      <span
        className={`ml-1.5 text-[10px] transition-colors duration-300
          ${isActive ? 'text-white/70' : 'text-gray-400'}`}
      >
        ({category.count})
      </span>
    </button>
  );
}

// 3D 갤러리 카드 컴포넌트
function GalleryCard({
  item,
  isVisible,
}: {
  item: typeof galleryImages[0];
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm group cursor-pointer"
      style={{
        transform: transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.15)' : '0 4px 6px rgba(0,0,0,0.05)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* 수술 제목 (상단) */}
      <div className="py-3 px-4 border-b border-gray-100 bg-[#8B7355] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />
        <p className="text-[13px] md:text-[14px] font-medium text-white text-center relative z-10">
          {item.title}
        </p>
      </div>

      {/* 이미지 */}
      <div className="relative bg-gray-50 overflow-hidden">
        <Image
          src={item.image}
          alt={`${item.title} 수술 전후`}
          width={900}
          height={675}
          className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
          quality={100}
          sizes="(max-width: 768px) 100vw, 700px"
        />
        {/* Image overlay on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
        {/* Before/After labels */}
        <div
          className="absolute bottom-4 left-4 right-4 flex justify-between"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.3s ease',
          }}
        >
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-gray-700">
            BEFORE
          </span>
          <span className="bg-[#8B7355]/90 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-white">
            AFTER
          </span>
        </div>
      </div>

      {/* 수술 상세 정보 (하단) */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <p className="text-[11px] md:text-[12px] text-gray-600 leading-[1.7] text-center">
          {item.description}
        </p>
      </div>
    </div>
  );
}

// 프로그레스 인디케이터 컴포넌트
function ProgressIndicator({
  current,
  total,
  isVisible,
}: {
  current: number;
  total: number;
  isVisible: boolean;
}) {
  const progress = (current / total) * 100;

  return (
    <div
      className="flex items-center gap-4 justify-center mt-8"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease 0.6s',
      }}
    >
      <span className="text-[12px] text-gray-500 font-medium">
        {String(current).padStart(2, '0')}
      </span>
      <div className="w-40 h-[2px] bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#8B7355] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-[12px] text-gray-400">
        {String(total).padStart(2, '0')}
      </span>
    </div>
  );
}

// 마그네틱 버튼 컴포넌트
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
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
      className="inline-flex items-center gap-2 bg-[#2a2a2a] text-white px-8 py-3.5
        hover:bg-[#1a1a1a] transition-all duration-300 text-[13px] font-medium group relative overflow-hidden"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease',
      }}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <span className="relative z-10">전체 후기 보기</span>
      <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </Link>
  );
}

export default function BeforeAfterSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(1);
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.15);
  const swiperRef = useRef<SwiperType | null>(null);

  const filteredImages = useMemo(() =>
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter(item => item.category === activeCategory),
    [activeCategory]
  );

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentSlide(1);
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Section Header with animation */}
        <div className="text-center mb-8 md:mb-12">
          {/* Animated subtitle */}
          <p
            className="font-display text-[11px] md:text-[12px] tracking-[0.2em] mb-4 uppercase"
            style={{
              background: 'linear-gradient(90deg, #8B7355 0%, #C4A574 50%, #8B7355 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: isVisible ? 'gradientShift 4s ease infinite' : 'none',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            BEFORE & AFTER
          </p>

          {/* Animated title */}
          <h2 className="text-[24px] md:text-[32px] font-semibold text-[#2a2a2a] mb-4 tracking-[-0.02em]">
            <AnimatedTitle isVisible={isVisible}>
              엄나구모 전후 사진
            </AnimatedTitle>
          </h2>

          {/* Animated description */}
          <div className="overflow-hidden">
            <p
              className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.4s',
              }}
            >
              지식 / 기술 / 윤리와 혼이 깃든 장인정신의 조화,<br className="md:hidden" />
              바로 엄나구모 성형외과입니다.
            </p>
          </div>
        </div>

        {/* Category Tabs with magnetic effect */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
          {categories.map((category, index) => (
            <CategoryTab
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Swiper with 3D cards */}
        <div
          className="before-after-swiper"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <Swiper
            key={activeCategory}
            modules={[Navigation, Pagination, EffectCoverflow]}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={false}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 2.5, spaceBetween: 24 },
            }}
          >
            {filteredImages.map((item) => (
              <SwiperSlide key={item.id}>
                <GalleryCard item={item} isVisible={isVisible} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator
          current={currentSlide}
          total={filteredImages.length}
          isVisible={isVisible}
        />

        {/* View More Button with magnetic effect */}
        <div
          className="text-center mt-10 md:mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.7s',
          }}
        >
          <MagneticButton href="/before-after">
            전체 후기 보기
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
