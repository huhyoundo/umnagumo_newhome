'use client';

import { useScrollAnimation } from '../hooks/useScrollAnimation';

const trustItems = [
  {
    number: '01',
    title: '1:1 맞춤 상담',
    subtitle: 'Customized',
    description: '체형, 피부 상태, 라이프스타일을 고려한 개인 맞춤 수술 계획을 수립합니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: '안전 수술 시스템',
    subtitle: 'Safety',
    description: '대학병원급 마취 시스템과 응급 대응 체계로 안전한 수술 환경을 제공합니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: '정품 보형물 사용',
    subtitle: 'Premium',
    description: 'FDA 승인 정품 보형물만 사용하며, 정품 인증서를 제공합니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: '체계적 사후관리',
    subtitle: 'Aftercare',
    description: '수술 후 정기 검진과 회복 프로그램으로 최상의 결과를 유지합니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function TrustSystemSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-[#f8f6f3]">
      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display text-[11px] md:text-[12px] tracking-[0.2em] text-[#8B7355] mb-4 uppercase">
            TRUST SYSTEM
          </p>
          <h2 className="text-[24px] md:text-[32px] font-semibold text-[#2a2a2a] mb-4 tracking-[-0.02em]">
            엄나구모 4가지 약속
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed max-w-[500px] mx-auto">
            환자의 안전과 만족을 위해 엄나구모 성형외과가<br className="hidden md:block" />
            지켜나가는 약속입니다.
          </p>
        </div>

        {/* Trust Items Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustItems.map((item, index) => (
            <div
              key={item.number}
              className={`bg-white p-6 md:p-8 group hover:shadow-lg transition-all duration-500
                ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Number & Icon */}
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-[32px] md:text-[36px] font-light text-[#8B7355]/30">
                  {item.number}
                </span>
                <div className="text-[#8B7355] transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="font-display text-[10px] tracking-[0.15em] text-[#8B7355] mb-2 uppercase">
                  {item.subtitle}
                </p>
                <h3 className="text-[16px] md:text-[17px] font-semibold text-[#2a2a2a] mb-3">
                  {item.title}
                </h3>
                <p className="text-[12px] md:text-[13px] text-gray-500 leading-[1.8]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
