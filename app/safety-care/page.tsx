import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";
import SafetyCareClient from "./SafetyCareClient";

export const metadata: Metadata = createPageMetadata({
  title: "안전 케어",
  description:
    "강남 논현 엄나구모 성형외과 안전 케어 시스템. 수술 전·중·후 전 단계에서 리스크를 줄이고 회복을 돕는 표준화 프로토콜을 운영합니다.",
  path: "/safety-care",
});

export default function SafetyCarePage() {
  return <SafetyCareClient />;
}

