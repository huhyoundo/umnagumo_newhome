import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import FloatingContactButton from "./components/FloatingContactButton";
import PretendardFullLoader from "./components/PretendardFullLoader";
import FacebookPixel from "./components/FacebookPixel";
import ThirdPartyScripts from "./components/ThirdPartyScripts";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, generateOrganizationSchema, generateWebSiteSchema } from "./lib/seo";

const pretendardInitial = localFont({
  src: [
    {
      path: "../public/폰트/Pretendard-1.3.9/web/static/woff2-initial/Pretendard-Regular.initial.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/폰트/Pretendard-1.3.9/web/static/woff2-initial/Pretendard-SemiBold.initial.woff2",
      style: "normal",
      weight: "600",
    },
  ],
  display: "swap",
  preload: false,
  variable: "--font-pretendard",
  fallback: ["-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
});

const pretendardFull = localFont({
  src: [
    {
      path: "../public/폰트/Pretendard-1.3.9/web/static/woff2-subset/Pretendard-Regular.subset.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/폰트/Pretendard-1.3.9/web/static/woff2-subset/Pretendard-SemiBold.subset.woff2",
      style: "normal",
      weight: "600",
    },
  ],
  display: "swap",
  preload: false,
  variable: "--font-pretendard-full",
  fallback: ["-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700"],
});



const DEFAULT_NAVER_SITE_VERIFICATIONS = [
  "fb15418bc68a30db2f6246177dfa6bd350527ede",
  "291831b97ca6960a865b13e1bfa7230bc005cff3",
] as const;

const DEFAULT_NAVER_ANALYTICS_WA = "129a7727af9df60";

const NAVER_SITE_VERIFICATION = process.env.NAVER_SITE_VERIFICATION;
const NAVER_SITE_VERIFICATIONS = NAVER_SITE_VERIFICATION
  ? NAVER_SITE_VERIFICATION.split(/[\s,]+/g).filter(Boolean)
  : [...DEFAULT_NAVER_SITE_VERIFICATIONS];

const NAVER_ANALYTICS_WA = process.env.NAVER_ANALYTICS_WA ?? DEFAULT_NAVER_ANALYTICS_WA;
const ENABLE_NAVER_ANALYTICS = process.env.NODE_ENV === "production" && Boolean(NAVER_ANALYTICS_WA);

export const viewport: Viewport = {
  themeColor: "#1f4d5a",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "엄나구모 성형외과 | 강남 논현 가슴성형·가슴수술 25년 | 가슴확대·재수술 전문",
    template: "%s | 엄나구모 성형외과",
  },
  description: SITE_DESCRIPTION,
  keywords:
    "엄나구모 성형외과, 강남 가슴성형, 강남 가슴수술, 강남 가슴확대, 논현 가슴성형, 논현 가슴수술, 가슴성형, 가슴수술, 가슴확대, 가슴확대 수술, 가슴거상, 처진가슴, 처진가슴 수술, 가슴재수술, 짝가슴 교정, 보형물 가슴성형, 모티바, 멘토",
  applicationName: SITE_NAME,
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
    title: "엄나구모 성형외과 | 강남 논현 가슴성형·가슴수술 전문",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "엄나구모 성형외과 | 강남 논현 가슴성형·가슴수술 전문",
      },
    ],

  },
  twitter: {
    card: "summary_large_image",
    title: "엄나구모 성형외과 | 강남 논현 가슴성형·가슴수술 전문",
    description: SITE_DESCRIPTION,
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationStructuredData = generateOrganizationSchema();
  const websiteStructuredData = generateWebSiteSchema();

  return (
    <html lang="ko" className={`${pretendardInitial.variable} ${pretendardFull.variable} ${montserrat.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Umnagumo" />
        <link
          rel="preload"
          as="image"
          href={encodeURI("/메인페이지 사진/1(메인).jpg")}
          fetchPriority="high"
        />
        {NAVER_SITE_VERIFICATIONS.map((token) => (
          <meta key={token} name="naver-site-verification" content={token} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationStructuredData, websiteStructuredData]) }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TG7KZ92W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1438534097844292&ev=PageView&noscript=1"
          />
        </noscript>
        <FacebookPixel />
        {children}
        <ThirdPartyScripts
          gtmId="GTM-TG7KZ92W"
          enableNaverAnalytics={ENABLE_NAVER_ANALYTICS}
          naverAnalyticsWa={NAVER_ANALYTICS_WA}
        />
        <PretendardFullLoader />
        <FloatingContactButton />
      </body>
    </html>
  );
}
