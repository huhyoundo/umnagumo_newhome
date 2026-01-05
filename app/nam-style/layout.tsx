import type { Metadata } from 'next';
import { Cormorant_Garamond, Noto_Serif_KR, Montserrat } from 'next/font/google';
import { SITE_NAME, createPageMetadata } from '../lib/seo';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    variable: '--font-cormorant',
    display: 'swap',
});

const notoSerifKR = Noto_Serif_KR({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600'],
    variable: '--font-noto-serif',
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600'],
    variable: '--font-montserrat',
    display: 'swap',
});

export const metadata: Metadata = {
    ...createPageMetadata({
        title: 'Internal Sculpting Breast',
        description: '체형·조직·원하는 이미지에 맞춘 보형물 선택과 라인 디자인으로 자연스러운 볼륨을 완성합니다.',
        path: '/nam-style',
    }),
    title: { absolute: `Internal Sculpting Breast | ${SITE_NAME}` },
};

export default function NamStyleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${cormorant.variable} ${notoSerifKR.variable} ${montserrat.variable} font-serif bg-[#0A0A0A] text-[#F8F6F3]`}>
            {children}
        </div>
    );
}
