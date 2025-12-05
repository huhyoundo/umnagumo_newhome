'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function DoctorSection() {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-center">
          {/* Left Content - Slide in from left */}
          <div
            ref={contentRef}
            className={`lg:py-8 transition-all duration-1000 ease-out ${
              contentVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <h2 className="text-[24px] md:text-[32px] font-semibold text-[#2a2a2a] mb-6 tracking-[-0.02em]">
              엄나구모 의료진 소개
            </h2>
            <p className="text-[14px] md:text-[15px] text-gray-600 leading-[1.9] mb-8">
              축적된 경험과 현대적 기술로 가장 자연스러운
              <br />
              아름다움을 실현합니다. 체형과 조건에 기반하여 한
              <br />
              분과 100번의 상담이 가능한 세심함으로 환자 한
              <br />
              분 한 분께 진심으로 다가갑니다.
            </p>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 text-[13px] text-[#2a2a2a] border-b border-[#2a2a2a] pb-1
                hover:text-[#8B7355] hover:border-[#8B7355] transition-all duration-300 font-medium
                hover:gap-3 group"
            >
              의료진 소개 자세히 보기
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {/* Right Image - Slide in from right */}
          <div
            ref={imageRef}
            className={`transition-all duration-1000 ease-out ${
              imageVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative w-full aspect-[16/11] overflow-hidden group">
              <Image
                src="/메인페이지 사진/6(원장님).jpg"
                alt="엄나구모 의료진"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
