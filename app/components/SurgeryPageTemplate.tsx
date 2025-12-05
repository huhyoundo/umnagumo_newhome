'use client';

import Image from 'next/image';
import Header from './Header';
import Footer from './Footer';

interface FAQ {
  question: string;
  answer: string;
}

interface SurgeryPageProps {
  // Hero section
  englishTitle: string;
  koreanTitle: string;
  heroImage: string;

  // Concerns section
  concerns: string[];
  ctaBackgroundImage?: string; // "이런 고민을 가지고 있다면" 배경 이미지

  // Explanation section
  sculptureImage: string;
  surgeryImage: string;
  explanationTitle: string;
  explanationSubtitle?: string;
  explanationContent: string[];

  // Special points
  specialTitle: string;
  specialSubtitle: string;
  specialBackgroundImage?: string; // 특별한 점 섹션 배경 이미지
  specialPoints: {
    icon: 'design' | 'time' | 'feature';
    title: string;
    description: string;
  }[];

  // FAQ section
  faqTitle: string;
  faqs: FAQ[];
}

export default function SurgeryPageTemplate({
  englishTitle,
  koreanTitle,
  heroImage,
  concerns,
  ctaBackgroundImage,
  sculptureImage,
  surgeryImage,
  explanationTitle,
  explanationSubtitle,
  explanationContent,
  specialTitle,
  specialSubtitle,
  specialBackgroundImage,
  specialPoints,
  faqTitle,
  faqs,
}: SurgeryPageProps) {
  const iconComponents = {
    design: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    time: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    feature: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  };

  return (
    <>
      <Header />
      <main className="pt-[70px]">
        {/* Hero Section - 배경 이미지 */}
        <section className="relative h-[250px] md:h-[350px]">
          <Image
            src={heroImage}
            alt={koreanTitle}
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
              <p className="font-display text-[13px] md:text-[15px] tracking-[0.25em] text-white mb-3 uppercase">
                {englishTitle}
              </p>
              <h1 className="text-[32px] md:text-[42px] lg:text-[50px] font-semibold text-white tracking-[-0.02em]">
                {koreanTitle}
              </h1>
            </div>
          </div>
        </section>

        {/* Concerns Section - 조각상 + 고민 목록 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Sculpture Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-[220px] h-[300px] md:w-[280px] md:h-[380px]">
                  <Image
                    src={sculptureImage}
                    alt="조각상"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 220px, 280px"
                  />
                </div>
              </div>

              {/* Concerns List */}
              <div>
                <div className="space-y-5">
                  {concerns.map((concern, index) => (
                    <p key={index} className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
                      &ldquo;{concern}&rdquo;
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - "이런 고민을 가지고 있다면" with background image */}
        <section className="relative py-16 md:py-20">
          {ctaBackgroundImage && (
            <>
              <Image
                src={ctaBackgroundImage}
                alt="배경"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/50" />
            </>
          )}
          <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-10 text-center">
            <p className={`text-[14px] mb-3 ${ctaBackgroundImage ? 'text-white/80' : 'text-gray-500'}`}>
              이런 고민을 가지고 있다면,
            </p>
            <p className={`text-[20px] md:text-[26px] font-semibold ${ctaBackgroundImage ? 'text-white' : 'text-[#2a2a2a]'}`}>
              지금이 바로 가슴 재수술을 고려 해야 할 때입니다.
            </p>
          </div>
        </section>

        {/* Explanation Section - 수술 이미지 + 설명 */}
        <section className="py-16 md:py-24 bg-[#f5f3f0]">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
            {/* 구분선 */}
            <div className="flex items-center justify-center mb-12">
              <div className="w-px h-16 bg-[#8B7355]" />
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Surgery Image */}
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={surgeryImage}
                  alt={koreanTitle}
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Explanation Content */}
              <div className="lg:pt-4">
                <h2 className="text-[24px] md:text-[30px] font-semibold text-[#2a2a2a] mb-1 tracking-[-0.02em]">
                  {explanationTitle}
                </h2>
                {explanationSubtitle && (
                  <p className="text-[18px] md:text-[22px] font-medium text-[#8B7355] mb-8">
                    {explanationSubtitle}
                  </p>
                )}
                <div className="space-y-5">
                  {explanationContent.map((paragraph, index) => (
                    <p key={index} className="text-[14px] md:text-[15px] text-gray-600 leading-[1.9]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Points Section - 3개 아이콘 박스 */}
        <section className="relative py-16 md:py-24">
          {specialBackgroundImage && (
            <>
              <Image
                src={specialBackgroundImage}
                alt="배경"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-white/85" />
            </>
          )}
          {!specialBackgroundImage && <div className="absolute inset-0 bg-white" />}
          <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-[22px] md:text-[28px] font-semibold text-[#2a2a2a] mb-4 tracking-[-0.02em]">
                {specialTitle}
              </h2>
              <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed max-w-[700px] mx-auto">
                {specialSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {specialPoints.map((point, index) => (
                <div key={index} className="border border-gray-200 p-8 md:p-10 text-center bg-white">
                  <div className="text-[#8B7355] mb-5 flex justify-center">
                    {iconComponents[point.icon]}
                  </div>
                  <h3 className="text-[16px] md:text-[17px] font-semibold text-[#2a2a2a] mb-3">
                    {point.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - 번호 원형 + 질문/답변 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[800px] mx-auto px-6 lg:px-10">
            <h2 className="text-[22px] md:text-[28px] font-semibold text-[#2a2a2a] mb-12 text-center tracking-[-0.02em]">
              {faqTitle}
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="text-center">
                  {/* 번호 원 */}
                  <div className="flex justify-center mb-4">
                    <span className="w-10 h-10 bg-[#8B7355] text-white rounded-full flex items-center justify-center text-[13px] font-semibold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {/* 질문 */}
                  <h3 className="text-[16px] md:text-[17px] font-semibold text-[#2a2a2a] mb-3">
                    {faq.question}
                  </h3>
                  {/* 답변 */}
                  <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed max-w-[600px] mx-auto">
                    {faq.answer}
                  </p>
                  {/* 구분선 (마지막 제외) */}
                  {index < faqs.length - 1 && (
                    <div className="mt-8 border-b border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
