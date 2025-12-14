import SurgeryPageTemplate from '../components/SurgeryPageTemplate';
import type { Metadata } from 'next';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '축소거상',
  description:
    '엄나구모 축소거상술. 과도하게 큰 가슴으로 인한 통증·거북함·처짐 등을 해결하는 볼륨 축소 + 처짐 교정 복합 수술입니다.',
  path: '/reduction-lift',
});

export default function ReductionLiftPage() {
  return (
    <SurgeryPageTemplate
      englishTitle="REDUCTION SURGERY"
      koreanTitle="엄나구모 축소거상술"
      heroImage="/축소거상 페이지 사진/1(메인_상단).jpg"
      concerns={[
        "어깨와 목이 자주 뭉치고 통증이 있어요.",
        "운동할 때 통증이나 흔들림이 너무 심해요.",
        "가슴이 무겁고 처져서 일상생활이 불편해요.",
        "가슴 때문에 옷맵시가 안 나고 활동이 제한돼요.",
        "유두·유륜 위치가 아래로 처져 모양이 신경 쓰여요.",
      ]}
      sculptureImage="/축소거상 페이지 사진/2(조각상).jpg"
      surgeryImage="/축소거상 페이지 사진/4(원장님).jpg"
      surgeryImageVariant="circle"
      specialBackgroundImage="/축소거상 페이지 사진/3.jpg"
      explanationTitle="축소거상술이 까다로운 이유"
      explanationContent={[
        "가슴축소거상술은 과도하게 큰 가슴으로 인해 통증·거북함·처짐·자세 불균형이 생기는 문제를 동시에 해결하는 볼륨 축소 + 처짐 교정 복합 수술입니다.",
        "무게를 줄이면서 유두·유륜 위치를 정상적인 위치로 올려 더 가볍고 탄탄한 라인, 편안한 일상, 균형 잡힌 체형을 만들어주는 기능성+미용 목적의 고난도 수술입니다.",
      ]}
      specialTitle="엄나구모 축소 거상술의 특별한 점"
      specialSubtitle="엄나구모 가슴축소거상술은 최소 흉터·세밀한 조직조절·정확한 거상 라인 설계로 가볍고 자연스러운 라인과 기능적 편안함을 동시에 구현합니다."
      specialPoints={[
        {
          icon: 'design',
          title: '개인별 맞춤 디자인',
          description: '문제 원인 분석 후 가장 안정적인 재수술 설계',
        },
        {
          icon: 'time',
          title: '수술시간',
          description: '약 180분',
        },
        {
          icon: 'feature',
          title: '수술 특징',
          description: '안전성 최우선 · 신체 밸런스의 조화',
        },
      ]}
      faqTitle="축소거상술 FAQ"
      faqs={[
        {
          question: '흉터는 많이 남나요?',
          answer: '절개 또는 절개 범위에 따라 다르며, 살성에 의해 차이가 있습니다. 2-3개월 후부터 차츰 옅어집니다. 6개월~1년이 지나면서 실선처럼 남아 눈에 잘 띄지 않습니다.',
        },
        {
          question: '수유 기능에 영향이 있나요?',
          answer: '수유관을 최대한 보존하는 방식으로 진행해 대부분 수유 기능이 유지됩니다.',
        },
        {
          question: '회복 기간은 얼마나 걸리나요?',
          answer: '일상복귀는 5-7일, 가벼운 운동은 4주 후 가능합니다.',
        },
        {
          question: '축소와 거상을 동시에 해야 하나요?',
          answer: '가슴이 크면서 처짐이 있는 경우 대부분 축소+거상이 함께 적용되어야 모양·기능·지속력 모두 개선됩니다.',
        },
      ]}
    />
  );
}
