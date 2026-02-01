import type { Metadata } from 'next';
import { SITE_DESCRIPTION, SITE_URL, createPageMetadata, generateBreadcrumbSchema, generateMedicalWebPageSchema } from '../../lib/seo';
import ChecklistContent from '../ChecklistContent';
import { getLocalNaverPostIndex, getNaverPostByLogNo } from '../naver';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { notFound, redirect } from 'next/navigation';

function extractTextSnippetFromHtml(html: string, maxLength: number) {
  const text = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return null;
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

export async function generateStaticParams() {
  const rootLogNo = process.env.NAVER_LOG_NO ?? '223849151079';
  const localIndex = await getLocalNaverPostIndex();
  return localIndex
    .map((entry) => entry.logNo)
    .filter((logNo) => logNo !== rootLogNo)
    .map((logNo) => ({ logNo }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ logNo: string }>;
}): Promise<Metadata> {
  const { logNo } = await params;
  const rootLogNo = process.env.NAVER_LOG_NO ?? '223849151079';

  if (logNo === rootLogNo) {
    return createPageMetadata({
      title: '강남 가슴확대 수술 체크리스트 A to Z',
      path: '/checklist',
    });
  }

  const post = await getNaverPostByLogNo(logNo);
  const snippet = post?.html ? extractTextSnippetFromHtml(post.html, 160) : null;

  return createPageMetadata({
    title: post?.title ?? '체크리스트',
    description: snippet ?? (post?.title ? post.title : undefined),
    path: `/checklist/${logNo}`,
  });
}

export default async function ChecklistPostPage({ params }: { params: Promise<{ logNo: string }> }) {
  const { logNo } = await params;
  const rootLogNo = process.env.NAVER_LOG_NO ?? '223849151079';
  if (logNo === rootLogNo) redirect('/checklist');

  const naverPost = await getNaverPostByLogNo(logNo);
  if (!naverPost) notFound();

  const title = naverPost.title ?? '체크리스트';
  const description = extractTextSnippetFromHtml(naverPost.html, 160) ?? SITE_DESCRIPTION;

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: '홈', url: '/' },
    { name: '체크리스트', url: '/checklist' },
    { name: title, url: `/checklist/${logNo}` },
  ]);

  const medicalLd = generateMedicalWebPageSchema(title, description, `${SITE_URL}/checklist/${logNo}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbLd, medicalLd]) }}
      />
      <Header />
      <main className="pt-[100px] min-h-screen bg-[var(--paper)]">
        <div className="max-w-[1000px] mx-auto px-5 lg:px-0 pb-20 checklist-content-reset">
          <ChecklistContent naverPost={naverPost} />
        </div>
      </main>
      <Footer />
    </>
  );
}
