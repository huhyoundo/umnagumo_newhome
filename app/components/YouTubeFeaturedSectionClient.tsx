'use client';

import Link from 'next/link';
import LiteYouTubeEmbed from './LiteYouTubeEmbed';

const FEATURED_VIDEO = {
  id: 'cNeLplAECDc',
  title: '가슴성형은 단순히 미용성형이 아닙니다',
  description: '가슴성형을 선택하는 다양한 이유와, 엄나구모가 생각하는 ‘가치 있는 수술’의 기준을 정리한 대표 영상입니다.',
};

export default function YouTubeFeaturedSectionClient() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-[12px] tracking-[0.28em] uppercase font-medium text-[var(--navy)] mb-5">
              UMNAGUMO YOUTUBE
            </p>
            <h2 className="text-[28px] md:text-[36px] font-semibold tracking-[-0.03em] text-[var(--ink)] leading-[1.2]">
              {FEATURED_VIDEO.title}
            </h2>
            <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--ink-muted)] mt-5 max-w-[520px]">
              {FEATURED_VIDEO.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Link
                href={`https://www.youtube.com/watch?v=${FEATURED_VIDEO.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--navy)] text-white text-[14px] font-semibold tracking-wide
                  hover:shadow-[0_18px_45px_rgba(29,35,86,0.35)] transition-shadow"
              >
                영상 보기
              </Link>
              <Link
                href="https://www.youtube.com/@umnagumo/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-line bg-white text-[14px] font-semibold tracking-wide text-[var(--ink)]
                  hover:bg-[var(--paper)] transition-colors"
              >
                채널 더보기
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[26px] bg-[var(--navy)]/10 blur-2xl" aria-hidden="true" />
            <LiteYouTubeEmbed videoId={FEATURED_VIDEO.id} title={FEATURED_VIDEO.title} />
          </div>
        </div>
      </div>
    </section>
  );
}
