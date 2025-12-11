'use client';

import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

// 수술 종류별 카테고리
type SurgeryCategory = '전체' | '가슴재수술' | '보형물제거' | '유두축소' | '유륜거상술' | '축소거상';

interface ReviewItem {
  id: number;
  category: SurgeryCategory;
  title: string;
  description: string;
  image: string;
}

const bestReviews: ReviewItem[] = [
  {
    id: 1,
    category: '가슴재수술',
    title: '겨드랑이 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 좌측 구축 양측 피막절제 및 밑선교정 시행',
    image: '/메인페이지 사진/8(수술전후1).jpg',
  },
  {
    id: 2,
    category: '보형물제거',
    title: '유륜 절개 보형물제거',
    description: '양측 보형물 및 피막 완전 제거 자가조직 재배치 및 봉합 시행',
    image: '/메인페이지 사진/9(수술전후2).jpg',
  },
  {
    id: 3,
    category: '유륜거상술',
    title: '유륜 절개 거상술',
    description: '유륜 주변 피부 절제 및 유두 위치 재조정 시행',
    image: '/메인페이지 사진/8(수술전후1).jpg',
  },
];

const reviews: ReviewItem[] = [
  {
    id: 1,
    category: '가슴재수술',
    title: '겨드랑이 절개 재수술',
    description: '모티바 보형물 양측 각각 진라인 및 좌측 구축 양측 피막절제 및 밑선교정 시행',
    image: '/메인페이지 사진/8(수술전후1).jpg',
  },
  {
    id: 2,
    category: '보형물제거',
    title: '밑선 절개 보형물제거',
    description: '양측 보형물 및 피막 완전 제거 지방이식 동시 시행',
    image: '/메인페이지 사진/9(수술전후2).jpg',
  },
  {
    id: 3,
    category: '유두축소',
    title: '유두축소술',
    description: '양측 유두 길이 및 직경 축소 수유관 보존 미세봉합 시행',
    image: '/메인페이지 사진/8(수술전후1).jpg',
  },
  {
    id: 4,
    category: '유륜거상술',
    title: '유륜 절개 거상술',
    description: '유륜 주변 피부 절제 및 유두 위치 재조정 시행',
    image: '/메인페이지 사진/9(수술전후2).jpg',
  },
  {
    id: 5,
    category: '축소거상',
    title: '수직 절개 축소거상술',
    description: '유방조직 부분절제 및 유두 재배치 양측 대칭 교정 시행',
    image: '/메인페이지 사진/8(수술전후1).jpg',
  },
  {
    id: 6,
    category: '가슴재수술',
    title: '밑선 절개 재수술',
    description: '세빈 보형물 양측 각각 스무스타입 및 양측 피막절제 및 포켓 재조정 시행',
    image: '/메인페이지 사진/9(수술전후2).jpg',
  },
];

const categories: SurgeryCategory[] = ['전체', '가슴재수술', '보형물제거', '유두축소', '유륜거상술', '축소거상'];

export default function BeforeAfterPage() {
  const [currentBestIndex, setCurrentBestIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<SurgeryCategory>('전체');

  const nextBestSlide = () => {
    setCurrentBestIndex((prev) => (prev + 1) % bestReviews.length);
  };

  const prevBestSlide = () => {
    setCurrentBestIndex((prev) => (prev - 1 + bestReviews.length) % bestReviews.length);
  };

  const filteredReviews = selectedCategory === '전체'
    ? reviews
    : reviews.filter(review => review.category === selectedCategory);

  return (
    <>
      <Header />
      <main className="pt-[70px] md:pt-0">
        {/* Hero Section - 도예가 배경 */}
        <section className="relative h-[200px] md:h-[280px]">
          <Image
            src="/메인페이지 사진/7.jpg"
            alt="엄나구모 전후사진"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
              <p className="font-display text-[12px] md:text-[14px] tracking-[0.2em] text-white mb-2 uppercase">
                UMNAGUMO PLASTIC SURGERY
              </p>
              <h1 className="text-[28px] md:text-[38px] lg:text-[44px] font-semibold text-white tracking-[-0.02em]">
                엄나구모 전후사진
              </h1>
            </div>
          </div>
        </section>

        {/* Best Reviews Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10">
            <h2 className="text-[22px] md:text-[28px] font-semibold text-[#2a2a2a] mb-10 text-center tracking-[-0.02em]">
              BEST 수술 후기
            </h2>

            {/* Best Review Slider */}
            <div className="relative rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
              {/* 제목 (상단) */}
              <div className="py-3 px-4 border-b border-gray-100 bg-[#8B7355]">
                <p className="text-[13px] md:text-[14px] font-medium text-white text-center">
                  {bestReviews[currentBestIndex].title}
                </p>
              </div>

              <div className="relative">
                {/* Prev Button */}
                <button
                  onClick={prevBestSlide}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors z-10 bg-black/20 rounded-full"
                  aria-label="이전"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Review Content - 메인페이지와 동일한 비율 */}
                <div className="relative bg-gray-50">
                  <Image
                    src={bestReviews[currentBestIndex].image}
                    alt={`${bestReviews[currentBestIndex].title} 수술 전후`}
                    width={900}
                    height={675}
                    className="w-full h-auto object-contain"
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 900px"
                  />
                </div>

                {/* Next Button */}
                <button
                  onClick={nextBestSlide}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors z-10 bg-black/20 rounded-full"
                  aria-label="다음"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots - 이미지 위에 */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2">
                  {bestReviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBestIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentBestIndex ? 'bg-[#8B7355]' : 'bg-gray-300'
                      }`}
                      aria-label={`슬라이드 ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* 상세 설명 (하단) */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <p className="text-[11px] md:text-[12px] text-gray-600 leading-[1.7] text-center">
                  {bestReviews[currentBestIndex].description}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="text-center mt-10">
              <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
                지식·기술·윤리와 혼이 깃든 장인정신의 조화 바로 엄나구모 성형외과입니다.
                <br />
                고객님들의 소중한 후기 감사합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="bg-white border-t border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 py-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 md:px-6 py-2.5 text-[12px] md:text-[13px] font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#8B7355] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* All Reviews Grid - 메인페이지와 동일한 크기 */}
        <section className="py-12 md:py-20 bg-[#f8f6f3]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* 수술 제목 (상단) */}
                  <div className="py-3 px-4 border-b border-gray-100 bg-[#8B7355]">
                    <p className="text-[13px] md:text-[14px] font-medium text-white text-center">
                      {review.title}
                    </p>
                  </div>
                  {/* 이미지 - 메인페이지와 동일 */}
                  <div className="relative bg-gray-50">
                    <Image
                      src={review.image}
                      alt={`${review.title} 수술 전후`}
                      width={900}
                      height={675}
                      className="w-full h-auto object-contain"
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 700px"
                    />
                  </div>
                  {/* 상세 수술 정보 (하단) */}
                  <div className="p-4 border-t border-gray-100 bg-white">
                    <p className="text-[11px] md:text-[12px] text-gray-600 leading-[1.7] text-center">
                      {review.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredReviews.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-[14px]">해당 카테고리의 수술 후기가 없습니다.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
