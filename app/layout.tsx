import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "엄나구모 성형외과 | 강남 논현 가슴성형 전문",
  description: "강남 논현동 가슴성형 전문 엄나구모 성형외과, 자연스럽고 조화로운 가슴라인을 제공합니다.",
  keywords: "엄나구모 성형외과, 강남 가슴성형, 논현 가슴성형외과, 가슴성형 전문, 가슴확대 수술, 가슴재수술 잘하는 곳, 처진가슴 수술, 짝가슴 교정, 자연유방성형, 보형물 가슴성형, 모티바 가슴성형, 안전한 가슴성형",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "엄나구모 성형외과 | 강남 논현 가슴성형 전문",
    description: "강남 논현동 가슴성형 전문 엄나구모 성형외과. 맞춤 디자인과 풍부한 임상 경험을 바탕으로 자연스럽고 아름다운 가슴라인을 제공합니다.",
    url: "https://www.bust1.com/",
    siteName: "엄나구모 성형외과",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=wrifnr3bub"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
