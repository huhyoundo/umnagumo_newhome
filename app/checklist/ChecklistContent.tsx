'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FooterDeferred from '../components/deferred/FooterDeferred';
import Image from 'next/image';

// SVG Icons as components
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const StethoscopeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
    <circle cx="20" cy="10" r="2" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const HeartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const ScissorsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

const LayersIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const AlertIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accentColor?: string;
}

const AccordionSection = ({ title, icon, children, defaultOpen = false, accentColor = '#C9A86C' }: AccordionSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="accordion-section" style={{ '--accent': accentColor } as React.CSSProperties}>
      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="accordion-title-group">
          <span className="accordion-icon">{icon}</span>
          <h3>{title}</h3>
        </div>
        <span className={`accordion-chevron ${isOpen ? 'open' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <div className="accordion-inner">
          {children}
        </div>
      </div>

      <style jsx>{`
        .accordion-section {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(201, 168, 108, 0.15);
          border-radius: 16px;
          margin-bottom: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .accordion-section:hover {
          border-color: rgba(201, 168, 108, 0.3);
          box-shadow: 0 8px 32px rgba(201, 168, 108, 0.1);
        }

        .accordion-header {
          width: 100%;
          padding: 24px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .accordion-header:hover {
          background: rgba(201, 168, 108, 0.05);
        }

        .accordion-title-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .accordion-icon {
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: rgba(201, 168, 108, 0.1);
          border-radius: 12px;
        }

        .accordion-title-group h3 {
          font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #FAFAFA;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .accordion-chevron {
          color: var(--accent);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
        }

        .accordion-chevron.open {
          transform: rotate(180deg);
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .accordion-content.open {
          max-height: 2000px;
        }

        .accordion-inner {
          padding: 0 28px 28px;
        }
      `}</style>
    </div>
  );
};

interface InfoCardProps {
  title: string;
  pros?: string[];
  cons?: string[];
  recommendation?: string;
  highlight?: boolean;
}

const InfoCard = ({ title, pros = [], cons = [], recommendation, highlight = false }: InfoCardProps) => (
  <div className={`info-card ${highlight ? 'highlight' : ''}`}>
    <h4>{title}</h4>

    {pros.length > 0 && (
      <div className="pros-cons-section">
        <span className="section-label pros">장점</span>
        <ul className="list pros">
          {pros.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    )}

    {cons.length > 0 && (
      <div className="pros-cons-section">
        <span className="section-label cons">단점</span>
        <ul className="list cons">
          {cons.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    )}

    {recommendation && (
      <div className="recommendation">
        <span className="rec-label">추천 대상</span>
        <p>{recommendation}</p>
      </div>
    )}

    <style jsx>{`
      .info-card {
        background: linear-gradient(145deg, rgba(30, 30, 35, 0.8) 0%, rgba(25, 25, 30, 0.9) 100%);
        border: 1px solid rgba(201, 168, 108, 0.1);
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 16px;
        transition: all 0.3s ease;
      }

      .info-card:hover {
        border-color: rgba(201, 168, 108, 0.25);
        transform: translateY(-2px);
      }

      .info-card.highlight {
        border-color: rgba(201, 168, 108, 0.4);
        background: linear-gradient(145deg, rgba(201, 168, 108, 0.08) 0%, rgba(25, 25, 30, 0.95) 100%);
      }

      .info-card h4 {
        font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
        font-size: 1.1rem;
        font-weight: 600;
        color: #C9A86C;
        margin: 0 0 20px 0;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(201, 168, 108, 0.15);
      }

      .pros-cons-section {
        margin-bottom: 16px;
      }

      .section-label {
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 4px;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .section-label.pros {
        background: rgba(76, 175, 80, 0.15);
        color: #81C784;
      }

      .section-label.cons {
        background: rgba(244, 67, 54, 0.15);
        color: #E57373;
      }

      .list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .list li {
        position: relative;
        padding-left: 20px;
        margin-bottom: 8px;
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.85);
        line-height: 1.6;
      }

      .list li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 8px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }

      .list.pros li::before {
        background: #81C784;
      }

      .list.cons li::before {
        background: #E57373;
      }

      .recommendation {
        margin-top: 20px;
        padding: 16px;
        background: rgba(201, 168, 108, 0.08);
        border-radius: 8px;
        border-left: 3px solid #C9A86C;
      }

      .rec-label {
        display: block;
        font-size: 0.7rem;
        font-weight: 600;
        color: #C9A86C;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 6px;
      }

      .recommendation p {
        margin: 0;
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.95rem;
        line-height: 1.5;
      }
    `}</style>
  </div>
);

interface ComplicationCardProps {
  title: string;
  description: string;
  treatment?: string;
  severity?: 'normal' | 'acute' | 'chronic';
}

const ComplicationCard = ({ title, description, treatment, severity = 'normal' }: ComplicationCardProps) => (
  <div className={`complication-card ${severity}`}>
    <div className="card-header">
      <h4>{title}</h4>
      <span className="severity-badge">{severity === 'acute' ? '급성기' : '만성기'}</span>
    </div>
    <p className="description">{description}</p>
    {treatment && (
      <div className="treatment">
        <span className="treatment-label">치료 방법</span>
        <p>{treatment}</p>
      </div>
    )}

    <style jsx>{`
      .complication-card {
        background: linear-gradient(145deg, rgba(30, 30, 35, 0.8) 0%, rgba(25, 25, 30, 0.9) 100%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 16px;
        transition: all 0.3s ease;
      }

      .complication-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      }

      .complication-card.acute {
        border-left: 3px solid #FF8A65;
      }

      .complication-card.chronic {
        border-left: 3px solid #90CAF9;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .card-header h4 {
        font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
        font-size: 1.1rem;
        font-weight: 600;
        color: #FAFAFA;
        margin: 0;
      }

      .severity-badge {
        font-size: 0.7rem;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 12px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .acute .severity-badge {
        background: rgba(255, 138, 101, 0.2);
        color: #FF8A65;
      }

      .chronic .severity-badge {
        background: rgba(144, 202, 249, 0.2);
        color: #90CAF9;
      }

      .description {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.95rem;
        line-height: 1.7;
        margin: 0 0 16px 0;
      }

      .treatment {
        padding: 16px;
        background: rgba(201, 168, 108, 0.06);
        border-radius: 8px;
      }

      .treatment-label {
        display: block;
        font-size: 0.7rem;
        font-weight: 600;
        color: #C9A86C;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 8px;
      }

      .treatment p {
        margin: 0;
        color: rgba(255, 255, 255, 0.85);
        font-size: 0.9rem;
        line-height: 1.6;
      }
    `}</style>
  </div>
);

interface MotivaFeatureCardProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

const MotivaFeatureCard = ({ number, title, children }: MotivaFeatureCardProps) => (
  <div className="motiva-feature">
    <div className="feature-number">{number}</div>
    <div className="feature-content">
      <h4>{title}</h4>
      {children}
    </div>

    <style jsx>{`
      .motiva-feature {
        display: flex;
        gap: 20px;
        padding: 24px;
        background: linear-gradient(145deg, rgba(30, 30, 35, 0.6) 0%, rgba(25, 25, 30, 0.8) 100%);
        border: 1px solid rgba(201, 168, 108, 0.12);
        border-radius: 12px;
        margin-bottom: 16px;
        transition: all 0.3s ease;
      }

      .motiva-feature:hover {
        border-color: rgba(201, 168, 108, 0.3);
        transform: translateX(4px);
      }

      .feature-number {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #C9A86C 0%, #A08050 100%);
        border-radius: 10px;
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.25rem;
        font-weight: 600;
        color: #1A1A1F;
      }

      .feature-content h4 {
        font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
        font-size: 1.05rem;
        font-weight: 600;
        color: #C9A86C;
        margin: 0 0 12px 0;
      }

      .feature-content :global(p) {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.95rem;
        line-height: 1.7;
        margin: 0;
      }

      .feature-content :global(ul) {
        list-style: none;
        padding: 0;
        margin: 8px 0 0 0;
      }

      .feature-content :global(li) {
        position: relative;
        padding-left: 16px;
        margin-bottom: 6px;
        color: rgba(255, 255, 255, 0.75);
        font-size: 0.9rem;
      }

      .feature-content :global(li)::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #C9A86C;
        font-size: 0.8rem;
      }
    `}</style>
  </div>
);

export default function ChecklistContent() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <div className="surgery-guide">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-bg" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
            <div className="grid-pattern"></div>
          </div>

          <div className="hero-content">
            <div className="clinic-badge">
              <span>Dr. 남정현 원장</span>
            </div>

            <h1>
              <span className="hero-sub">철저한 준비와 관리</span>
              <span className="hero-main">가슴확대 수술</span>
              <span className="hero-accent">A to Z</span>
            </h1>

            <p className="hero-description">
              엄나구모 성형외과의 체계적인 수술 가이드로<br />
              안전하고 자연스러운 결과를 경험하세요
            </p>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">&lt;1%</span>
                <span className="stat-label">구형구축 발생률</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">FDA</span>
                <span className="stat-label">승인 보형물</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">10년</span>
                <span className="stat-label">보증 워런티</span>
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <span>스크롤하여 더 보기</span>
            <div className="scroll-line"></div>
          </div>
        </section>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-wrapper">

            {/* Section: 모티바 보형물 */}
            <AccordionSection
              title="모티바(Motiva) 프리미엄 보형물"
              icon={<HeartIcon />}
              defaultOpen={true}
            >
              <p className="section-intro">
                2024년 FDA 승인을 받은 모티바는 Establishment Labs에서 제조하는 프리미엄 보형물로,
                안정성과 자연스러움을 인정받고 있습니다.
              </p>

              <MotivaFeatureCard number="1" title="모양 (Shape)">
                <p>4가지 Projection 타입으로 개인 맞춤 선택이 가능합니다.</p>
                <ul>
                  <li>Mini – 가장 낮은 돌출감</li>
                  <li>Demi – 적당한 볼륨과 자연스러운 느낌</li>
                  <li>Full – 좀 더 볼륨감 있는 형태</li>
                  <li>Corse – 가장 높은 돌출감</li>
                </ul>
                <p style={{ marginTop: '12px' }}>
                  중력에 따라 움직이는 Ultima Gel로 누웠을 때, 기대었을 때, 서 있을 때 자연스러운 모양을 연출합니다.
                </p>
              </MotivaFeatureCard>

	              <MotivaFeatureCard number="2" title="촉감 (Texture)">
	                <p>
	                  탱탱하면서도 부드러운 탄력감을 가지며, &apos;찹쌀떡 같은 쫀득한 촉감&apos;으로 표현됩니다.
	                  Ergonomix® 보형물은 피부 아래서 자연스러운 움직임을 연출합니다.
	                </p>
	              </MotivaFeatureCard>

              <MotivaFeatureCard number="3" title="안정성 (Safety)">
                <ul>
                  <li>3.2μm Microtextured 표면으로 염증 및 이물반응 최소화</li>
                  <li>역형성 대세포 림프종(ALCL) 발생 위험 감소</li>
                  <li>6겹의 외피층과 Blue Seal 기술 적용</li>
                  <li>2024년 FDA 승인으로 안정성 검증</li>
                </ul>
              </MotivaFeatureCard>

              <MotivaFeatureCard number="4" title="워런티 (Warranty)">
                <p><strong>UDI 칩 미포함:</strong> 10년 내 파열 또는 3,4단계 구형구축 발생 시 보형물 무상 제공</p>
                <p style={{ marginTop: '8px' }}><strong>UDI 칩 포함:</strong> 기본 혜택 + 5년 내 발생 시 최대 300만원 재수술 비용 지원</p>
              </MotivaFeatureCard>
            </AccordionSection>

            {/* Section: 절개 방법 */}
            <AccordionSection
              title="절개 방법 선택 가이드"
              icon={<ScissorsIcon />}
            >
              <p className="section-intro">
                개인의 체형과 원하는 결과에 따라 최적의 절개 방법이 달라집니다.
              </p>

              <InfoCard
                title="겨드랑이 절개"
                highlight={true}
                pros={[
                  "흉터가 가슴 부위에 남지 않아 미용적으로 유리",
                  "겨드랑이 주름과 절개선이 겹쳐져 흉터가 잘 보이지 않음",
                  "부유방 제거가 필요한 경우 추가 절개 없이 함께 제거 가능",
                  "이상적인 밑선(UU라인) 형성에 유리"
                ]}
                cons={[
                  "내시경 수술 필수로 의료진의 숙련도가 중요",
                  "출혈 발생 시 지혈이 어려울 수 있음",
                  "수술 후 며칠간 팔 움직임 불편함 가능"
                ]}
                recommendation="흉터에 민감하고 자연스러운 결과를 원하는 분"
              />

              <InfoCard
                title="밑선 절개"
                pros={[
                  "수술 시야 확보가 용이하여 정밀도가 높음",
                  "출혈 발생 시 빠른 대처 가능",
                  "수축형 가슴(타이트한 가슴)에 적합"
                ]}
                cons={[
                  "가슴에 직접 절개선이 남을 수 있음",
                  "누웠을 때 흉터가 보일 수 있음"
                ]}
                recommendation="흉터에 크게 신경 쓰지 않고 안전하고 정밀한 수술을 원하는 분"
              />

              <InfoCard
                title="유륜 절개"
                pros={[
                  "특수한 경우(거상 수술, 심한 수축 가슴)에 효과적"
                ]}
                cons={[
                  "구형구축 발생률이 상대적으로 높음",
                  "절개 부위가 작아 시야 확보와 박리가 제한적"
                ]}
                recommendation="처진 가슴 리프팅이나 심한 수축 가슴 개선이 필요한 특수한 경우"
              />
            </AccordionSection>

            {/* Section: 보형물 삽입 위치 */}
            <AccordionSection
              title="보형물 삽입 위치"
              icon={<LayersIcon />}
            >
              <p className="section-intro">
                보형물을 어디에 위치할지는 개인의 체형, 유방조직의 두께, 원하는 가슴의 모양 등에 따라 달라집니다.
              </p>

              <div className="position-guide">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-8 bg-black/20">
                  <Image
                    src="/assets/fascia_illustration.png"
                    alt="보형물 삽입 위치 (근막 하)"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <InfoCard
                title="근막 하 (대흉근막 아래 삽입)"
                highlight={true}
                pros={[
                  "근육 손상이 없어 통증이 적고 회복이 빠름",
                  "가슴골을 더 모아줄 수 있어 선명한 볼륨감 형성",
                  "근육 압박이 없어 촉감이 더 부드러움",
                  "출산 후 처진 가슴의 윗가슴 볼륨 채우는 효과"
                ]}
                cons={[
                  "마른 체형에서 리플링 현상 발생 가능",
                  "보형물이 자리 잡는 데 시간 필요"
                ]}
                recommendation="통증이 적고 빠른 회복, 자연스러운 촉감을 원하는 분"
              />

              <InfoCard
                title="이중평면법 (Dual Plane)"
                pros={[
                  "마른 체형에서 보형물이 직접 만져지는 것 방지",
                  "구형구축 위험이 적어 장기적 모양 유지에 유리",
                  "근육이 보형물을 덮어 리플링 현상 감소"
                ]}
                cons={[
                  "근육 조작으로 통증이 크고 회복 기간이 길 수 있음",
                  "윗가슴 볼륨감이 다소 적을 수 있음",
                  "애니메이션 변형(근육 움직임 시 보형물 움직임) 가능"
                ]}
                recommendation="피부가 얇아 보형물이 비치는 것이 걱정되는 분"
              />

              <div className="deprecated-notice">
                <AlertIcon />
                <div>
                  <strong>유선 하 방식</strong>
                  <p>
                    감염 위험 증가, 리플링 현상, 구형구축 위험이 높아 현재는 거의 사용되지 않는 방법입니다.
                  </p>
                </div>
              </div>
            </AccordionSection>

            {/* Section: 합병증 */}
            <AccordionSection
              title="수술 후 합병증 안내"
              icon={<AlertIcon />}
            >
              <p className="section-intro">
                수술 후 시기별로 급성기(수술 당일~1개월)와 만성기(2~3개월 이후)로 나누어 합병증을 관리합니다.
              </p>

              <div className="complication-period">
                <h4 className="period-title acute">급성기 합병증 <span>수술 당일 ~ 1개월</span></h4>

                <ComplicationCard
                  title="출혈"
                  severity="acute"
                  description="혈압 상승이나 움직임으로 인해 지혈된 혈관이 다시 터지거나, 재생이 완전히 이루어지지 않은 혈관이 찢어지면서 발생합니다."
                  treatment="급격한 부풀어 오름은 다음날 수술적 지혈, 서서히 부풀어 오르는 경우는 5~7일 후 혈종 제거"
                />

                <ComplicationCard
                  title="감염"
                  severity="acute"
                  description="절개 부위 연조직염과 가슴방 안쪽 염증으로 나뉘며, 열감, 발적, 붓기, 통증 등의 증상이 수술 후 1~2주 사이에 나타납니다."
                  treatment="초기에는 항생제 정맥주사로 조절, 조절되지 않을 경우 절개 후 가슴방 세척"
                />
              </div>

              <div className="complication-period">
                <h4 className="period-title chronic">만성기 합병증 <span>2~3개월 이후</span></h4>

                <ComplicationCard
                  title="피막구축 (구형구축)"
                  severity="chronic"
                  description="보형물 주위 피막이 비정상적으로 수축하면서 보형물을 압박해 가슴이 딱딱해지거나 모양이 변형되고 통증이 생기는 현상입니다."
                  treatment="재수술로 두꺼워진 피막을 절제하고 가슴방을 새로 성형 (본원 발생률 1% 미만 관리)"
                />

                <ComplicationCard
                  title="장액종"
                  severity="chronic"
                  description="보형물 주변에 맑은 체액이 고이는 현상으로, 조직 손상, 출혈, 감염 또는 드물게 역형성 대세포 림프종(ALCL)과 연관될 수 있습니다."
                  treatment="대부분 자연 흡수되며, 양이 많으면 주사기 흡입. 세균 감염 의심 시 배양검사와 항생제 치료"
                />

                <ComplicationCard
                  title="보형물 위치 변이"
                  severity="chronic"
                  description="스무스 타입 보형물은 조직과의 유착이 적어 밑빠짐, 옆빠짐 문제가 발생할 수 있습니다."
                  treatment="엄나구모만의 특화된 수술법 적용 (2020년 학회지 논문 게재). 경미한 경우 피막 연부조직 매몰 봉합술, 심한 경우 전신마취 하 피막 전기소작술과 특수 봉합술로 교정"
                />
              </div>
            </AccordionSection>

            {/* CTA Section */}
            <section className="cta-section">
              <div className="cta-content">
                <h2>전문의 상담 예약</h2>
                <p>
                  개인의 신체 조건과 목표에 따라 최적의 수술 방법을 결정하는 것이<br />
                  수술 후 만족도를 높이는 가장 중요한 요소입니다.
                </p>
                <div className="cta-buttons">
                  <a href="http://pf.kakao.com/_QRNzxj" target="_blank" rel="noopener noreferrer" className="cta-button primary">
                    <span>카카오톡 상담하기</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </a>
                  <a href="tel:025126838" className="cta-button secondary">
                    02-512-6838
                  </a>
                </div>
              </div>
            </section>
          </div>
        </main>

        <FooterDeferred />

        <style jsx global>{`
          :root {
            --bg-dark: #111115;
            --bg-card: #1A1A1F;
            --text-main: #FAFAFA;
            --text-muted: rgba(255, 255, 255, 0.6);
            --accent: #C9A86C;
            --accent-glow: rgba(201, 168, 108, 0.3);
          }

          body {
            background-color: var(--bg-dark);
            color: var(--text-main);
          }
        `}</style>

        <style jsx>{`
          .surgery-guide {
            min-height: 100vh;
            background-color: var(--bg-dark);
            overflow-x: hidden;
            padding-top: 70px;
          }

          /* Hero */
          .hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 80px 20px;
            overflow: hidden;
          }
  
          /* Clinic Badge */
          .clinic-badge {
            display: inline-flex;
            align-items: center;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 100px;
            margin-bottom: 24px;
            position: relative;
            z-index: 10;
          }

          .clinic-badge span {
            font-size: 0.9rem;
            color: #C9A86C;
            font-weight: 600;
            letter-spacing: 0.05em;
          }

          /* Main Heading */
          h1 {
            display: block;
            margin-bottom: 32px;
            position: relative;
            z-index: 10;
          }

          .hero-sub {
            display: block;
            font-size: 1.5rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 12px;
            line-height: 1.4;
          }

          .hero-main {
            display: block;
            font-size: 4rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            background: linear-gradient(135deg, #FFFFFF 0%, #C0C0C0 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
            line-height: 1.2;
          }

          .hero-accent {
            display: block;
            font-size: 5rem;
            font-weight: 900;
            line-height: 1.1;
            background: linear-gradient(135deg, #FFD700 0%, #C9A86C 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: 'Montserrat', sans-serif;
          }

          .hero-description {
            font-size: 1.2rem;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 60px;
            position: relative;
            z-index: 10;
          }
          .scroll-indicator {
            position: absolute;
            bottom: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            opacity: 0.6;
            z-index: 20;
          }

          .scroll-indicator span {
            font-size: 0.8rem;
            letter-spacing: 0.1em;
            color: rgba(255, 255, 255, 0.8);
          }

          .scroll-line {
            width: 1px;
            height: 60px;
            background: linear-gradient(to bottom, #fff 0%, transparent 100%);
          }

          /* Main Content */
          .main-content {
            position: relative;
            z-index: 10;
            padding: 0 24px 100px;
          }

          .content-wrapper {
            max-width: 800px;
            margin: 0 auto;
          }

          .section-intro {
            font-size: 1.05rem;
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 32px;
            padding-left: 20px;
            border-left: 3px solid #C9A86C;
          }

          /* Position Guide (Image Area) */
          .position-guide {
            margin-bottom: 32px;
          }

          .deprecated-notice {
            display: flex;
            gap: 16px;
            margin-top: 32px;
            padding: 20px;
            background: rgba(244, 67, 54, 0.08);
            border: 1px solid rgba(244, 67, 54, 0.2);
            border-radius: 12px;
          }

          .deprecated-notice :global(svg) {
            color: #E57373;
            flex-shrink: 0;
          }

          .deprecated-notice strong {
            display: block;
            color: #E57373;
            margin-bottom: 4px;
          }

          .deprecated-notice p {
            margin: 0;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.5;
          }

          .complication-period {
            margin-bottom: 40px;
          }

          .period-title {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 1.25rem;
            color: #FAFAFA;
            margin: 0 0 20px 0;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .period-title span {
            font-size: 0.9rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.6);
          }

          .period-title.acute {
            color: #FF8A65;
          }

          .period-title.chronic {
            color: #90CAF9;
          }

          /* CTA Section */
          .cta-section {
            margin-top: 80px;
            padding: 60px 0;
            text-align: center;
          }

          .cta-content {
            padding: 40px;
            background: linear-gradient(145deg, rgba(201, 168, 108, 0.1) 0%, rgba(30, 30, 35, 0.9) 100%);
            border: 1px solid rgba(201, 168, 108, 0.3);
            border-radius: 20px;
            position: relative;
            overflow: hidden;
          }

          .cta-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #C9A86C, transparent);
          }

          .cta-content h2 {
            font-size: 2.5rem;
            color: #C9A86C;
            margin-bottom: 20px;
          }

          .cta-content p {
            font-size: 1.1rem;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 40px;
          }

          .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
          }

          .cta-button {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 16px 32px;
            border-radius: 100px;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .cta-button.primary {
            background: #FAE100;
            color: #371D1E;
          }

          .cta-button.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(250, 225, 0, 0.2);
          }

          .cta-button.secondary {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: #FAFAFA;
          }

          .cta-button.secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: #FAFAFA;
          }

          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, -20px); }
          }

          /* Responsive */
          @media (max-width: 768px) {
            .hero-main { font-size: 2.5rem; }
            .hero-accent { font-size: 3.5rem; }
            .hero-stats {
              flex-direction: column;
              gap: 20px;
            }
            .stat-divider { 
              width: 40px; 
              height: 1px; 
            }
            
            .position-guide :global(img) {
                object-fit: cover;
            }
          }
        `}</style>
      </div>
    </>
  );
}
