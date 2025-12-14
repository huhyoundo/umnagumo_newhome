import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import FloatingContactButton from "./components/FloatingContactButton";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./lib/seo";

const NAVER_SITE_VERIFICATION = process.env.NAVER_SITE_VERIFICATION;

export const viewport: Viewport = {
  themeColor: "#1f4d5a",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "엄나구모 성형외과 | 강남 논현 가슴성형 전문",
    template: "%s | 엄나구모 성형외과",
  },
  description: SITE_DESCRIPTION,
  keywords: "엄나구모 성형외과, 강남 가슴성형, 논현 가슴성형외과, 가슴성형 전문, 가슴확대 수술, 가슴재수술 잘하는 곳, 처진가슴 수술, 짝가슴 교정, 자연유방성형, 보형물 가슴성형, 모티바 가슴성형, 안전한 가슴성형",
  applicationName: SITE_NAME,
  ...(NAVER_SITE_VERIFICATION
    ? { verification: { other: { "naver-site-verification": NAVER_SITE_VERIFICATION } } }
    : {}),
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "엄나구모 성형외과 | 강남 논현 가슴성형 전문",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "엄나구모 성형외과 | 강남 논현 가슴성형 전문",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: ["https://www.youtube.com/@umnagumo"],
  };

  return (
    <html lang="ko">
      <head>
        <Script
          src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=wrifnr3bub"
          strategy="beforeInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
      </head>
      <body className="antialiased min-h-screen">
        {children}
        <FloatingContactButton />
      </body>
    </html>
  );
}
