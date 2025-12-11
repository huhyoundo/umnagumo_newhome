'use client';

import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

const tabs = [
  { id: 'prep', label: '수술 안전 준비 시스템' },
  { id: 'recovery', label: '통증 관리 & 초기 회복 시스템' },
  { id: 'longterm', label: '장기적 안전 관리 시스템' },
];

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
];

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
];

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
];

export default function SafetyCarePage() {
  const [activeTab, setActiveTab] = useState('prep');

  const getActiveItems = () => {
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
  };

  const getActiveTitle = () => {
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
  };

  return (
    <>
      <Header />
      <main className="pt-[70px] md:pt-0">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-[#3a3a3a]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/안전케어 페이지 사진/1(메인-상단).jpg"
              alt="안전케어"
              fill
              className="object-cover opacity-60"
              quality={100}
              sizes="100vw"
            />
          </div>
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[28px] md:text-[36px] lg:text-[42px] font-semibold text-white mb-4 tracking-[-0.02em]">
                  엄나구모 안전 케어
                </h1>
                <p className="text-[14px] md:text-[15px] text-white/80 leading-relaxed">
                  정교함을 완성하는 힘은 &apos;안전&apos;입니다.
                  <br />
                  20년 임상 경험으로 구축한 엄나구모 안전 시스템!
                </p>
              </div>
              <div className="hidden md:block">
                <div className="text-white/60 font-display text-[12px] tracking-wider">
                  UMNAGUMO<br />PLASTIC SURGERY
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="flex justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 md:px-10 py-5 text-[13px] md:text-[14px] font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'text-[#8B7355] border-[#8B7355]'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <h2 className="text-[22px] md:text-[28px] font-semibold text-[#2a2a2a] mb-12 text-center tracking-[-0.02em]">
              {getActiveTitle()}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {getActiveItems().map((item, index) => (
                <div key={index} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <span className="absolute top-4 left-4 z-10 text-white font-display text-[24px] font-light">
                      {item.number}
                    </span>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                  <div className="bg-[#8B7355] text-white py-3 px-4 text-center">
                    <h3 className="text-[14px] font-medium">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Second Category */}
        <section className="py-16 md:py-24 bg-[#f8f6f3]">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <h2 className="text-[22px] md:text-[28px] font-semibold text-[#2a2a2a] mb-12 text-center tracking-[-0.02em]">
              통증 관리 & 초기 회복 시스템
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {recoveryItems.map((item, index) => (
                <div key={index} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-gray-100">
                    <span className="absolute top-4 left-4 z-10 text-gray-700 font-display text-[24px] font-light">
                      {item.number}
                    </span>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                  <div className="bg-[#8B7355] text-white py-3 px-4 text-center">
                    <h3 className="text-[14px] font-medium">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Third Category */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <h2 className="text-[22px] md:text-[28px] font-semibold text-[#2a2a2a] mb-12 text-center tracking-[-0.02em]">
              장기적 안전 관리 시스템
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {longtermItems.map((item, index) => (
                <div key={index} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-gray-100">
                    <span className="absolute top-4 left-4 z-10 text-gray-700 font-display text-[24px] font-light">
                      {item.number}
                    </span>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                  <div className="bg-[#8B7355] text-white py-3 px-4 text-center">
                    <h3 className="text-[14px] font-medium">{item.title}</h3>
                  </div>
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
