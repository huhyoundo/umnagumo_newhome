import SurgeryPageTemplate from '../components/SurgeryPageTemplate';
import type { Metadata } from 'next';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '가슴 첫수술',
  description: '엄나구모 가슴 첫수술. 체형·조직·라인에 맞춘 맞춤 디자인으로 자연스러운 볼륨과 조화를 완성합니다.',
  path: '/breast-augmentation',
});

export default function BreastAugmentationPage() {
  return (
    <SurgeryPageTemplate
      // Updated surgery time
      showTimeline={true}
      englishTitle="PRIMARY BREAST SURGERY"
      koreanTitle="엄나구모 가슴 첫수술"
      heroImage="/보형물제거 페이지 사진/1(메인-상단).jpg"
      concerns={[
        '가슴 볼륨이 부족해 옷맵시가 아쉬워요.',
        '자연스러운 라인으로 균형을 잡고 싶어요.',
        '내 체형에 맞는 보형물/사이즈가 고민돼요.',
        '가슴 비대칭이 신경 쓰여요.',
        '흉터와 회복, 통증이 걱정돼요.',
      ]}
      sculptureImage="/보형물제거 페이지 사진/2(조각상).jpg"
      surgeryImage="/메인페이지 사진/aug_model.jpg"
      surgeryImageVariant="circle"
      explanationTitle="가슴 첫수술,"
      explanationSubtitle="나에게 맞는 디자인이 가장 중요합니다."
      explanationContent={[
        '가슴 첫수술은 단순히 볼륨을 키우는 것보다 체형·흉곽·피부 탄력·조직 두께를 함께 고려해 라인을 설계하는 과정입니다.',
        '엄나구모는 상담과 진단을 통해 보형물 종류·크기·삽입 위치·절개 방법을 개인별 조건에 맞춰 계획하고, 자연스러운 결과와 안정적인 회복을 목표로 합니다.',
      ]}
      specialTitle="엄나구모 가슴 첫수술의 특별한 점"
      specialSubtitle="개인별 체형과 조직 조건을 세밀하게 분석해, 과하지 않으면서도 또렷한 라인을 만드는 맞춤 설계를 진행합니다."
      specialBackgroundImage="/보형물제거 페이지 사진/3.jpg"
      specialPoints={[
        {
          icon: 'design',
          title: '개인별 맞춤 디자인',
          description: '체형·조직·선호 라인을 반영한 보형물/포켓 설계',
        },
        {
          icon: 'time',
          title: '수술시간',
          description: '40분-1시간',
        },
        {
          icon: 'feature',
          title: '수술 특징',
          description: '자연스러운 볼륨 · 라인 균형 · 안전성 최우선',
        },
      ]}
      faqTitle="가슴 첫수술 FAQ"
      faqs={[
        {
          question: '보형물 선택은 어떻게 하나요?',
          answer: '체형·흉곽·조직 두께·촉감 선호도 등을 함께 고려해 상담 후 결정합니다.',
        },
        {
          question: '회복은 얼마나 걸리나요?',
          answer: '개인차가 있으며, 일상 복귀는 보통 수일 내 가능하고 운동은 단계적으로 진행합니다.',
        },
        {
          question: '흉터가 걱정돼요.',
          answer: '절개 방법에 따라 위치가 달라지며, 흉터 관리는 개인 피부 상태에 맞춰 안내드립니다.',
        },
        {
          question: '비대칭도 개선될까요?',
          answer: '원인(흉곽·조직·기존 비대칭)에 따라 교정 계획이 달라지며, 상담을 통해 방향을 제시합니다.',
        },
      ]}
    />
  );
}
