import type { Metadata } from 'next';
import { createPageMetadata, generateMedicalWebPageSchema, generateBreadcrumbSchema, generateFaqSchema } from '../lib/seo';
import ChecklistContent from './ChecklistContent';

export const metadata: Metadata = createPageMetadata({
  title: '가슴성형 체크리스트 | 필수 가이드',
  description: '가슴성형 전 필독 체크리스트. 모티바 보형물 특징, 절개 방법(겨드랑이/밑선/유륜) 비교, 근막하 vs 이중평면 삽입 위치 장단점, 수술 후 합병증 및 관리법 A to Z.',
  path: '/checklist',
});

// 1. Breadcrumb Schema
const breadcrumbLd = generateBreadcrumbSchema([
  { name: '홈', url: '/' },
  { name: '가슴성형', url: '/breast-augmentation' }, // Logically under breast surgery category
  { name: '체크리스트', url: '/checklist' },
]);

// 2. Medical WebPage Schema (Enhanced)
const medicalLd = generateMedicalWebPageSchema(
  '가슴성형 체크리스트 | 엄나구모 성형외과',
  '엄나구모 성형외과의 가슴성형 필수 체크리스트. 보형물 종류, 절개 방법, 삽입 위치, 합병증 안내 등 안전한 수술을 위한 전문 의학 정보입니다.',
  'https://www.bust1.com/checklist'
);

// 3. FAQ Schema (Derived from content to target Rich Snippets)
const faqLd = generateFaqSchema([
  {
    question: '가슴성형 절개 방법 중 흉터가 가장 적은 방법은?',
    answer: '겨드랑이 절개는 흉터가 겨드랑이 주름에 숨겨져 미용적으로 가장 유리하며, 엄나구모 성형외과는 내시경을 이용하여 정밀하게 수술합니다.'
  },
  {
    question: '근막하 삽입과 이중평면법의 차이는?',
    answer: '근막하 삽입은 근육 손상이 없어 통증이 적고 회복이 빠르며, 이중평면법은 보형물이 근육에 덮여 리플링 현상을 줄이고 자연스러운 촉감을 제공합니다.'
  },
  {
    question: '수술 후 발생할 수 있는 합병증은?',
    answer: '급성기에는 출혈이나 감염이 있을 수 있으며, 만성기에는 드물게 구형구축(피막구축)이나 장액종이 발생할 수 있습니다. 본원은 1% 미만의 구형구축 발생률을 유지하고 있습니다.'
  },
  {
    question: '모티바 보형물의 장점은?',
    answer: '2024년 FDA 승인을 받은 보형물로, 중력에 따라 자연스럽게 움직이는 Ultima Gel을 사용하며 구형구축 및 파열 위험이 낮습니다.'
  }
]);

export default function ChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbLd, medicalLd, faqLd]) }}
      />
      <ChecklistContent />
    </>
  );
}
