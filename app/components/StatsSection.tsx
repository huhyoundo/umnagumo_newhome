'use client';

import Image from 'next/image';
import { useScrollAnimation, useCounterAnimation } from '../hooks/useScrollAnimation';

export default function StatsSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: daysRef, count: daysCount } = useCounterAnimation(5675, { duration: 2500 });
  const { ref: surgeriesRef, count: surgeriesCount } = useCounterAnimation(12163, { duration: 2500 });
  const { ref: experienceRef, count: experienceCount } = useCounterAnimation(20, { duration: 2000 });

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image with parallax-like effect */}
      <div className="absolute inset-0">
        <Image
          src="/메인페이지 사진/7.jpg"
          alt="배경"
          fill
          className={`object-cover transition-transform duration-[2s] ease-out ${
            isVisible ? 'scale-100' : 'scale-110'
          }`}
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display text-[11px] md:text-[12px] tracking-[0.2em] text-[#C4A574] mb-4 uppercase">
            UMNAGUMO PLASTIC SURGERY
          </p>
          <h2 className="text-[22px] md:text-[28px] lg:text-[32px] font-medium text-white leading-[1.5]">
            가슴성형의 명가, 세대를 잇는 아름다움
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {/* Stat 1 - Experience */}
          <div
            className={`text-center p-6 md:p-8 border border-white/20 backdrop-blur-sm
              transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="mb-4">
              <span className="font-display text-[48px] md:text-[56px] lg:text-[64px] font-light text-white tracking-tight">
                <span ref={experienceRef} className="text-[#C4A574]">{experienceCount}</span>
              </span>
              <span className="text-[18px] md:text-[20px] font-light text-white ml-1">년+</span>
            </div>
            <p className="text-white/90 text-[14px] md:text-[15px] font-medium mb-2">
              가슴성형 전문 경력
            </p>
            <p className="text-white/60 text-[12px] md:text-[13px] leading-relaxed">
              성형외과 전문의로서<br />축적된 노하우
            </p>
          </div>

          {/* Stat 2 - Surgeries */}
          <div
            className={`text-center p-6 md:p-8 border border-white/20 backdrop-blur-sm
              transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="mb-4">
              <span className="font-display text-[48px] md:text-[56px] lg:text-[64px] font-light text-white tracking-tight">
                <span ref={surgeriesRef} className="text-[#C4A574]">{surgeriesCount.toLocaleString()}</span>
              </span>
              <span className="text-[18px] md:text-[20px] font-light text-white ml-1">케이스</span>
            </div>
            <p className="text-white/90 text-[14px] md:text-[15px] font-medium mb-2">
              가슴성형 수술 케이스
            </p>
            <p className="text-white/60 text-[12px] md:text-[13px] leading-relaxed">
              풍부한 임상 경험으로<br />최적의 결과 도출
            </p>
          </div>

          {/* Stat 3 - Days */}
          <div
            className={`text-center p-6 md:p-8 border border-white/20 backdrop-blur-sm
              transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="mb-4">
              <span className="font-display text-[48px] md:text-[56px] lg:text-[64px] font-light text-white tracking-tight">
                D+<span ref={daysRef} className="text-[#C4A574]">{daysCount.toLocaleString()}</span>
              </span>
              <span className="text-[18px] md:text-[20px] font-light text-white ml-1">일</span>
            </div>
            <p className="text-white/90 text-[14px] md:text-[15px] font-medium mb-2">
              병원 개설
            </p>
            <p className="text-white/60 text-[12px] md:text-[13px] leading-relaxed">
              한결같은 마음으로<br />아름다움을 실현
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
