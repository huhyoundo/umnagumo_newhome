import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import FloatingContactButton from "./components/FloatingContactButton";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, generateOrganizationSchema } from "./lib/seo";

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
    default: "엄나구모 성형외과 | 강남 논현 가슴성형 전문",
    template: "%s | 엄나구모 성형외과",
  },
  description: SITE_DESCRIPTION,
  keywords: "엄나구모 성형외과, 강남 가슴성형, 논현 가슴성형외과, 가슴성형 전문, 가슴확대 수술, 가슴재수술 잘하는 곳, 처진가슴 수술, 짝가슴 교정, 자연유방성형, 보형물 가슴성형, 모티바 가슴성형, 안전한 가슴성형",
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
  const organizationStructuredData = generateOrganizationSchema();

  return (
    <html lang="ko">
      <head>
        <Script
          src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=wrifnr3bub"
          strategy="beforeInteractive"
        />
        <meta name="apple-mobile-web-app-title" content="Umnagumo" />
        {ENABLE_NAVER_ANALYTICS ? (
          <>
            <Script src="https://wcs.pstatic.net/wcslog.js" strategy="afterInteractive" />
            <Script id="naver-analytics" strategy="afterInteractive">
              {`(function () {
  if (!window.wcs_add) window.wcs_add = {};
  window.wcs_add["wa"] = "${NAVER_ANALYTICS_WA}";

  function send() {
    if (window.wcs && typeof window.wcs_do === "function") {
      window.wcs_do();
      return true;
    }
    return false;
  }

  if (send()) return;

  var tries = 0;
  var timer = window.setInterval(function () {
    tries += 1;
    if (send() || tries >= 50) window.clearInterval(timer);
  }, 100);
})();`}
            </Script>
          </>
        ) : null}
        {NAVER_SITE_VERIFICATIONS.map((token) => (
          <meta key={token} name="naver-site-verification" content={token} />
        ))}
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
