import type { Metadata } from "next";

// Google / Naver SEO Optimization
export const SITE_URL = "https://www.bust1.com";
export const SITE_NAME = "엄나구모 성형외과";
export const AUTHOR_NAME = "Dr. Eom Soon-chan & Dr. Nam Jung-hyun";

export const SITE_DESCRIPTION =
  "엄나구모 성형외과는 서울특별시 강남구 도산대로 318 SB타워 6층에서 가슴성형과 가슴수술을 중심으로 상담부터 수술, 회복관리까지 개인별 상태에 맞춘 계획을 제안합니다. 가슴확대, 가슴거상, 가슴 재수술은 물론 처진가슴 교정, 축소술, 재건술, 보형물 제거 등 다양한 케이스를 진료합니다.";

// Schema Generators
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "ko-KR",
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/opengraph-image`,
    description: SITE_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      streetAddress: "서울특별시 강남구 도산대로 318 SB타워 6층",
      addressLocality: "Seoul",
      addressRegion: "Gangnam-gu",
      addressCountry: "KR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+82-2-512-6838",
      contactType: "customer service",
      areaServed: "KR",
      availableLanguage: ["Korean", "English"],
    },
    sameAs: [
      "https://www.youtube.com/@umnagumo",
      "https://blog.naver.com/umnagumo",
      "https://www.instagram.com/umnagumo_official",
    ],
  };
}

export function generateMedicalWebPageSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description: description,
    url: url,
    author: {
      "@type": "MedicalOrganization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "MedicalOrganization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    specialty: "Plastic Surgery",
  };
}

export function generateFaqSchema(faqs: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const canonicalUrl = new URL(path, SITE_URL);
  const resolvedDescription = description ?? SITE_DESCRIPTION;
  const resolvedOgTitle = title
    ? `${title} | ${SITE_NAME}`
    : "강남 가슴성형·가슴수술·가슴확대 | 가슴거상·처진가슴·재수술 전문 | 엄나구모 성형외과";

  return {
    ...(title ? { title } : {}),
    description: resolvedDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: resolvedOgTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description: resolvedDescription,
      images: ["/twitter-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
