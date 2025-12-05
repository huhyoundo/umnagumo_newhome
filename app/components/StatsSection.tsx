'use client';

import Image from 'next/image';
import { useScrollAnimation, useCounterAnimation } from '../hooks/useScrollAnimation';

export default function StatsSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: daysRef, count: daysCount } = useCounterAnimation(5675, { duration: 2500 });
  const { ref: surgeriesRef, count: surgeriesCount } = useCounterAnimation(12163, { duration: 2500 });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image with parallax-like effect */}
      <div className="absolute inset-0">
        <Image
          src="/메인페이지 사진/7.jpg"
          alt="배경"
          fill
          className={`object-cover transition-transform duration-[2s] ease-out ${
            isVisible ? 'scale-100' : 'scale-110'
          }`}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
        <h2
          className={`text-[22px] md:text-[28px] lg:text-[34px] font-medium text-white mb-12 md:mb-16 leading-[1.5]
            transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
        >
          가슴성형의 명가, 세대를 잇는 아름다움을 만나다
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          {/* Hospital Opening - Counter Animation */}
          <div
            className={`text-center transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <p className="text-[#C4A574] text-[13px] md:text-[14px] mb-3 tracking-wide">
              병원 개설
            </p>
            <p className="text-white">
              <span className="font-display text-[40px] md:text-[52px] lg:text-[60px] font-light tracking-tight">
                D+<span ref={daysRef} className="text-[#C4A574]">{daysCount.toLocaleString()}</span>
              </span>
              <span className="text-[18px] md:text-[20px] font-light ml-1">일</span>
            </p>
          </div>

          {/* Divider with fade effect */}
          <div
            className={`hidden md:block w-px h-20 bg-white/30 transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 scale-y-100'
                : 'opacity-0 scale-y-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          />

          {/* Surgeries Count - Counter Animation */}
          <div
            className={`text-center transition-all duration-1000 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <p className="text-[#C4A574] text-[13px] md:text-[14px] mb-3 tracking-wide">
              가슴 성형
            </p>
            <p className="text-white">
              <span className="font-display text-[40px] md:text-[52px] lg:text-[60px] font-light tracking-tight">
                <span ref={surgeriesRef} className="text-[#C4A574]">{surgeriesCount.toLocaleString()}</span>
              </span>
              <span className="text-[18px] md:text-[20px] font-light ml-1">개</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
