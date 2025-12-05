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
          answer: '유륜 경계선에 맞춰 절개해 경계와 자연스럽게 섞이는 형태라 눈에 잘 띄지 않습니다.',
        },
        {
          question: '회복 기간은 얼마나 걸리나요?',
          answer: '일상 복귀는 3~5일, 가벼운 운동은 2~3주 후, 흉터는 3~6개월에 걸쳐 점점 옅어집니다.',
        },
        {
          question: '처짐도 같이 개선되나요?',
          answer: '처짐 초기라면 충분히 개선 가능하며, 중등도 이상 처짐이면 유방거상술과 병행하는 것이 효과적입니다.',
        },
        {
          question: '수유 기능에 영향은 없나요?',
          answer: '유즙관을 최대한 보존하는 방식으로 진행해 대부분 수유 기능에 영향이 거의 없습니다.',
        },
      ]}
    />
  );
}
