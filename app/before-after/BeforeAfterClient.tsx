'use client';

import Image from '../components/SafeImage';
import Link from 'next/link';
import Header from '../components/Header';
import FooterDeferred from '../components/deferred/FooterDeferred';
import { useMemo, useState } from 'react';

import {
  legacyBreastGalleryItems,
  type GalleryFilter,
  type LegacyBreastGalleryItem,
} from '../data/legacyBreastGallery';

type GalleryCategory = GalleryFilter;

const primaryCount = legacyBreastGalleryItems.filter((item) => item.surgeryType === 'primary').length;
const revisionCount = legacyBreastGalleryItems.filter((item) => item.surgeryType === 'revision').length;

const categories = [
  { id: 'all', label: '전체보기', count: legacyBreastGalleryItems.length },
  { id: 'primary', label: '첫수술', count: primaryCount },
  { id: 'revision', label: '재수술', count: revisionCount },
] as const satisfies ReadonlyArray<{ id: GalleryCategory; label: string; count: number }>;

const reviews: LegacyBreastGalleryItem[] = legacyBreastGalleryItems;

const bestReviews: LegacyBreastGalleryItem[] = [
  ...legacyBreastGalleryItems.slice(0, 3),
];

const categoryLabelById: Record<GalleryCategory, string> = {
  all: '전체보기',
  primary: '첫수술',
  revision: '재수술',
};

function CategoryPill({
  category: categoryMeta,
  active,
  onClick,
}: {
  category: { id: GalleryCategory; label: string; count: number };
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 md:px-6 py-2.5 rounded-full text-[12px] md:text-[13px] font-semibold transition-all
        ${active ? 'bg-[var(--navy)] text-white' : 'bg-white/70 text-[var(--ink)] border border-line hover:bg-white'}`}
    >
      {categoryMeta.label}
      <span className={`ml-1.5 text-[10px] ${active ? 'text-white/75' : 'text-[var(--ink-muted)]'}`}>
        ({categoryMeta.count})
      </span>
    </button>
  );
}

export default function BeforeAfterPage() {
  const [currentBestIndex, setCurrentBestIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');

  const filteredReviews = useMemo(() => {
    return selectedCategory === 'all'
      ? reviews
      : reviews.filter((review) => review.surgeryType === selectedCategory);
  }, [selectedCategory]);

  const nextBestSlide = () => setCurrentBestIndex((prev) => (prev + 1) % bestReviews.length);
  const prevBestSlide = () => setCurrentBestIndex((prev) => (prev - 1 + bestReviews.length) % bestReviews.length);

  const activeBest = bestReviews[currentBestIndex];
  const bestIndexLabel = String(currentBestIndex + 1).padStart(2, '0');
  const bestTotalLabel = String(bestReviews.length).padStart(2, '0');

  return (
    <>
      <Header />
      <main className="pt-[70px] md:pt-0 bg-[var(--paper)]">
        {/* Hero (Sway 스타일: 라운드 컨테이너) */}
        <section>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 pb-10">
            <div
              className="relative rounded-[28px] md:rounded-[50px] overflow-hidden border border-line bg-white"
              style={{ minHeight: 300, height: 'calc(100vh - 320px)', maxHeight: 420 }}
            >
              <Image
                src="/메인페이지 사진/7.jpg"
                alt="엄나구모 전후사진"
                fill
                className="object-cover object-center"
                priority
                quality={95}
                sizes="100vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(248,246,243,0.96) 0%, rgba(248,246,243,0.82) 46%, rgba(248,246,243,0.30) 72%, rgba(29,35,86,0.10) 100%)',
                }}
              />

              <div className="relative z-10 h-full flex items-center">
                <div className="px-7 md:px-14 max-w-[740px]">
                  <p className="font-display text-[11px] md:text-[13px] tracking-[0.32em] uppercase font-medium text-[var(--navy)]">
                    BEFORE &amp; AFTER
                  </p>
                  <h1 className="text-[32px] md:text-[50px] font-semibold tracking-[-0.03em] text-[var(--ink)] leading-[1.12] mt-5">
                    엄나구모 전후사진
                  </h1>
                  <p className="text-[14px] md:text-[16px] text-[var(--ink-muted)] leading-relaxed mt-6">
                    결과는 디테일에서 완성됩니다.
                    <br />
                    수술 방법·체형·조직 조건에 맞춘 케이스를 확인해보세요.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-10">
                    <Link
                      href="http://pf.kakao.com/_QRNzxj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--navy)] text-white text-[14px] font-semibold tracking-wide
                        hover:shadow-[0_18px_45px_rgba(29,35,86,0.30)] transition-shadow"
                    >
                      상담 예약 바로 가기
                    </Link>
                    <Link
                      href="/doctors"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-line bg-white/70 backdrop-blur-sm text-[14px] font-semibold tracking-wide text-[var(--ink)]
                        hover:bg-white transition-colors"
                    >
                      의료진 소개 보기
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-7 right-8 hidden md:flex items-end gap-3 text-[var(--ink)] font-display">
                <span className="text-[64px] leading-[0.85] font-bold">{bestIndexLabel}</span>
                <span className="pb-2 text-[14px] text-[var(--ink-muted)]">/ {bestTotalLabel}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Best */}
        <section className="pb-12 md:pb-16">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <p className="text-[12px] tracking-[0.28em] uppercase font-medium text-[var(--navy)] mb-4">
                  BEST CASES
                </p>
                <h2 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.03em] text-[var(--ink)]">
                  BEST 수술 후기
                </h2>
                <p className="text-[14px] text-[var(--ink-muted)] mt-4">
                  케이스별 포인트를 한눈에 확인할 수 있도록 정리했습니다.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={prevBestSlide}
                  className="w-11 h-11 rounded-full border border-line bg-white/70 hover:bg-white transition-colors flex items-center justify-center"
                  aria-label="이전"
                >
                  <svg className="w-5 h-5 text-[var(--ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextBestSlide}
                  className="w-11 h-11 rounded-full border border-line bg-white/70 hover:bg-white transition-colors flex items-center justify-center"
                  aria-label="다음"
                >
                  <svg className="w-5 h-5 text-[var(--ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="rounded-[26px] md:rounded-[36px] border border-line bg-white overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,0.08)]">
              <div className="grid lg:grid-cols-[1fr_420px]">
                <div className="relative bg-[var(--paper)]">
                  <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden">
                    {activeBest.imageBefore && activeBest.imageAfter ? (
                      <div className="absolute inset-0 flex w-full h-full">
                        <div className="relative w-1/2 h-full border-r border-white/10">
                          <Image
                            src={activeBest.imageBefore}
                            alt={`${activeBest.title} 수술 전`}
                            fill
                            className="object-cover"
                            quality={100}
                            sizes="(min-width: 1024px) 390px, 50vw"
                          />
                        </div>
                        <div className="relative w-1/2 h-full">
                          <Image
                            src={activeBest.imageAfter}
                            alt={`${activeBest.title} 수술 후`}
                            fill
                            className="object-cover"
                            quality={100}
                            sizes="(min-width: 1024px) 390px, 50vw"
                          />
                        </div>
                      </div>
                    ) : activeBest.image ? (
                      <Image
                        src={activeBest.image}
                        alt={`${activeBest.title} 수술 전후`}
                        fill
                        className="object-contain"
                        quality={100}
                        sizes="(min-width: 1024px) 780px, 100vw"
                      />
                    ) : null}
                  </div>
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-line text-[12px] font-semibold text-[var(--ink)]">
                      {categoryLabelById[activeBest.surgeryType]}
                    </span>
                  </div>
                </div>

                <div className="p-8 md:p-10 lg:p-12 flex flex-col">
                  <p className="text-[12px] tracking-[0.28em] uppercase font-medium text-[var(--navy)]">
                    CASE {bestIndexLabel}
                  </p>
                  <h3 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.03em] text-[var(--ink)] mt-4 whitespace-pre-line">
                    {activeBest.title}
                  </h3>
                  <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed mt-4 whitespace-pre-line">
                    {activeBest.description}
                  </p>

                  <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={prevBestSlide}
                      className="md:hidden inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-line bg-white/70 hover:bg-white transition-colors text-[13px] font-semibold text-[var(--ink)]"
                    >
                      이전
                    </button>
                    <button
                      onClick={nextBestSlide}
                      className="md:hidden inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-line bg-white/70 hover:bg-white transition-colors text-[13px] font-semibold text-[var(--ink)]"
                    >
                      다음
                    </button>
                    <Link
                      href="http://pf.kakao.com/_QRNzxj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[var(--navy)] text-white text-[13px] font-semibold tracking-wide
                        hover:shadow-[0_18px_45px_rgba(29,35,86,0.25)] transition-shadow"
                    >
                      케이스 상담하기
                    </Link>
                  </div>
                </div>
              </div>

              <div className="px-7 md:px-10 pb-7 pt-5 border-t border-line bg-white">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-2">
                    {bestReviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentBestIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentBestIndex ? 'bg-[var(--navy)]' : 'bg-[rgba(30,32,35,0.16)]'}`}
                        aria-label={`베스트 케이스 ${index + 1}`}
                      />
                    ))}
                  </div>
                  <p className="text-[12px] text-[var(--ink-muted)]">
                    지식·기술·윤리와 혼이 깃든 장인정신의 조화, 엄나구모 성형외과입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter */}
        <section className="py-10 border-t border-line bg-[var(--paper)]">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((category) => (
                <CategoryPill
                  key={category.id}
                  category={category}
                  active={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="pb-20 md:pb-28 bg-[var(--paper)]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review) => (
                <Link
                  key={review.id}
                  href={`/before-after/${review.id}`}
                  className="block group"
                >
                  <article
                    className="rounded-[22px] border border-line bg-white overflow-hidden group-hover:shadow-[0_18px_48px_rgba(0,0,0,0.10)] transition-shadow h-full flex flex-col"
                  >
                    <div className="px-5 py-4 border-b border-line bg-[var(--paper)]">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--navy)]/8 text-[var(--navy)] text-[12px] font-semibold">
                          {categoryLabelById[review.surgeryType]}
                        </span>
                        <span className="text-[12px] text-[var(--ink-muted)] font-display tracking-[0.18em] uppercase">
                          CASE
                        </span>
                      </div>
                      <h3 className="text-[16px] font-semibold text-[var(--ink)] mt-3 tracking-[-0.02em] whitespace-pre-line group-hover:text-[var(--navy)] transition-colors">
                        {review.title}
                      </h3>
                    </div>

                    <div className="relative bg-[var(--paper)]">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {review.imageBefore && review.imageAfter ? (
                          <div className="absolute inset-0 flex w-full h-full">
                            <div className="relative w-1/2 h-full border-r border-white/10">
                              <Image
                                src={review.imageBefore}
                                alt={`${review.title} 수술 전`}
                                fill
                                className="object-cover"
                                quality={100}
                                sizes="(min-width: 1024px) 16vw, 50vw"
                              />
                            </div>
                            <div className="relative w-1/2 h-full">
                              <Image
                                src={review.imageAfter}
                                alt={`${review.title} 수술 후`}
                                fill
                                className="object-cover"
                                quality={100}
                                sizes="(min-width: 1024px) 16vw, 50vw"
                              />
                            </div>
                          </div>
                        ) : review.image ? (
                          <Image
                            src={review.image}
                            alt={`${review.title} 수술 전후`}
                            fill
                            className="object-contain"
                            quality={100}
                            sizes="(min-width: 1024px) 33vw, 100vw"
                          />
                        ) : null}
                      </div>
                    </div>

                    <div className="p-5 flex-1">
                      <p className="text-[12px] md:text-[13px] text-[var(--ink-muted)] leading-relaxed whitespace-pre-line">
                        {review.description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterDeferred />
    </>
  );
}
