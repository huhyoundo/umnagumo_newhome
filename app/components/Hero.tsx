'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen pt-[70px] overflow-hidden">
      {/* Full-screen Background Image with Zoom Animation */}
      <div className="absolute inset-0 pt-[70px]">
        <div
          className={`absolute inset-0 transition-transform duration-[2s] ease-out ${
            isLoaded ? 'scale-100' : 'scale-110'
          }`}
        >
          <Image
            src="/메인페이지 사진/1(메인).jpg"
            alt="엄나구모 성형외과"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        {/* Subtle gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent" />
      </div>

      {/* Content Overlay - Left Side */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 h-full">
        <div className="flex flex-col justify-center min-h-[calc(100vh-70px)] py-16 lg:py-0">
          <div className="max-w-[500px]">
            {/* Subtitle with fade animation */}
            <p
              className={`font-display text-[11px] md:text-[12px] tracking-[0.2em] text-[#8B7355] mb-4 uppercase
                transition-all duration-700 ease-out ${
                  isLoaded
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: '0.2s' }}
            >
              UMNAGUMO PLASTIC SURGERY
            </p>

            {/* Main Title with stagger animation */}
            <h1 className="text-[28px] md:text-[36px] lg:text-[42px] font-medium text-[#2a2a2a] leading-[1.4] mb-3 tracking-[-0.01em] overflow-hidden">
              <span
                className={`block transition-all duration-700 ease-out ${
                  isLoaded
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-[100%]'
                }`}
                style={{ transitionDelay: '0.4s' }}
              >
                가슴성형의 클래식,
              </span>
              <span
                className={`block transition-all duration-700 ease-out ${
                  isLoaded
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-[100%]'
                }`}
                style={{ transitionDelay: '0.6s' }}
              >
                현대적 혁신을 더하다.
              </span>
            </h1>

            {/* CTA Button with delayed fade */}
            <Link
              href="/consultation"
              className={`inline-flex items-center gap-2 bg-[#8B7355] text-white px-6 py-3
                hover:bg-[#6B5A45] transition-all duration-300 text-[13px] font-medium tracking-wide mt-6
                hover:gap-3 hover:shadow-lg hover:shadow-[#8B7355]/20
                ${isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: '0.8s', transitionDuration: '0.7s' }}
            >
              상담 예약 바로 가기
              <svg
                className="w-4 h-4 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
          transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        style={{ transitionDelay: '1.2s' }}
      >
        <span className="text-[10px] text-gray-500 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gray-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#8B7355] animate-line-grow" />
        </div>
      </div>
    </section>
  );
}
