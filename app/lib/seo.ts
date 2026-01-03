import type { Metadata } from "next";

// Google / Naver SEO Optimization
export const SITE_URL = "https://www.bust1.com";
export const SITE_NAME = "엄나구모 성형외과";
export const AUTHOR_NAME = "Dr. Eom Soon-chan & Dr. Nam Jung-hyun";

export const SITE_DESCRIPTION =
  "강남 논현동 가슴성형 전문 엄나구모 성형외과. 12,000례 이상의 풍부한 임상 경험. 가슴확대, 축소, 거상, 재수술 및 유방재건 전문 병원.";

// Schema Generators
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description: SITE_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      streetAddress: "강남구 논현로 815",
      addressLocality: "Seoul",
      addressRegion: "Gangnam-gu",
      postalCode: "06039",
      addressCountry: "KR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+82-2-518-0050",
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

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
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
  const resolvedOgTitle = title ? `${title} | ${SITE_NAME}` : "엄나구모 성형외과 | 강남 논현 가슴성형 전문";

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
          url: "/og-image.jpg",
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
      images: ["/og-image.jpg"],
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
