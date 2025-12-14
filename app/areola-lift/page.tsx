import SurgeryPageTemplate from '../components/SurgeryPageTemplate';

export const metadata = {
  title: '유륜거상술 | 엄나구모 성형외과',
  description: '엄나구모 유륜거상술 - 늘어진 가슴, 처짐(처진 조기), 출산·수유 후 변화로 인해 유륜이 아래로 내려간 경우 자연스럽고 탄탄하게 올려주는 교정술',
};

export default function AreolaLiftPage() {
  return (
    <SurgeryPageTemplate
      englishTitle="AREOLAR LIFT SURGERY"
      koreanTitle="엄나구모 유륜거상술"
      heroImage="/유륜거상술 페이지 사진/1(메인_상단).jpg"
      concerns={[
        "유륜이 예전보다 넓어져 보이고 신경 쓰여요.",
        "속옷을 벗으면 모양이 퍼져 보이고 탄력이 없어요.",
        "임신·수유 후 가슴 모양이 크게 변해서 고민돼요.",
        "유두·유륜 위치가 중심에서 아래로 내려간 것 같아요.",
        "가슴 라인이 처져 전체적으로 밑으로 쏠린 것 같아요.",
      ]}
      sculptureImage="/유륜거상술 페이지 사진/2(조각상).jpg"
      surgeryImage="/유륜거상술 페이지 사진/4.jpg"
      specialBackgroundImage="/유륜거상술 페이지 사진/3.jpg"
      explanationTitle="유륜거상술이 필요한 이유!"
      explanationContent={[
        "유륜거상술은 늘어진 가슴, 처짐(처진 조기), 출산·수유 후 변화로 인해 유륜이 넓어지거나 위치가 아래로 내려간 경우 이를 자연스럽고 탄탄하게 올려주는 교정술입니다.",
        "유두·유륜 주변만 섬세하게 절개해 모양을 바로잡기 때문에 흉터 부담은 최소화하고, 처짐 개선 + 모양 교정을 동시에 기대할 수 있습니다.",
      ]}
      specialTitle="엄나구모 유륜거상술의 특별한 점"
      specialSubtitle="엄나구모 유륜거상술은 최소 흉터 디자인과 섬세한 봉합 기법으로 자연스러운 경계선, 탄탄한 라인 회복, 흉터 부담 최소화를 목표로 합니다."
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
      faqTitle="유륜거상술 FAQ"
      faqs={[
        {
          question: '흉터가 많이 남나요?',
          answer: '처짐여부에 따라 절개 범위가 다르며, 살성에 의해 차이가 있습니다. 2-3개월 후부터 차츰 옅어집니다. 6개월~1년이 지나면서 실선처럼 남아 눈에 잘 띄지 않습니다.',
        },
        {
          question: '회복 기간은 얼마나 걸리나요?',
          answer: '일상 복귀는 1-2일 후, 가벼운 운동은 3주 후 가능합니다.',
        },
        {
          question: '처짐도 같이 개선되나요?',
          answer: '처진 가슴을 교정하는 수술이라 수술 후 효과가 좋습니다.',
        },
        {
          question: '수유 기능에 영향은 없나요?',
          answer: '수유와는 무관하나, 몇 개월 이내로 출산의 계획이 있으시다면 출산 후 수술을 권유드립니다.',
        },
      ]}
    />
  );
}
