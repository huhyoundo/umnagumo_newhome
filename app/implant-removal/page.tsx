import SurgeryPageTemplate from '../components/SurgeryPageTemplate';

export const metadata = {
  title: '보형물제거 | 엄나구모 성형외과',
  description: '엄나구모 보형물제거술 - 더 이상 보형물이 필요하지 않거나 문제가 발생한 경우 안전하게 해결',
};

export default function ImplantRemovalPage() {
  return (
    <SurgeryPageTemplate
      englishTitle="BREAST IMPLANT EXPLANT SURGERY"
      koreanTitle="엄나구모 보형물제거술"
      heroImage="/보형물제거 페이지 사진/1(메인-상단).jpg"
      concerns={[
        "가슴이 딱딱해지고 통증이 생겨 불편해요.",
        "뭉침·이물감 같은 이상한 느낌이 계속돼요.",
        "가슴 모양이 예전과 다르게 변형된 것 같아요.",
        "보형물 위치가 내려가거나 모양이 비대칭으로 보여요.",
        "자연 가슴으로 돌아가고 싶거나, 보형물 유지가 부담돼요.",
      ]}
      sculptureImage="/보형물제거 페이지 사진/2(조각상).jpg"
      surgeryImage="/보형물제거 페이지 사진/4(원장님-사진).jpg"
      specialBackgroundImage="/보형물제거 페이지 사진/3.jpg"
      explanationTitle="왜 보형물제거술이 필요할까요?"
      explanationContent={[
        "가슴 보형물 제거술은 더 이상 보형물이 필요하지 않거나, 보형물로 인해 통증·딱딱함·변형·구축 등의 문제가 발생한 경우 이를 안전하게 해결하기 위한 수술입니다.",
        "보형물을 제거함으로써 불편감과 이물감을 줄이고, 자연스러운 가슴 형태를 되찾는 데 도움을 줍니다. 또한 보형물 파손이나 염증 같은 합병증을 예방하고, 건강한 가슴 조직을 유지하기 위한 중요한 과정이 될 수 있습니다.",
      ]}
      specialTitle="엄나구모 보형물제거술의 특별한 점"
      specialSubtitle="엄나구모 보형물 제거술은 내시경 기반 정밀 제거와 맞춤 교정을 통해 안전하면서도 자연스러운 가슴 라인을 만들어줍니다."
      specialPoints={[
        {
          icon: 'design',
          title: '개인별 맞춤 디자인',
          description: '문제 원인 분석 후 가장 안정적인 재수술 설계',
        },
        {
          icon: 'time',
          title: '수술시간',
          description: '약 60~120분',
        },
        {
          icon: 'feature',
          title: '수술 특징',
          description: '안전성 최우선 · 변형·구축 개선 · 라인 재구성',
        },
      ]}
      faqTitle="보형물제거술 FAQ"
      faqs={[
        {
          question: '보형물만 제거하면 끝인가요?',
          answer: '상황에 따라 캡슐 제거(피막 제거)도, 거상술, 지방이식 등이 함께 필요할 수 있습니다.',
        },
        {
          question: '회복 기간은 얼마나 걸리나요?',
          answer: '일반적으로 일상생활 복귀는 3~7일, 붓기는 2~4주 정도에 걸쳐 서서히 빠집니다.',
        },
        {
          question: '흉터가 크게 남나요?',
          answer: '대부분 기존 절개 부위를 활용하며, 흉터는 점차 옅어집니다.',
        },
        {
          question: '보형물 제거 후 처짐이 걱정돼요.',
          answer: '탄력 상태에 따라 거상술 또는 부분 교정으로 충분히 보완할 수 있습니다.',
        },
        {
          question: '제거 후 다시 보형물 넣을 수도 있나요?',
          answer: '원하면 보형물 재삽입, 지방이식, 복합 교정 등 다양한 방법으로 재구성 가능합니다.',
        },
      ]}
    />
  );
}
