import Image from '../components/SafeImage';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '../components/Header';
import FooterDeferred from '../components/deferred/FooterDeferred';
import { createPageMetadata } from '../lib/seo';
import ApprenticeshipValues from '../components/ApprenticeshipValues';

export const metadata: Metadata = createPageMetadata({
  title: '의료진 소개',
  description:
    '강남 논현 엄나구모 성형외과 의료진 소개. 축적된 경험과 전문적 기술로 가슴성형·가슴수술의 자연스러운 결과를 완성합니다.',
  path: '/doctors',
});

type TimelineItem = { year: string; text: string };

import { doctors } from '../data/doctors';

const japanTimeline: readonly TimelineItem[] = [
  { year: '1988년', text: '도쿄 우에노에\n나구모미용외과 개원\n나구모 요시노리 원장 창업' },
  { year: '1990년', text: '의료법인사단 나구모회\n나구모 클리닉 설립\n(도쿄 니시코단타)' },
  { year: '1994년', text: '오사카원 개원' },
  { year: '1995년', text: '후쿠오카원 개원\n유방전문의 자격 취득' },
  { year: '1999년', text: '도쿄원 오사키로 이전\n유방전용 검사장비 확충' },
  { year: '2009년', text: '나고야원 개원' },
  { year: '2012년', text: '삿포로원 개원' },
  { year: '2014년', text: '도쿄원 치요다구 산반초\n유방재건 센터로 이전' },

  { year: '현재', text: '4개원 운영\n(도쿄,나고야,오사카,후쿠오카)' },
];



const koreaTimeline: readonly TimelineItem[] = [
  { year: '1999년', text: '일본 교토대학교 의학박사\n박사과정학위 취득' },
  { year: '2000년', text: '일본 도쿄 나구모 클리닉\n한국인 최초 수석의사 임명' },
  { year: '2001년', text: '한국 성형외과 전문의 취득\n대한성형외과학회 정회원 등록\n대한미용성형외과학회 창립회원 등록' },
  { year: '2003년', text: '강남구 논현동 엄나구모성형외과\n개원' },
  { year: '2005년', text: '겨드랑이 절개 가슴수술\n특화 시스템 구축' },
  { year: '2009년', text: '유방성형 학술논문 발표' },
  { year: '2018년', text: '대한성형외과학회 유방성형연구회\n운영위원 위촉' },
  { year: '2020년', text: '유방성형 KCI 학술논문 저자 등재' },

];

function Timeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <div className="relative">
      <div className="absolute left-[10px] top-2 bottom-2 w-px bg-[var(--line)]" aria-hidden="true" />
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={`${item.year}-${index}`} className="relative pl-8">
            <span
              className="absolute left-[6px] top-[8px] w-[10px] h-[10px] rounded-full bg-[var(--navy)]/70 ring-4 ring-white"
              aria-hidden="true"
            />
            <div className="flex items-start gap-3">
              <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--navy)]/8 text-[var(--navy)] text-[12px] font-semibold">
                {item.year}
              </span>
              <p className="text-[13px] md:text-[14px] text-[var(--ink-muted)] leading-relaxed whitespace-pre-wrap py-1">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DoctorCard({
  role,
  name,
  image,
  credentials,
  namStyleLink,
  reverse = false,
}: {
  role: string;
  name: string;
  image: string;
  credentials: readonly string[];
  namStyleLink?: string;
  reverse?: boolean;
}) {
  return (
    <div className="rounded-[26px] md:rounded-[36px] border border-line bg-white overflow-hidden">
      <div className={`grid lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="relative bg-gradient-to-b from-[#f8f6f3] to-[#e6e2dc]">
          <div className="relative aspect-[4/5] md:aspect-[3/4]">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover mix-blend-multiply"

              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
        </div>
        <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
          <p className="text-[12px] tracking-[0.28em] uppercase font-medium text-[var(--navy)]">
            {role}
          </p>
          <h2 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.03em] text-[var(--ink)] mt-3">
            {name}
          </h2>
          <div className="w-10 h-[1px] bg-[var(--line)] mt-5" />

          <ul className="mt-7 space-y-3 text-[13px] md:text-[14px] text-[var(--ink-muted)] leading-relaxed mb-8">
            {credentials.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[var(--navy)]/70 shrink-0" aria-hidden="true" />
                <span>{c}</span>
              </li>
            ))}
          </ul>

          {namStyleLink && (
            <Link
              href={namStyleLink}
              className="inline-flex items-center self-start gap-4 px-6 py-3 rounded-full border border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962] hover:text-white transition-all duration-300 group"
            >
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-80 font-medium">Internal Sculpting</span>
                <span className="text-[14px] font-semibold tracking-[-0.03em]">남정현 스타일</span>
              </div>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center group-hover:bg-white/20">
                <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </span>
            </Link>
          )}
        </div>
      </div>
    </div >
  );
}

export default function DoctorsPage() {
  return (
    <>
      <Header />
      <main className="pt-[70px] md:pt-0 bg-[var(--paper)]">
        {/* Hero (Sway 스타일: 라운드 컨테이너) */}
        <section>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 pb-10">
            <div
              className="relative rounded-[28px] md:rounded-[50px] overflow-hidden border border-line bg-white"
              style={{ minHeight: 360, height: 'calc(100vh - 240px)', maxHeight: 520 }}
            >
              <Image
                src="/의료진 페이지 사진/1(메인-상단).jpg"
                alt="엄나구모 성형외과 의료진"
                fill
                className="object-cover object-center"
                priority

                sizes="100vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(248,246,243,0.98) 0%, rgba(248,246,243,0.95) 60%, rgba(248,246,243,0.85) 80%, rgba(248,246,243,0.4) 100%)',
                }}
              />

              <div className="relative z-10 h-full flex items-center">
                <div className="px-7 md:px-14 max-w-[740px]">
                  <p className="font-display text-[11px] md:text-[13px] tracking-[0.32em] uppercase font-medium text-[var(--navy)]">
                    DOCTORS
                  </p>
                  <h1 className="text-[34px] md:text-[52px] font-semibold tracking-[-0.03em] text-[var(--ink)] leading-[1.12] mt-5">
                    의료진 소개
                  </h1>
                  <p className="text-[14px] md:text-[16px] text-[var(--ink-muted)] leading-relaxed mt-6 break-keep whitespace-pre-wrap">
                    축적된 경험과 현대적 기술로 가장 자연스러운 아름다움을 실현합니다.<br />디자인·시술·회복까지 전 과정에서 한 분 한 분을 세심하게 돌보겠습니다.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-10">
                    <Link
                      href="http://pf.kakao.com/_QRNzxj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--navy)] text-white text-[14px] font-semibold tracking-wide
                        hover:shadow-[0_18px_45px_rgba(29,35,86,0.30)] transition-shadow"
                    >
                      상담 예약 바로 가기
                    </Link>
                    <Link
                      href="/before-after"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-line bg-white/70 backdrop-blur-sm text-[14px] font-semibold tracking-wide text-[var(--ink)]
                        hover:bg-white transition-colors"
                    >
                      전후사진 보기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="pb-6 md:pb-10">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="rounded-[22px] md:rounded-[30px] border border-line bg-white p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <p className="text-[12px] tracking-[0.28em] uppercase font-medium text-[var(--navy)] mb-4">
                    UMNAGUMO TEAM
                  </p>
                  <h2 className="text-[24px] md:text-[30px] font-semibold tracking-[-0.03em] text-[var(--ink)]">
                    엄나구모 의료진 소개
                  </h2>
                </div>
                <p className="text-[13px] md:text-[14px] text-[var(--ink-muted)] leading-relaxed max-w-[520px]">
                  체형 조건을 기반으로 한 정교한 디자인과 정확한 수술, 그리고 수술 이후의 모든 과정까지<br />엄나구모는 ‘결과의 완성’을 끝까지 책임집니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Doctor Cards */}
        <section className="py-10 md:py-14">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 space-y-8 md:space-y-12">
            {doctors.map((doctor, index) => (
              <DoctorCard key={doctor.name} {...doctor} reverse={index % 2 !== 0} />
            ))}
          </div>
        </section>

        {/* History */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-[12px] tracking-[0.28em] uppercase font-medium text-[var(--navy)] mb-4">
                  HERITAGE
                </p>
                <h2 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.03em] text-[var(--ink)]">
                  엄나구모의 역사
                </h2>
                <p className="text-[14px] text-[var(--ink-muted)] mt-4">
                  100년을 향하는 엄나구모의 기술과 철학
                  <br />
                  도제식 수련을 통해 정교한 술기를 전수합니다.
                </p>
              </div>
            </div>

            <div className="rounded-[26px] md:rounded-[36px] border border-line bg-[var(--paper)] overflow-hidden">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/의료진 페이지 사진/4.jpg"
                  alt="엄나구모의 역사"
                  fill
                  className="object-cover"

                  sizes="(min-width: 1024px) 1200px, 100vw"
                />
              </div>
            </div>

            <ApprenticeshipValues />

            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mt-10">
              <div className="rounded-[26px] border border-line bg-white p-8 md:p-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-[16px] md:text-[18px] font-semibold text-[var(--ink)]">
                      나구모클리닉(ナグモクリニック)<br className="block md:hidden" /> 연혁
                    </h3>
                    <p className="text-[13px] text-[var(--ink-muted)] mt-2">
                      창업 37년
                    </p>
                  </div>
                  <div className="relative w-[120px] h-[120px] shrink-0">
                    <Image
                      src="/의료진 페이지 사진/5(확인증).jpg"
                      alt="나구모 연혁"
                      fill
                      className="object-contain"

                      sizes="120px"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <Timeline items={japanTimeline} />
                  <p className="text-[14px] text-[var(--navy)] font-medium mt-6 text-center">
                    일본 유방전문 클리닉의 선두주자
                  </p>
                </div>
              </div>

              <div className="rounded-[26px] border border-line bg-white p-8 md:p-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-[16px] md:text-[18px] font-semibold text-[var(--ink)]">
                      엄나구모<br className="block md:hidden" />성형외과
                    </h3>
                    <p className="text-[13px] text-[var(--ink-muted)] mt-2">
                      2003-현재
                    </p>
                  </div>
                  <div className="relative w-[160px] h-[120px] shrink-0 rounded-[14px] overflow-hidden border border-line bg-[var(--paper)]">
                    <Image
                      src="/의료진 페이지 사진/6(병원사진).jpg"
                      alt="엄나구모 병원"
                      fill
                      className="object-cover"

                      sizes="160px"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <Timeline items={koreaTimeline} />
                  <p className="text-[14px] text-[var(--navy)] font-medium mt-6 text-center">
                    한국 유방전문 클리닉의 선두주자
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterDeferred />
    </>
  );
}
