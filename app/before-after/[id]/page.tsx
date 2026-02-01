
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import FooterDeferred from '../../components/deferred/FooterDeferred';
import Image from '../../components/SafeImage';
import Link from 'next/link';
import { legacyBreastGalleryItems } from '../../data/legacyBreastGallery';
import { SITE_NAME, SITE_URL } from '../../lib/seo';

// 1. Generate Static Params for SSG (Build all 27 pages statically)
export async function generateStaticParams() {
    return legacyBreastGalleryItems.map((item) => ({
        id: item.id.toString(),
    }));
}

// 2. Generate SEO Metadata dynamically
// 2. Generate SEO Metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const item = legacyBreastGalleryItems.find((i) => i.id.toString() === id);

    if (!item) {
        return {
            title: '페이지를 찾을 수 없습니다',
        };
    }

    const normalizedTitle = item.title.replace(/\n/g, ' ');
    const normalizedDescription = item.description.replace(/\n/g, ' ').trim();
    const pageTitle = `${normalizedTitle} | ${SITE_NAME}`;
    const canonicalUrl = new URL(`/before-after/${id}`, SITE_URL);
    const pageDescription = normalizedDescription
        ? `${normalizedDescription} - ${SITE_NAME} 가슴성형 전후사진 케이스 상세`
        : `${SITE_NAME} 가슴성형 전후사진 케이스 상세`;

    return {
        title: pageTitle,
        description: pageDescription,
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: canonicalUrl,
            siteName: SITE_NAME,
            locale: 'ko_KR',
            type: 'article',
            images: [item.image], // Using the preview image for OG share
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDescription,
            images: [item.image],
        },
    };
}

// 3. Page Component
export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = legacyBreastGalleryItems.find((i) => i.id.toString() === id);

    if (!item) {
        notFound();
    }

    return (
        <>
            <Header />
            <main className="pt-[70px] bg-[var(--paper)] min-h-screen">
                <article className="max-w-[1000px] mx-auto px-6 lg:px-10 py-12 md:py-20">
                    {/* Breadcrumb / Navigation */}
                    <div className="mb-8 flex items-center gap-2 text-[14px] text-[var(--ink-muted)]">
                        <Link href="/before-after" className="hover:text-[var(--navy)] transition-colors">
                            전후사진
                        </Link>
                        <span>&gt;</span>
                        <span className="font-semibold text-[var(--navy)]">Case {item.id}</span>
                    </div>

                    {/* Title Section */}
                    <div className="mb-10 text-center md:text-left">
                        <span className="inline-block px-3 py-1 rounded-full bg-[var(--navy)]/10 text-[var(--navy)] text-[13px] font-semibold mb-3">
                            {item.surgeryType === 'primary' ? '실리콘 가슴성형' : '가슴 재수술'}
                        </span>
                        <h1 className="text-[28px] md:text-[36px] font-semibold text-[var(--ink)] whitespace-pre-line leading-tight tracking-tight">
                            {item.title}
                        </h1>
                    </div>

                    {/* Image Section */}
                    <div className="relative rounded-[20px] md:rounded-[30px] overflow-hidden border border-line bg-white shadow-sm mb-12">
                        {/* Using the modal image if available for higher res, otherwise preview */}
                        <div className="relative aspect-[4/3] md:aspect-[16/10]">
                            <Image
                                src={item.modalImage || item.image}
                                alt={`${item.title} 상세 전후사진`}
                                fill
                                className="object-contain" // Changed to contain to show full image
                                quality={100}
                                priority
                            />
                        </div>
                    </div>

                    {/* Description / Content Section */}
                    <div className="bg-white rounded-[20px] p-8 md:p-12 border border-line shadow-sm">
                        <h2 className="text-[18px] font-semibold text-[var(--ink)] mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-[var(--gold)] rounded-full" />
                            수술 포인트
                        </h2>
                        <p className="text-[16px] text-gray-700 leading-relaxed whitespace-pre-line">
                            {item.description}
                        </p>

                        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="http://pf.kakao.com/_QRNzxj"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--navy)] text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                            >
                                비용/상담 문의하기
                            </Link>
                            <Link
                                href="/before-after"
                                className="inline-flex items-center justify-center px-8 py-3.5 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
                            >
                                목록으로 돌아가기
                            </Link>
                        </div>
                    </div>
                </article>
            </main>
            <FooterDeferred />
        </>
    );
}
