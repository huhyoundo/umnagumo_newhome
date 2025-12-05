import SurgeryPageTemplate from '../components/SurgeryPageTemplate';

export const metadata = {
  title: '유두축소 | 엄나구모 성형외과',
  description: '엄나구모 유두축소술 - 유두가 길거나 굵어 보이는 문제를 개선해 가슴 전체의 비율과 심미성을 되찾아주는 교정술',
};

export default function NippleReductionPage() {
  return (
    <SurgeryPageTemplate
      englishTitle="NIPPLE REDUCTION SURGERY"
      koreanTitle="엄나구모 유두축소술"
      heroImage="/유두축소 페이지 사진/1(메인-상단).jpg"
      concerns={[
        "유두가 길어져 외관상 신경 쓰여요.",
        "수유 이후 유두 모양이 많이 변했어요.",
        "얇은 옷을 입으면 모양이 도드라져 보여요.",
        "좌우 유두 크기가 달라 보이는 게 고민돼요.",
        "유두가 굵어져 전체 비율이 맞지 않는 것 같아요.",
      ]}
      sculptureImage="/유두축소 페이지 사진/2(조각상).jpg"
      surgeryImage="/유두축소 페이지 사진/4(원장님사진).jpg"
      specialBackgroundImage="/유두축소 페이지 사진/3.jpg"
      explanationTitle="유두축소술이 필요한 이유"
      explanationContent={[
        "유두축소술은 유두가 길거나 굵어 보이는 문제를 개선해 가슴 전체의 비율·심미성·단정한 실루엣을 되찾아주는 교정술입니다.",
        "출산·수유, 선천적 요인, 반복 자극 등으로 늘어난 유두를 섬세한 미세 절개와 봉합으로 자연스럽고 균형 있게 다듬습니다.",
      ]}
      specialTitle="엄나구모 유두축소술의 특별한 점"
      specialSubtitle="엄나구모 유두축소술은 미세 절개·정밀 봉합을 통해 흉터를 최소화하면서도 자연스럽고 균형 잡힌 유두 라인을 만들어냅니다."
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
      faqTitle="유두축소술 FAQ"
      faqs={[
        {
          question: '흉터는 많이 남나요?',
          answer: '유두 주변 경계를 따라 절개해 경계선과 자연스럽게 섞여 거의 티 나지 않습니다.',
        },
        {
          question: '수유 기능에 영향이 있나요?',
          answer: '수유관을 보존하는 방식으로 진행해 대부분 수유 기능에 영향을 주지 않습니다.',
        },
        {
          question: '회복 기간은 얼마나 걸리나요?',
          answer: '일상 생활은 3일 내, 샤워는 3~5일 후, 운동은 2~3주 후부터 가능합니다.',
        },
        {
          question: '통증은 어떤가요?',
          answer: '가벼운 당김 정도로, 일반적으로 부담 없는 수준입니다.',
        },
      ]}
    />
  );
}
