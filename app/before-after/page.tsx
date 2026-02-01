import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";
import BeforeAfterClient from "./BeforeAfterClient";

export const metadata: Metadata = createPageMetadata({
  title: "전후사진",
  description: "강남 논현 엄나구모 성형외과 가슴성형 전후사진. 케이스별 포인트를 한눈에 확인해보세요.",
  path: "/before-after",
});

export default function BeforeAfterPage() {
  return <BeforeAfterClient />;
}

