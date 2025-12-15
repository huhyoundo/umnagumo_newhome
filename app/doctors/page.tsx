import Image from '../components/SafeImage';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '의료진 소개',
  description: '엄나구모 성형외과 의료진 소개. 축적된 경험과 전문적 기술로 가장 자연스러운 아름다움을 완성합니다.',
  path: '/doctors',
});

type TimelineItem = { year: string; text: string };

const doctors = [
  {
    role: '성형외과전문의',
    name: '엄순천 대표원장',
    image: '/의료진 페이지 사진/2(대표원장님).jpg',
    credentials: [
      '순천향대학교 의과대학 졸업',
      '일본 교토대학교 부속병원 성형외과 전공의 수련',
      '일본 교토대학교 의학부 의학연구과 의과학박사',
      '일본 도쿄 가슴전문 나구모 클리닉 수석의사',
      '한국 성형외과 전문의 취득',
      '대한 성형외과의사 정회원',
      '대한 성형외과의사시험 정회원',
      '미간 미용성형외과학회 정회원',
      '대한 성형외과학회 정회원',
      '대한 미용성형외과학회 정회원',
      '대한 성형외과 유방성형연구회 학술위원',
    ],
  },
  {
    role: '성형외과전문의',
    name: '남정현 원장',
    image: '/의료진 페이지 사진/3(남정현-원장님).jpg',
    credentials: [
      '순천향대학교 의과대학 졸업',
      '순천향대학병원 성형외과 전문의',
      '순천향대학교 대학원 성형외과학 석사',
      '대한 성형외과의사 정회원',
      '대한 성형외과학회 정회원',
      '대한 미용성형외과학회 정회원',
    ],
  },
] as const;

const japanTimeline: readonly TimelineItem[] = [
  { year: '1903년', text: '일본 나구모 의학 가문 창립, 도쿄의 의학교육 시작' },
  { year: '1920년', text: '나구모 가문 2대, 외과 전문의로 확립' },
  { year: '1945년', text: '전후 재건성형외과 봉사 개척' },
  { year: '1960년', text: '나구모 가문 3대, 일본 최초 가슴전문 외과 출범' },
  { year: '1975년', text: '도쿄 나구모 클리닉 본원 설립' },
  { year: '1985년', text: '나고야, 오사카 분원 개원' },
  { year: '1995년', text: '후쿠오카 분원 개원, 일본 4대 도시 네트워크 완성' },
  { year: '2000년', text: '가슴재수술 5,000례 돌파' },
  { year: '2010년', text: '가슴재수술 10,000례 돌파' },
];

const koreaTimeline: readonly TimelineItem[] = [
  { year: '2008년', text: '엄순천 원장, 일본 교토대학교 의학박사 박사과정학위 취득' },
  { year: '2009년', text: '일본 도쿄 나구모 클리닉 수석의사 임명' },
  { year: '2010년', text: '나구모 클리닉 한국인 최초 수석의사, 12년간 도쿄와 교육 활동 계속' },
  { year: '2012년', text: '한국 성형외과 전문의 취득' },
  { year: '2013년', text: '서울 강남 논현동 엄나구모성형외과 개원' },
  { year: '2014년', text: '가슴성형 500례 달성' },
  { year: '2015년', text: '대한성형외과학회 정회원 등록' },
  { year: '2016년', text: '가슴성형 1,000례 돌파' },
  { year: '2017년', text: '겨드랑이 절개 가슴수술 특화 시스템 구축' },
  { year: '2018년', text: '가슴성형 2,000례 달성' },
  { year: '2019년', text: '대한미용성형외과학회 창립회원 등록' },
  { year: '2020년', text: '비대면 온라인 상담 시스템 도입' },
  { year: '2021년', text: '가슴성형 3,000례 돌파' },
  { year: '2022년', text: '3D 가슴성형 시뮬레이션 도입' },
  { year: '2023년', text: '엄나구모 10주년, 가슴성형 4,000례 돌파' },
  { year: '2024년', text: '12년간 전통 계승 기념 학술 심포지엄 개최' },
  { year: '2025년', text: '현재 - 한국 대표 가슴성형 전문 클리닉으로 자리매김' },
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
            <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--navy)]/8 text-[var(--navy)] text-[12px] font-semibold">
                {item.year}
              </span>
              <p className="text-[13px] md:text-[14px] text-[var(--ink-muted)] leading-relaxed">
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
  reverse = false,
}: {
  role: string;
  name: string;
  image: string;
  credentials: readonly string[];
  reverse?: boolean;
}) {
  return (
    <div className="rounded-[26px] md:rounded-[36px] border border-line bg-white overflow-hidden">
      <div className={`grid lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="relative bg-[var(--paper)]">
          <div className="relative aspect-[4/5] md:aspect-[3/4]">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              quality={100}
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
        </div>
        <div className="p-8 md:p-10 lg:p-12">
          <p className="text-[12px] tracking-[0.28em] uppercase font-medium text-[var(--navy)]">
            {role}
          </p>
          <h2 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.03em] text-[var(--ink)] mt-3">
            {name}
          </h2>
          <div className="w-10 h-[1px] bg-[var(--line)] mt-5" />

          <ul className="mt-7 space-y-3 text-[13px] md:text-[14px] text-[var(--ink-muted)] leading-relaxed">
            {credentials.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[var(--navy)]/70 shrink-0" aria-hidden="true" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
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
                quality={95}
                sizes="100vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(248,246,243,0.96) 0%, rgba(248,246,243,0.82) 48%, rgba(248,246,243,0.35) 72%, rgba(29,35,86,0.08) 100%)',
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
                  <p className="text-[14px] md:text-[16px] text-[var(--ink-muted)] leading-relaxed mt-6">
                    축적된 경험과 현대적 기술로 가장 자연스러운 아름다움을 실현합니다.
                    <br />
                    디자인·시술·회복까지 전 과정에서 한 분 한 분을 세심하게 돌보겠습니다.
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
                  체형 조건을 기반으로 한 정교한 디자인과 정확한 수술, 그리고 수술 이후의 모든 과정까지.
                  엄나구모는 ‘결과의 완성’을 끝까지 책임집니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Doctor Cards */}
        <section className="py-10 md:py-14">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 space-y-8 md:space-y-12">
            <DoctorCard {...doctors[0]} />
            <DoctorCard {...doctors[1]} reverse />
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
                  quality={95}
                  sizes="(min-width: 1024px) 1200px, 100vw"
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mt-10">
              <div className="rounded-[26px] border border-line bg-white p-8 md:p-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-[16px] md:text-[18px] font-semibold text-[var(--ink)]">
                      일본 나구모 의학 가문
                    </h3>
                    <p className="text-[13px] text-[var(--ink-muted)] mt-2">
                      1903-현재
                    </p>
                  </div>
                  <div className="relative w-[120px] h-[120px] shrink-0">
                    <Image
                      src="/의료진 페이지 사진/5(확인증).jpg"
                      alt="나구모 의학 가문 확인증"
                      fill
                      className="object-contain"
                      quality={95}
                      sizes="120px"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <Timeline items={japanTimeline} />
                </div>
              </div>

              <div className="rounded-[26px] border border-line bg-white p-8 md:p-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-[16px] md:text-[18px] font-semibold text-[var(--ink)]">
                      한국 엄나구모성형외과
                    </h3>
                    <p className="text-[13px] text-[var(--ink-muted)] mt-2">
                      2008-현재
                    </p>
                  </div>
                  <div className="relative w-[160px] h-[120px] shrink-0 rounded-[14px] overflow-hidden border border-line bg-[var(--paper)]">
                    <Image
                      src="/의료진 페이지 사진/6(병원사진).jpg"
                      alt="엄나구모 병원"
                      fill
                      className="object-cover"
                      quality={95}
                      sizes="160px"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <Timeline items={koreaTimeline} />
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
