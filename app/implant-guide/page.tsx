import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: '보형물 가이드 | 엄나구모 성형외과',
  description: '가슴의 본질을 결정하는 보형물 선택 - 20년 임상 경험으로 가장 안전하고 정확한 기준을 제시합니다.',
};

const implantComparison = [
  { label: '핵심 느낌', motiva: '부드럽고 자연스러운 촉감', boost: '균형 잡힌 탄력 & 안정감', xtra: '확실한 볼륨·탄탄한 형태' },
  { label: '적합한 체형', motiva: '피부 얇음', boost: '보통 체형', xtra: '피부 두꺼움·근육형' },
  { label: '원하는 스타일', motiva: '자연스러움', boost: '무난한 중간 볼륨', xtra: '또렷한 라인·글래머러스' },
  { label: '촉감', motiva: '가장 부드러움', boost: '중간', xtra: '탄력 지지력 가장 높음' },
  { label: '재수술 적합도', motiva: '구축 위험 낮음', boost: '보통', xtra: '매우 안정적' },
  { label: '추천 대상', motiva: '부드럽고 자연스러운 볼륨을 원하는 분', boost: '탄력과 안정감을 균형 있게 원하는 분', xtra: '선명한 라인과 탄탄한 볼륨감을 원하는 분' },
];

export default function ImplantGuidePage() {
  return (
    <>
      <Header />
      <main className="pt-[70px]">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-[#f8f6f3]">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-[26px] md:text-[32px] lg:text-[38px] font-semibold text-[#2a2a2a] mb-4 tracking-[-0.02em] leading-tight">
                  가슴의 본질을 결정하는 보형물 선택
                </h1>
                <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
                  20년 임상 경험으로 가장 안전하고 정확한 기준을 제시합니다.
                  <br />
                  체형·조직·촉감까지 고려한 맞춤 보형물 솔루션!
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-[300px] h-[400px]">
                  <Image
                    src="/보형물 가이드 페이지 사진/1(메인_상단).jpg"
                    alt="보형물 가이드"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#8B7355]">
                    <th className="py-4 px-4 text-left text-[14px] font-semibold text-gray-700"></th>
                    <th className="py-4 px-4 text-center text-[14px] font-semibold text-gray-700">
                      모티바<br />(Motiva)
                    </th>
                    <th className="py-4 px-4 text-center text-[14px] font-semibold text-gray-700">
                      멘토 부스트<br />(Mentor BOOST)
                    </th>
                    <th className="py-4 px-4 text-center text-[14px] font-semibold text-gray-700">
                      멘토 엑스트라무스<br />(Mentor Xtra)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {implantComparison.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-4 px-4 text-[13px] font-medium text-gray-700 bg-gray-50">{row.label}</td>
                      <td className="py-4 px-4 text-[12px] text-gray-600 text-center">{row.motiva}</td>
                      <td className="py-4 px-4 text-[12px] text-gray-600 text-center">{row.boost}</td>
                      <td className="py-4 px-4 text-[12px] text-gray-600 text-center">{row.xtra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Motiva Section */}
        <section className="py-16 md:py-20 bg-white border-t border-gray-100">
          <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
              <div className="flex justify-center">
                <Image
                  src="/보형물 가이드 페이지 사진/3(모티바).jpg"
                  alt="모티바"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-[20px] md:text-[24px] font-semibold text-[#2a2a2a] mb-4">
                  모티바(Motiva)
                </h2>
                <p className="text-[13px] md:text-[14px] text-gray-600 leading-relaxed mb-4">
                  모티바 보형물은 인체의 움직임에 따라 자연스럽게 형태가 변하도록 설계된 유동형 보형물입니다.
                  누워 있을 때는 완만하게 퍼지고, 서 있을 때는 물방울 형태로 모양이 잡혀 실제 가슴과 유사한 자연스러운 실루엣을 만들어냅니다.
                </p>
                <p className="text-[13px] md:text-[14px] text-gray-600 leading-relaxed mb-4">
                  보형물 내부 젤은 매우 부드럽고 신축성이 뛰어나 촉감이 자연스러우며, 피부가 얇은 분들도 경계가 없이 편안한 결과를 기대하실 수 있습니다.
                </p>
                <p className="text-[13px] md:text-[14px] text-gray-600 leading-relaxed">
                  또한 6겹 외피 구조와 블루씰(BlueSeal) 기술이 적용되어 젤 누출과 구형 구축의 발생 가능성을 낮추는 데 도움을 줍니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mentor Boost Section */}
        <section className="py-16 md:py-20 bg-[#f8f6f3]">
          <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
              <div className="flex justify-center">
                <Image
                  src="/보형물 가이드 페이지 사진/4(멘토부스트).jpg"
                  alt="멘토 부스트"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-[20px] md:text-[24px] font-semibold text-[#2a2a2a] mb-4">
                  멘토 부스트<br />
                  <span className="text-[16px] font-normal text-gray-500">(Mentor MemoryGel BOOST)</span>
                </h2>
                <p className="text-[13px] md:text-[14px] text-gray-600 leading-relaxed mb-4">
                  멘토 부스트 보형물은 자연스러움과 형태 유지력의 균형이 뛰어난 제품입니다.
                  기존 멘토 젤보다 탄성과 응집력이 높아 조물거리거나 지나치게 단단하지 않으며, 가슴 보형물이 자연스럽게 놓이는 것이 특징입니다.
                </p>
                <p className="text-[13px] md:text-[14px] text-gray-600 leading-relaxed">
                  또한 일상 활동이 많은 분들도 형태가 안정적으로 유지되며, 부드러움과 적당한 탄탄함 사이의 밸런스를 원하는 분들께 특히 잘 맞는 보형물입니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mentor Xtra Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
              <div className="flex justify-center">
                <Image
                  src="/보형물 가이드 페이지 사진/5(멘토엑스트라무스).jpg"
                  alt="멘토 엑스트라무스"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-[20px] md:text-[24px] font-semibold text-[#2a2a2a] mb-4">
                  멘토 엑스트라무스<br />
                  <span className="text-[16px] font-normal text-gray-500">(Mentor MemoryGel Xtra)</span>
                </h2>
                <p className="text-[13px] md:text-[14px] text-gray-600 leading-relaxed mb-4">
                  멘토 엑스트라무스 보형물은 선명한 볼륨과 뛰어난 형태 유지력이 가장 큰 장점인 제품입니다.
                  고강도 응집력 젤을 적용해 가슴 전체 라인을 탄탄하게 지지하며, 움직임이 많아도 모양이 쉽게 흐트러지지 않습니다.
                </p>
                <p className="text-[13px] md:text-[14px] text-gray-600 leading-relaxed">
                  특히 둥기능 볼륨 표현이 무결해 드레스나 비키니 착용 시 라인이 예쁘게 살아나는 보형물이며,
                  조직이 부족하거나 탄력이 약한 경우에도 형태를 안정적으로 잡아주는 점을 갖고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety & Examination Section */}
        <section className="py-16 md:py-24 bg-[#f8f6f3]">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <h2 className="text-[22px] md:text-[28px] font-semibold text-[#2a2a2a] mb-12 text-center tracking-[-0.02em]">
              보형물 안전성 · 검진 안내
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Ultrasound */}
              <div className="text-center">
                <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden">
                  <Image
                    src="/보형물 가이드 페이지 사진/6(초음파 검사).jpg"
                    alt="초음파 검사"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[15px] font-semibold text-[#2a2a2a] mb-2">보형물 삽입 후에도</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  초음파·맘모그래피·MRI 등<br />
                  모든 유방 검진이 가능합니다.
                </p>
              </div>

              {/* Breast Cancer */}
              <div className="text-center">
                <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden">
                  <Image
                    src="/보형물 가이드 페이지 사진/7(유방암검사).jpg"
                    alt="유방암 검사"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[15px] font-semibold text-[#2a2a2a] mb-2">보형물은 유방암 검사에</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  장애가 되지 않으며<br />
                  수유 및 아기 건강에도 영향이 없습니다.
                </p>
              </div>

              {/* MRI */}
              <div className="text-center">
                <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden">
                  <Image
                    src="/보형물 가이드 페이지 사진/8(MRI정밀진단).jpg"
                    alt="MRI 정밀진단"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[15px] font-semibold text-[#2a2a2a] mb-2">파손 여부는 초음파로 확인하며</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  필요 시 MRI로 정밀 진단이 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
