'use client';

import Image from '../components/SafeImage';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMemo, useState } from 'react';

const tabs = [
  { id: 'prep', label: '수술 안전 준비 시스템' },
  { id: 'recovery', label: '통증 관리 & 초기 회복 시스템' },
  { id: 'longterm', label: '장기적 안전 관리 시스템' },
] as const;

const prepItems = [
  {
    number: '01',
    title: '마취 & 수술 진행 시스템',
    image: '/안전케어 페이지 사진/2(마취-&-수술-진행-시스템).jpg',
  },
  {
    number: '02',
    title: '비상상황 대비 시스템',
    image: '/안전케어 페이지 사진/3(비상상황-시스템).jpg',
  },
  {
    number: '03',
    title: '출혈 최소화 & 드레인 관리',
    image: '/안전케어 페이지 사진/4(출혈-최소화-&-드레인-관리).jpg',
  },
] as const;

const recoveryItems = [
  {
    number: '01',
    title: '통증 관리 프로토콜',
    image: '/안전케어 페이지 사진/5(통증관리-프로토콜).jpg',
  },
  {
    number: '02',
    title: '수술 직후 회복 과정',
    image: '/안전케어 페이지 사진/6(수술직후회복과정).jpg',
  },
  {
    number: '03',
    title: '수술 직후 상태 안내',
    image: '/안전케어 페이지 사진/7(수술-직후-상태안내).jpg',
  },
] as const;

const longtermItems = [
  {
    number: '01',
    title: '수술 후 정기 검진',
    image: '/안전케어 페이지 사진/8(수술-후-정기검진).jpg',
  },
  {
    number: '02',
    title: '보형물 관련 검사',
    image: '/안전케어 페이지 사진/9(보형물-관련-검사).jpg',
  },
  {
    number: '03',
    title: '응급 시 빠른 대응 체계',
    image: '/안전케어 페이지 사진/10(응급실-빠른-대처).jpg',
  },
] as const;

type TabId = typeof tabs[number]['id'];

export default function SafetyCarePage() {
  const [activeTab, setActiveTab] = useState<TabId>('prep');

  const activeTitle = useMemo(() => {
    switch (activeTab) {
      case 'prep':
        return '수술 안전 준비 시스템';
      case 'recovery':
        return '통증 관리 & 초기 회복 시스템';
      case 'longterm':
        return '장기적 안전 관리 시스템';
      default:
        return '수술 안전 준비 시스템';
    }
  }, [activeTab]);

  const activeItems = useMemo(() => {
    switch (activeTab) {
      case 'prep':
        return prepItems;
      case 'recovery':
        return recoveryItems;
      case 'longterm':
        return longtermItems;
      default:
        return prepItems;
    }
  }, [activeTab]);

  return (
    <>
      <Header />
      <main className="pt-[70px] md:pt-0 bg-[var(--paper)]">
        {/* Hero (Sway 스타일: 라운드 컨테이너) */}
        <section>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 pb-10">
            <div
              className="relative rounded-[28px] md:rounded-[50px] overflow-hidden border border-line bg-white"
              style={{ minHeight: 320, height: 'calc(100vh - 300px)', maxHeight: 460 }}
            >
              <Image
                src="/안전케어 페이지 사진/1(메인-상단).jpg"
                alt="엄나구모 안전 케어"
                fill
                className="object-cover object-center"
                quality={95}
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(248,246,243,0.10) 0%, rgba(0,0,0,0.32) 34%, rgba(0,0,0,0.40) 100%)',
                }}
              />

              <div className="relative z-10 h-full flex items-center">
                <div className="px-7 md:px-14 max-w-[780px]">
                  <p className="font-display text-[11px] md:text-[13px] tracking-[0.32em] uppercase font-medium text-white/80">
                    SAFETY &amp; CARE
                  </p>
                  <h1 className="text-[32px] md:text-[50px] font-semibold tracking-[-0.03em] text-white leading-[1.12] mt-5">
                    엄나구모 안전 케어
                  </h1>
                  <p className="text-[14px] md:text-[16px] text-white/85 leading-relaxed mt-6">
                    정교함을 완성하는 힘은 ‘안전’입니다.
                    <br />
                    20년 임상 경험으로 구축한 엄나구모 안전 시스템을 확인하세요.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-10">
                    <Link
                      href="http://pf.kakao.com/_QRNzxj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[var(--ink)] text-[14px] font-semibold tracking-wide
                        hover:shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition-shadow"
                    >
                      상담 예약 바로 가기
                    </Link>
                    <Link
                      href="/doctors"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/25 bg-white/10 text-white text-[14px] font-semibold tracking-wide
                        hover:bg-white/15 transition-colors"
                    >
                      의료진 소개 보기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs + Content */}
        <section className="pb-20 md:pb-28">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="rounded-[26px] md:rounded-[36px] border border-line bg-white overflow-hidden">
              <div className="p-7 md:p-10 border-b border-line bg-[var(--paper)]">
                <p className="text-[12px] tracking-[0.28em] uppercase font-medium text-[var(--navy)] mb-4">
                  SAFETY SYSTEM
                </p>
                <h2 className="text-[24px] md:text-[32px] font-semibold tracking-[-0.03em] text-[var(--ink)]">
                  {activeTitle}
                </h2>
                <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed mt-4">
                  수술 전·중·후 전 단계에서 리스크를 줄이고 회복을 돕는 표준화된 프로토콜을 운영합니다.
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3 mt-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 md:px-6 py-2.5 rounded-full text-[12px] md:text-[13px] font-semibold transition-all
                        ${activeTab === tab.id ? 'bg-[var(--navy)] text-white' : 'bg-white/70 text-[var(--ink)] border border-line hover:bg-white'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-7 md:p-10">
                <div className="grid md:grid-cols-3 gap-6">
                  {activeItems.map((item) => (
                    <article key={item.title} className="group rounded-[22px] border border-line bg-[var(--paper)] overflow-hidden">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          quality={95}
                          sizes="(min-width: 768px) 33vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" aria-hidden="true" />
                        <span className="absolute top-4 left-4 text-white font-display text-[20px] font-light">
                          {item.number}
                        </span>
                      </div>
                      <div className="p-6 bg-white border-t border-line">
                        <h3 className="text-[14px] md:text-[15px] font-semibold text-[var(--ink)]">
                          {item.title}
                        </h3>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-[18px] border border-line bg-[var(--paper)] p-6">
                  <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                    안전 시스템에 대해 더 자세히 상담이 필요하시면, 카카오톡으로 바로 문의하세요.
                  </p>
                  <Link
                    href="http://pf.kakao.com/_QRNzxj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[var(--navy)] text-white text-[13px] font-semibold tracking-wide
                      hover:shadow-[0_18px_45px_rgba(29,35,86,0.25)] transition-shadow"
                  >
                    안전 상담받기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
