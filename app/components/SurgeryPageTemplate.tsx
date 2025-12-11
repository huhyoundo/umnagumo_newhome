'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface SurgeryPageProps {
  englishTitle: string;
  koreanTitle: string;
  heroImage: string;
  concerns: string[];
  ctaBackgroundImage?: string;
  sculptureImage: string;
  surgeryImage: string;
  explanationTitle: string;
  explanationSubtitle?: string;
  explanationContent: string[];
  specialTitle: string;
  specialSubtitle: string;
  specialBackgroundImage?: string;
  specialPoints: {
    icon: 'design' | 'time' | 'feature';
    title: string;
    description: string;
  }[];
  faqTitle: string;
  faqs: FAQ[];
}

export default function SurgeryPageTemplate({
  englishTitle,
  koreanTitle,
  heroImage,
  concerns,
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const iconComponents = {
    design: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    time: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    feature: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  };

  return (
    <>
      <Header />
      <main className="pt-[70px] md:pt-0">
        {/* Hero Section - Cinematic Full Width */}
        <section className="relative h-[60vh] min-h-[400px] max-h-[600px]">
          <Image
            src={heroImage}
            alt={koreanTitle}
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-16 w-full">
              <div className="max-w-[600px]">
                <p className="font-display text-[11px] md:text-[13px] tracking-[0.3em] text-white/80 mb-4 uppercase">
                  {englishTitle}
                </p>
                <h1 className="text-[32px] md:text-[44px] lg:text-[52px] font-semibold text-white tracking-[-0.02em] leading-[1.2] mb-6">
                  {koreanTitle}
                </h1>
                <div className="w-16 h-[2px] bg-[#8B7355]" />
              </div>
            </div>
          </div>
        </section>

        {/* Concerns Section - Modern Quote Cards */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Sculpture Image */}
              <div className="flex justify-center order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 border border-[#8B7355]/20" />
                  <div className="relative w-[280px] h-[380px] md:w-[340px] md:h-[460px]">
                    <Image
                      src={sculptureImage}
                      alt="조각상"
                      fill
                      className="object-contain"
                      quality={100}
                      sizes="(max-width: 768px) 280px, 340px"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-[#8B7355]/20" />
                </div>
              </div>

              {/* Concerns List */}
              <div className="order-1 lg:order-2">
                <p className="text-[12px] text-[#8B7355] tracking-[0.2em] uppercase mb-4">Your Concerns</p>
                <h2 className="text-[24px] md:text-[32px] font-semibold text-[#2a2a2a] mb-10 tracking-[-0.02em]">
                  이런 고민이 있으신가요?
                </h2>
                <div className="space-y-4">
                  {concerns.map((concern, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-4 p-5 bg-[#faf9f7] hover:bg-[#f5f3f0] transition-colors duration-300"
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-[#8B7355] text-white text-[12px] font-medium flex items-center justify-center">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[14px] md:text-[15px] text-[#444] leading-relaxed pt-1">
                        {concern}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative py-16 md:py-20 bg-[#8B7355]">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
            <p className="text-white/80 text-[14px] mb-3">이런 고민을 가지고 있다면,</p>
            <p className="text-white text-[20px] md:text-[28px] font-medium tracking-[-0.02em]">
              지금이 바로 전문의 상담이 필요한 때입니다.
            </p>
          </div>
        </section>

        {/* Explanation Section - Visual Split */}
        <section className="py-20 md:py-28 bg-[#f8f6f3]">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Surgery Image */}
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[#8B7355]/10 translate-x-4 translate-y-4" />
                <div className="relative overflow-hidden">
                  <Image
                    src={surgeryImage}
                    alt={koreanTitle}
                    width={700}
                    height={525}
                    className="w-full h-auto object-cover"
                    quality={100}
                  />
                </div>
              </div>

              {/* Explanation Content */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-[#8B7355]" />
                  <span className="text-[12px] text-[#8B7355] tracking-[0.2em] uppercase">About Surgery</span>
                </div>
                <h2 className="text-[26px] md:text-[34px] font-semibold text-[#2a2a2a] leading-[1.3] tracking-[-0.02em]">
                  {explanationTitle}
                </h2>
                {explanationSubtitle && (
                  <p className="text-[18px] md:text-[22px] font-medium text-[#8B7355] mt-2 mb-8">
                    {explanationSubtitle}
                  </p>
                )}
                {!explanationSubtitle && <div className="mb-8" />}
                <div className="space-y-5">
                  {explanationContent.map((paragraph, index) => (
                    <p key={index} className="text-[14px] md:text-[15px] text-[#555] leading-[1.9]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <Link
                  href="http://pf.kakao.com/_QRNzxj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-[#2a2a2a] text-white text-[14px] font-medium hover:bg-[#1a1a1a] transition-colors"
                >
                  상담 예약하기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Special Points Section - Modern Cards */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          {specialBackgroundImage && (
            <>
              <Image
                src={specialBackgroundImage}
                alt="배경"
                fill
                className="object-cover"
                quality={100}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
            </>
          )}
          {!specialBackgroundImage && <div className="absolute inset-0 bg-white" />}

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16">
            <div className="text-center mb-16">
              <p className="text-[12px] text-[#8B7355] tracking-[0.2em] uppercase mb-4">Why Choose Us</p>
              <h2 className="text-[24px] md:text-[32px] font-semibold text-[#2a2a2a] mb-5 tracking-[-0.02em]">
                {specialTitle}
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#666] leading-relaxed max-w-[700px] mx-auto">
                {specialSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {specialPoints.map((point, index) => (
                <div
                  key={index}
                  className="group bg-white border border-gray-100 p-8 md:p-10 hover:border-[#8B7355]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-[#8B7355]">
                      {iconComponents[point.icon]}
                    </div>
                    <span className="text-[40px] font-light text-gray-100 group-hover:text-[#8B7355]/20 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#2a2a2a] mb-3">
                    {point.title}
                  </h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Accordion Style */}
        <section className="py-20 md:py-28 bg-[#f8f6f3]">
          <div className="max-w-[800px] mx-auto px-6 lg:px-10">
            <div className="text-center mb-14">
              <p className="text-[12px] text-[#8B7355] tracking-[0.2em] uppercase mb-4">FAQ</p>
              <h2 className="text-[24px] md:text-[32px] font-semibold text-[#2a2a2a] tracking-[-0.02em]">
                {faqTitle}
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 text-[13px] font-medium text-[#8B7355]">
                        Q{String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[15px] font-medium text-[#2a2a2a]">
                        {faq.question}
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[#8B7355] transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-[500px]' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="pl-12 border-l-2 border-[#8B7355]/20">
                        <p className="text-[14px] text-[#666] leading-[1.8]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-24 bg-[#2a2a2a]">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
            <p className="text-[12px] text-[#8B7355] tracking-[0.2em] uppercase mb-6">Consultation</p>
            <h2 className="text-[24px] md:text-[32px] font-semibold text-white mb-4 tracking-[-0.02em]">
              전문의와 상담하세요
            </h2>
            <p className="text-[14px] md:text-[15px] text-white/70 mb-10 leading-relaxed">
              20년 이상의 경험을 가진 전문의가 직접 상담해 드립니다.<br />
              개인별 맞춤 진단과 최적의 수술 계획을 제안받으세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="http://pf.kakao.com/_QRNzxj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-4 bg-[#8B7355] text-white text-[14px] font-medium hover:bg-[#7a6548] transition-colors"
              >
                카카오톡 상담
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="tel:025126838"
                className="inline-flex items-center gap-2 px-10 py-4 border border-white/30 text-white text-[14px] font-medium hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                02-512-6838
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
