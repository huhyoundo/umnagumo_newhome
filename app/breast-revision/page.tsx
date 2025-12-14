import SurgeryPageTemplate from '../components/SurgeryPageTemplate';

export const metadata = {
  title: '가슴재수술 | 엄나구모 성형외과',
  description: '엄나구모 가슴재수술 - 구축, 파손, 비대칭, 변형 등 문제를 해결하기 위한 정밀 교정 수술',
};

export default function BreastRevisionPage() {
  return (
    <SurgeryPageTemplate
      englishTitle="REVISION BREAST SURGERY"
      koreanTitle="엄나구모 가슴 재수술"
      heroImage="/가슴재수술 페이지 사진/1(메인-상단).jpg"
      concerns={[
        "뭉침 느낌이 들고 불편해요.",
        "가슴 모양이 처음과 달라져 걱정돼요.",
        "딱딱해지고 통증이 점점 심해지는 것 같아요.",
        "보형물 위치가 내려가서 양쪽이 달라 보여요.",
        "1차 수술 결과가 기대와 달라 재수술이 고민돼요.",
      ]}
      sculptureImage="/가슴재수술 페이지 사진/2(조각상).jpg"
      surgeryImage="/가슴재수술 페이지 사진/4.jpg"
      specialBackgroundImage="/가슴재수술 페이지 사진/3.jpg"
      explanationTitle="가슴 재수술,"
      explanationSubtitle="더 까다롭게 알아보셔야 합니다."
      explanationContent={[
        "가슴 재수술은 구축·파손·비대칭·변형 등 문제를 해결하기 위한 정밀 교정 수술입니다. 이미 한 번 수술한 조직을 다루기 때문에 피막 상태, 보형물 위치, 조직 손상까지 세밀하게 확인해야 합니다.",
        "엄나구모는 내시경을 활용해 정확한 박리·출혈 최소화·포켓 재구성을 진행하며, 문제 원인을 근본적으로 교정해 더 안정적이고 자연스러운 결과를 목표로 합니다.",
      ]}
      specialTitle="엄나구모 가슴 재수술의 특별한 점"
      specialSubtitle="엄나구모 가슴 재수술은 내시경 기반의 정밀 박리와 맞춤 교정으로, 더 안전하고 자연스러운 결과를 만드는 데 집중합니다."
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
      faqTitle="가슴 재수술 FAQ"
      faqs={[
        {
          question: '재수술은 언제 받을 수 있나요?',
          answer: '일반적으로 1차 수술 후 구축, 파손, 모양 변형 등 문제가 있더라도, 10개월~1년 후 수술 하시는 것이 안정적입니다.',
        },
        {
          question: '재수술 전 준비는 어떻게 해야 하나요?',
          answer: '보형물 상태확인, 금연,금주 1주 전, 출혈 위험 약물 중단, 기존 수술 정보 제공이 필요합니다.',
        },
        {
          question: '회복기간은 얼마나 걸리나요?',
          answer: '대부분 3~7일내 일상복귀, 운동은 4~6주 후 가능합니다.',
        },
        {
          question: '수술 후 주의사항은 무엇인가요?',
          answer: '팔 들거나 무거운 물건 금지, 사우나·운동 금지, 가슴 압박 피하기, 압박 브라 착용 지침 준수 등입니다.',
        },
        {
          question: '구축 재발을 줄이려면?',
          answer: '정기 내원 체크, 금연, 금주 등 염증 유발 요인 회피가 중요합니다.',
        },
      ]}
    />
  );
}
