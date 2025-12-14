import type { Metadata } from "next";

export const SITE_URL = "https://www.bust1.com";
export const SITE_NAME = "엄나구모 성형외과";

export const SITE_DESCRIPTION =
  "강남 논현동 가슴성형 전문 엄나구모 성형외과. 맞춤 디자인과 풍부한 임상 경험을 바탕으로 자연스럽고 조화로운 가슴라인을 제공합니다.";

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
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description: resolvedDescription,
    },
  };
}
