import type { Metadata } from 'next';
import { createPageMetadata, generateMedicalWebPageSchema, generateBreadcrumbSchema, generateFaqSchema } from '../lib/seo';
import ChecklistContent from './ChecklistContent';
import { getNaverPostByLogNo } from './naver';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export const metadata: Metadata = createPageMetadata({
  title: '강남 가슴확대 수술 체크리스트 A to Z',
  description:
    '강남 논현 엄나구모 성형외과 가슴수술 체크리스트. 가슴확대(가슴성형) 보형물 선택, 절개 방법(겨드랑이/밑선/유륜) 비교, 근막하 vs 이중평면 삽입 위치, 수술 후 관리까지 A to Z.',
  path: '/checklist',
});

const breadcrumbLd = generateBreadcrumbSchema([
  { name: '홈', url: '/' },
  { name: '가슴수술 체크리스트', url: '/checklist' },
]);

const medicalLd = generateMedicalWebPageSchema(
  '강남 가슴확대 수술 체크리스트 A to Z | 엄나구모 성형외과',
  '엄나구모 성형외과의 가슴수술 체크리스트. 가슴확대(가슴성형) 보형물, 절개 방법, 삽입 위치, 수술 후 관리 등 핵심 포인트를 정리했습니다.',
  'https://www.bust1.com/checklist'
);

const CHECKLIST_FAQS = [
  {
    question: '강남 가슴성형(가슴확대) 상담에서 꼭 확인할 체크리스트는?',
    answer:
      '체형/피부 탄력, 보형물 종류와 크기, 절개 위치(겨드랑이·밑선·유륜), 삽입 위치(근막하·이중평면), 회복 일정과 주의사항 등은 상담에서 상세히 확인하는 것이 좋습니다.',
  },
  {
    question: '가슴확대 수술 절개 방법(겨드랑이/밑선/유륜)은 어떻게 선택하나요?',
    answer:
      '흉터 선호도, 기존 유방 형태, 피부·조직 상태, 수술 계획에 따라 달라질 수 있어 의료진과 충분히 상의해 결정합니다.',
  },
  {
    question: '근막하 vs 이중평면 삽입 위치의 차이는 무엇인가요?',
    answer: '둘 다 장단점이 있으며, 조직 두께·흉곽·원하는 라인 등에 따라 적합한 방법이 달라질 수 있습니다.',
  },
  {
    question: '처진가슴(가슴거상)이나 가슴재수술도 체크리스트가 다른가요?',
    answer:
      '네. 처진 정도, 유두·유륜 위치, 기존 수술 이력, 피막/조직 상태 등 추가로 평가할 항목이 늘어나기 때문에 진단과 계획이 더 중요합니다.',
  },
] as const;

const faqLd = generateFaqSchema(CHECKLIST_FAQS);

export default async function ChecklistPage() {
  const rootLogNo = process.env.NAVER_LOG_NO ?? '223849151079';
  const naverPost = await getNaverPostByLogNo(rootLogNo);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbLd, medicalLd, faqLd]) }}
      />
      <Header />
      <main className="pt-[100px] min-h-screen bg-[var(--paper)]">
        <div className="max-w-[1000px] mx-auto px-5 lg:px-0 pb-20">
          <ChecklistContent naverPost={naverPost} />

          <section className="mx-auto max-w-4xl px-4 pb-12 md:px-0">
            <h2 className="text-[20px] md:text-[24px] font-semibold text-[var(--ink)] tracking-[-0.02em]">
              가슴수술 체크리스트 FAQ
            </h2>
            <dl className="mt-6 space-y-5">
              {CHECKLIST_FAQS.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-line bg-white px-6 py-5">
                  <dt className="text-[15px] md:text-[16px] font-semibold text-[var(--ink)]">{faq.question}</dt>
                  <dd className="mt-2 text-[14px] md:text-[15px] leading-relaxed text-[var(--ink-muted)]">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-2">
              <Link
                href="/breast-augmentation"
                className="rounded-full border border-line bg-white px-4 py-2 text-[13px] md:text-[14px] text-[var(--ink)] hover:border-[var(--navy)]/40 hover:text-[var(--navy)] transition-colors"
              >
                강남 가슴확대(가슴성형)
              </Link>
              <Link
                href="/breast-revision"
                className="rounded-full border border-line bg-white px-4 py-2 text-[13px] md:text-[14px] text-[var(--ink)] hover:border-[var(--navy)]/40 hover:text-[var(--navy)] transition-colors"
              >
                가슴재수술
              </Link>
              <Link
                href="/reduction-lift"
                className="rounded-full border border-line bg-white px-4 py-2 text-[13px] md:text-[14px] text-[var(--ink)] hover:border-[var(--navy)]/40 hover:text-[var(--navy)] transition-colors"
              >
                가슴거상·처진가슴 교정
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
