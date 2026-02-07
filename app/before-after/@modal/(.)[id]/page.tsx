
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from '../../../components/SafeImage';
import Modal from '../../../components/Modal';
import { legacyBreastGalleryItems } from '../../../data/legacyBreastGallery';

// 1. Generate Static Params for SSG (Build all 27 pages statically)
export async function generateStaticParams() {
    return legacyBreastGalleryItems.map((item) => ({
        id: item.id.toString(),
    }));
}

// 2. SEO Metadata (Optional for intercepted route, but good practice)
// 2. SEO Metadata (Optional for intercepted route, but good practice)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const item = legacyBreastGalleryItems.find((i) => i.id.toString() === id);

    if (!item) {
        return {
            title: '페이지를 찾을 수 없습니다',
            robots: { index: false, follow: false },
        };
    }

    return {
        title: `${item.title.replace(/\n/g, ' ')} | 엄나구모 성형외과`,
        description: item.description.replace(/\n/g, ' '),
        alternates: { canonical: `/before-after/${id}` },
        robots: { index: false, follow: true },
    };
}

export default async function CaseMetadataModal({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = legacyBreastGalleryItems.find((i) => i.id.toString() === id);

    if (!item) {
        notFound();
    }

    return (
        <Modal>
            <article className="px-6 pb-12 md:px-12 md:pb-16 bg-white">
                {/* Title Section */}
                <div className="mb-8 md:mb-10 text-center md:text-left pt-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-[var(--navy)]/10 text-[var(--navy)] text-[13px] font-semibold mb-3">
                        {item.surgeryType === 'primary' ? '실리콘 가슴성형' : '가슴 재수술'}
                    </span>
                    <h1 className="text-[24px] md:text-[32px] font-semibold text-[var(--ink)] whitespace-pre-line leading-tight tracking-tight">
                        {item.title}
                    </h1>
                    <p className="mt-2 text-[var(--ink-muted)] text-[14px]">Case {item.id}</p>
                </div>

                {/* Image Section */}
                <div className="relative rounded-[16px] md:rounded-[24px] overflow-hidden border border-line bg-gray-50 shadow-sm mb-10 w-full">
                    <div className="relative aspect-[4/3] md:aspect-[16/10] w-full">
                        {item.imageBefore && item.imageAfter ? (
                            <div className="absolute inset-0 flex w-full h-full">
                                <div className="relative w-1/2 h-full border-r border-white/10">
                                    <Image
                                        src={item.imageBefore}
                                        alt={`${item.title} 수술 전`}
                                        fill
                                        className="object-cover"
                                        quality={100}
                                        priority
                                    />
                                </div>
                                <div className="relative w-1/2 h-full">
                                    <Image
                                        src={item.imageAfter}
                                        alt={`${item.title} 수술 후`}
                                        fill
                                        className="object-cover"
                                        quality={100}
                                        priority
                                    />
                                </div>
                            </div>
                        ) : item.modalImage || item.image ? (
                            <Image
                                src={item.modalImage || item.image!}
                                alt={`${item.title} 상세 전후사진`}
                                fill
                                className="object-contain"
                                quality={100}
                                priority
                            />
                        ) : null}
                    </div>
                </div>

                {/* Description Section */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-[18px] font-semibold text-[var(--ink)] mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-[var(--gold)] rounded-full" />
                            수술 포인트
                        </h2>
                        <div className="bg-gray-50 rounded-[16px] p-6 border border-gray-100">
                            <p className="text-[16px] text-gray-700 leading-relaxed whitespace-pre-line">
                                {item.description}
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center pt-4">
                        <a
                            href="http://pf.kakao.com/_QRNzxj"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center px-10 py-4 bg-[var(--navy)] text-white rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[var(--navy)]/20"
                        >
                            비용/상담 문의하기
                        </a>
                    </div>
                </div>
            </article>
        </Modal>
    );
}
