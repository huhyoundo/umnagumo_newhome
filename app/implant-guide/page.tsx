import Image from '../components/SafeImage';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '보형물 가이드',
  description: '가슴의 본질을 결정하는 보형물 선택. 20년 임상 경험으로 가장 안전하고 정확한 기준을 제시합니다.',
  path: '/implant-guide',
});

const implantComparison = [
  { label: '핵심 느낌', motiva: '부드럽고 자연스러운 촉감', boost: '균형 잡힌 탄력 & 안정감', xtra: '확실한 볼륨·탄탄한 형태' },
  { label: '적합한 체형', motiva: '피부 얇음', boost: '보통 체형', xtra: '피부 두꺼움·근육형' },
  { label: '원하는 스타일', motiva: '자연스러움', boost: '무난한 중간 볼륨', xtra: '또렷한 라인·글래머러스' },
  { label: '촉감', motiva: '가장 부드러움', boost: '중간', xtra: '탄력 지지력 가장 높음' },
  { label: '재수술 적합도', motiva: '구축 위험 낮음', boost: '보통', xtra: '매우 안정적' },
  { label: '추천 대상', motiva: '부드럽고 자연스러운\n볼륨을 원하는 분', boost: '탄력과 안정감을\n균형 있게 원하는 분', xtra: '선명한 라인과\n탄탄한 볼륨감을 원하는 분' },
] as const;

const implantDetails = [
  {
    title: '모티바',
    subtitle: '(Motiva)',
    image: '/보형물 가이드 페이지 사진/모티바.png',
    paragraphs: [
      '모티바 보형물은 인체의 움직임에 따라 자연스럽게 형태가 변하도록 설계된 유동형 보형물입니다. 누워 있을 때는 완만하게 퍼지고, 서 있을 때는 물방울 형태로 모양이 잡혀 실제 가슴과 유사한 자연스러운 실루엣을 만들어냅니다.',
      '보형물 내부 젤은 매우 부드럽고 신축성이 뛰어나 촉감이 자연스러우며, 피부가 얇은 분들도 경계가 없이 편안한 결과를 기대하실 수 있습니다.',
      '또한 6겹 외피 구조와 블루씰(BlueSeal) 기술이 적용되어 젤 누출과 구형 구축의 발생 가능성을 낮추는 데 도움을 줍니다.',
    ],
  },
  {
    title: '멘토 부스트',
    subtitle: '(Mentor MemoryGel BOOST)',
    image: '/보형물 가이드 페이지 사진/멘토부스트.png',
    paragraphs: [
      '멘토 부스트 보형물은 자연스러움과 형태 유지력의 균형이 뛰어난 제품입니다. 기존 멘토 젤보다 탄성과 응집력이 높아 조물거리거나 지나치게 단단하지 않으며, 가슴 보형물이 자연스럽게 놓이는 것이 특징입니다.',
      '또한 일상 활동이 많은 분들도 형태가 안정적으로 유지되며, 부드러움과 적당한 탄탄함 사이의 밸런스를 원하는 분들께 특히 잘 맞는 보형물입니다.',
    ],
  },
  {
    title: '멘토 엑스트라무스',
    subtitle: '(Mentor MemoryGel Xtra)',
    image: '/보형물 가이드 페이지 사진/멘토엑스트라무스.png',
    paragraphs: [
      '멘토 엑스트라무스 보형물은 선명한 볼륨과 뛰어난 형태 유지력이 가장 큰 장점인 제품입니다. 고강도 응집력 젤을 적용해 가슴 전체 라인을 탄탄하게 지지하며, 움직임이 많아도 모양이 쉽게 흐트러지지 않습니다.',
      '특히 둥기능 볼륨 표현이 무결해 드레스나 비키니 착용 시 라인이 예쁘게 살아나는 보형물이며, 조직이 부족하거나 탄력이 약한 경우에도 형태를 안정적으로 잡아주는 점을 갖고 있습니다.',
    ],
  },
] as const;

const safetyCards = [
  {
    title: '보형물 삽입 후에도',
    description: '초음파·맘모그래피·MRI 등\n모든 유방 검진이 가능합니다.',
    image: '/보형물 가이드 페이지 사진/6(초음파 검사).jpg',
  },
  {
    title: '보형물은 유방암 검사에',
    description: '장애가 되지 않으며\n수유 및 아기 건강에도 영향이 없습니다.',
    image: '/보형물 가이드 페이지 사진/7(유방암검사).jpg',
  },
  {
    title: '파손 여부는 초음파로 확인하며',
    description: '필요 시 MRI로 정밀 진단이 가능합니다.',
    image: '/보형물 가이드 페이지 사진/8(MRI정밀진단).jpg',
  },
] as const;

export default function ImplantGuidePage() {
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
                src="/보형물 가이드 페이지 사진/1(메인_상단).jpg"
                alt="보형물 가이드"
                fill
                className="object-cover object-center"
                quality={95}
                priority
                sizes="100vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(248,246,243,0.96) 0%, rgba(248,246,243,0.84) 52%, rgba(248,246,243,0.26) 74%, rgba(29,35,86,0.10) 100%)',
                }}
              />

              <div className="relative z-10 h-full flex items-center">
                <div className="px-7 md:px-14 max-w-[760px]">
                  <p className="font-display text-[11px] md:text-[13px] tracking-[0.32em] uppercase font-medium text-[var(--navy)]">
                    IMPLANT GUIDE
                  </p>
                  <h1 className="text-[32px] md:text-[50px] font-semibold tracking-[-0.03em] text-[var(--ink)] leading-[1.12] mt-5">
                    가슴의 본질을 결정하는
                    <br />
                    보형물 선택
                  </h1>
                  <p className="text-[14px] md:text-[16px] text-[var(--ink-muted)] leading-relaxed mt-6">
                    20년 임상 경험으로 가장 안전하고 정확한 기준을 제시합니다.
                    <br />
                    체형·조직·촉감까지 고려한 맞춤 보형물 솔루션!
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

        {/* Comparison */}
        <section className="pb-12 md:pb-16">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <p className="text-[12px] tracking-[0.28em] uppercase font-medium text-[var(--navy)] mb-4">
                  COMPARISON
                </p>
                <h2 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.03em] text-[var(--ink)]">
                  보형물 비교표
                </h2>
                <p className="text-[14px] text-[var(--ink-muted)] mt-4">
                  체형과 원하는 촉감/라인에 맞춰 선택할 수 있도록 정리했습니다.
                </p>
              </div>
            </div>

            <div className="rounded-[26px] md:rounded-[36px] border border-line bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[720px]">
                  <thead>
                    <tr className="bg-[var(--paper)]">
                      <th className="py-4 px-4 text-left"></th>
                      <th className="py-4 px-4">
                        <div className="flex justify-center">
                          <Image src="/보형물 가이드 페이지 사진/모티바.png" alt="모티바" width={120} height={80} className="object-contain" quality={95} />
                        </div>
                      </th>
                      <th className="py-4 px-4">
                        <div className="flex justify-center">
                          <Image src="/보형물 가이드 페이지 사진/멘토부스트.png" alt="멘토 부스트" width={120} height={80} className="object-contain" quality={95} />
                        </div>
                      </th>
                      <th className="py-4 px-4">
                        <div className="flex justify-center">
                          <Image src="/보형물 가이드 페이지 사진/멘토엑스트라무스.png" alt="멘토 엑스트라무스" width={120} height={80} className="object-contain" quality={95} />
                        </div>
                      </th>
                    </tr>
                    <tr className="border-b-2 border-[rgba(29,35,86,0.22)]">
                      <th className="py-5 px-4 text-left text-[13px] md:text-[14px] font-semibold text-[var(--ink)] w-[140px]"></th>
                      <th className="py-5 px-4 text-center text-[13px] md:text-[14px] font-semibold text-[var(--ink)]">
                        모티바
                        <div className="font-normal text-[var(--ink-muted)]">(Motiva)</div>
                      </th>
                      <th className="py-5 px-4 text-center text-[13px] md:text-[14px] font-semibold text-[var(--ink)]">
                        멘토 부스트
                        <div className="font-normal text-[var(--ink-muted)]">(Mentor BOOST)</div>
                      </th>
                      <th className="py-5 px-4 text-center text-[13px] md:text-[14px] font-semibold text-[var(--ink)]">
                        멘토 엑스트라무스
                        <div className="font-normal text-[var(--ink-muted)]">(Mentor Xtra)</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {implantComparison.map((row, index) => (
                      <tr key={index} className="border-b border-line">
                        <td className="py-4 px-4 text-[12px] md:text-[13px] font-semibold text-[var(--ink)] bg-[var(--paper)] whitespace-nowrap">
                          {row.label}
                        </td>
                        <td className="py-4 px-4 text-[11px] md:text-[12px] text-[var(--ink-muted)] text-center whitespace-pre-line">
                          {row.motiva}
                        </td>
                        <td className="py-4 px-4 text-[11px] md:text-[12px] text-[var(--ink-muted)] text-center whitespace-pre-line">
                          {row.boost}
                        </td>
                        <td className="py-4 px-4 text-[11px] md:text-[12px] text-[var(--ink-muted)] text-center whitespace-pre-line">
                          {row.xtra}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Implant details */}
        <section className="pb-16 md:pb-20">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-3 gap-6">
              {implantDetails.map((implant) => (
                <article key={implant.title} className="rounded-[26px] border border-line bg-white p-8 md:p-9">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--paper)] border border-line flex items-center justify-center">
                      <Image src={implant.image} alt={implant.title} width={56} height={40} className="object-contain" quality={95} />
                    </div>
                    <div>
                      <h3 className="text-[18px] md:text-[20px] font-semibold text-[var(--ink)] tracking-[-0.02em]">
                        {implant.title}
                      </h3>
                      <p className="text-[12px] text-[var(--ink-muted)] mt-1">{implant.subtitle}</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {implant.paragraphs.map((p) => (
                      <p key={p} className="text-[12px] md:text-[13px] text-[var(--ink-muted)] leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Safety */}
        <section className="py-16 md:py-20 bg-white border-t border-line">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="text-center mb-10">
              <p className="text-[12px] tracking-[0.28em] uppercase font-medium text-[var(--navy)] mb-4">
                SAFETY CHECK
              </p>
              <h2 className="text-[26px] md:text-[34px] font-semibold tracking-[-0.03em] text-[var(--ink)]">
                보형물 안전성 · 검진 안내
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {safetyCards.map((card) => (
                <div key={card.title} className="rounded-[26px] border border-line bg-[var(--paper)] overflow-hidden">
                  <div className="relative aspect-square">
                    <Image src={card.image} alt={card.title} fill className="object-contain p-8" quality={95} sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                  <div className="p-7 bg-white border-t border-line">
                    <h3 className="text-[14px] md:text-[15px] font-semibold text-[var(--ink)]">
                      {card.title}
                    </h3>
                    <p className="text-[12px] md:text-[13px] text-[var(--ink-muted)] leading-relaxed whitespace-pre-line mt-3">
                      {card.description}
                    </p>
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
