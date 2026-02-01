import SurgeryPageTemplate from '../components/SurgeryPageTemplate';
import type { Metadata } from 'next';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '가슴 재건술',
  description:
    '강남 논현 엄나구모 가슴 재건술. 개인별 조직 상태와 목표에 맞춘 계획으로 자연스러운 라인과 균형 회복을 돕습니다.',
  path: '/breast-reconstruction',
});

export default function BreastReconstructionPage() {
  return (
    <SurgeryPageTemplate
      showTimeline={true}
      showScarCare={true}
      englishTitle="BREAST RECONSTRUCTION"
      koreanTitle="엄나구모 가슴 재건술"
      heroImage="/메인페이지 사진/12(콘텐츠-이미지5).jpg"
      concerns={[
        '유방 수술 후 모양/라인이 걱정돼요.',
        '좌우 균형이 맞지 않아 고민돼요.',
        '흉터와 조직 상태 때문에 선택이 어려워요.',
        '자연스러운 볼륨과 촉감을 원해요.',
        '회복과 관리 과정이 궁금해요.',
      ]}
      sculptureImage="/가슴재수술 페이지 사진/2(조각상).jpg"
      surgeryImage="/메인페이지 사진/reconst_model.jpg"
      surgeryImageVariant="circle"
      explanationTitle="가슴 재건술,"
      explanationSubtitle="개인별 조건에 맞춘 계획이 핵심입니다."
      explanationContent={[
        '가슴 재건술은 남아있는 조직 상태, 흉터, 피부 탄력, 원하는 결과에 따라 방법과 순서가 달라지는 맞춤 수술입니다.',
        '엄나구모는 정밀 진단을 바탕으로 가능한 옵션을 안내하고, 안전을 최우선으로 라인과 균형 회복을 목표로 재건 계획을 세웁니다.',
      ]}
      specialTitle="엄나구모 가슴 재건술의 특별한 점"
      specialSubtitle="현재 상태를 면밀히 평가해 가장 안전하고 예측 가능한 방향으로 단계별 계획을 수립합니다."
      specialBackgroundImage="/메인페이지 사진/7.jpg"
      specialPoints={[
        {
          icon: 'design',
          title: '개인별 맞춤 설계',
          description: '조직 상태·흉터·목표 라인에 맞춘 단계별 계획',
        },
        {
          icon: 'time',
          title: '수술시간',
          description: '개인별 상이 (상담 후 안내)',
        },
        {
          icon: 'feature',
          title: '수술 특징',
          description: '안전성 최우선 · 균형 회복 · 자연스러운 라인',
        },
      ]}
      faqTitle="가슴 재건술 FAQ"
      faqs={[
        {
          question: '재건 방법은 어떻게 결정하나요?',
          answer: '조직 상태, 흉터, 피부 탄력, 원하는 결과를 종합해 상담 후 결정합니다.',
        },
        {
          question: '단계적으로 진행해야 하나요?',
          answer: '상태에 따라 한 번에 또는 단계적으로 진행할 수 있으며, 안정성과 결과를 고려해 계획합니다.',
        },
        {
          question: '회복 기간은 얼마나 걸리나요?',
          answer: '수술 범위와 개인 컨디션에 따라 다르며, 일상 복귀와 관리 일정은 상담 시 안내드립니다.',
        },
        {
          question: '추가 교정이 필요한가요?',
          answer: '개인별 목표와 조직 상태에 따라 추가 교정이 고려될 수 있으며, 미리 설명드립니다.',
        },
      ]}
    />
  );
}
