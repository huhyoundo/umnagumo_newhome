import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: '의료진 소개 | 엄나구모 성형외과',
  description: '엄나구모 성형외과 의료진 - 축적된 경험과 전문적 기술로 가장 자연스러운 아름다움을 완성합니다.',
};

export default function DoctorsPage() {
  return (
    <>
      <Header />
      <main className="pt-[70px] md:pt-0">
        {/* Hero Banner - 메인 상단 이미지 */}
        <section className="relative w-full">
          <Image
            src="/의료진 페이지 사진/1(메인-상단).jpg"
            alt="엄나구모 성형외과"
            width={1920}
            height={800}
            className="w-full h-auto"
            priority
            quality={100}
          />
        </section>

        {/* 엄나구모 의료진 소개 */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
            <h2 className="text-[22px] md:text-[28px] font-semibold text-[#2a2a2a] mb-6 tracking-[-0.02em]">
              엄나구모 의료진 소개
            </h2>
            <p className="text-[14px] md:text-[15px] text-gray-600 leading-[1.9]">
              축적된 경험과 현대적 기술로 가장 자연스러운 아름다움을 실현합니다.<br />
              체형 조건을 기반으로 한 정교한 디자인과 정확한 시술, 수술 이후의 모든 과정에서 한 분 한 분을 세심하게 돌보겠습니다.
            </p>
          </div>
        </section>

        {/* 구분선 */}
        <div className="flex justify-center">
          <div className="w-px h-20 bg-gray-300" />
        </div>

        {/* 엄순천 대표원장 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Doctor Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-[340px] h-[450px] md:w-[420px] md:h-[560px]">
                  <Image
                    src="/의료진 페이지 사진/2(대표원장님).jpg"
                    alt="엄순천 대표원장"
                    fill
                    className="object-cover"
                    quality={100}
                    sizes="(max-width: 768px) 340px, 420px"
                  />
                </div>
              </div>

              {/* Doctor Info */}
              <div className="lg:pt-8">
                <p className="text-[13px] text-gray-500 mb-1">성형외과전문의</p>
                <h2 className="text-[26px] md:text-[32px] font-semibold text-[#2a2a2a] mb-1 tracking-[-0.02em]">
                  엄순천 대표원장
                </h2>
                <div className="w-8 h-[2px] bg-[#2a2a2a] mb-6" />

                <div className="space-y-2 text-[13px] md:text-[14px] text-gray-600 leading-relaxed">
                  <p>순천향대학교 의과대학 졸업</p>
                  <p>일본 교토대학교 부속병원 성형외과 전공의 수련</p>
                  <p>일본 교토대학교 의학부 의학연구과 의과학박사</p>
                  <p>일본 도쿄 가슴전문 나구모 클리닉 수석의사</p>
                  <p>한국 성형외과 전문의 취득</p>
                  <p>대한 성형외과의사 정회원</p>
                  <p>대한 성형외과의사시험 정회원</p>
                  <p>미간 미용성형외과학회 정회원</p>
                  <p>대한 성형외과학회 정회원</p>
                  <p>대한 미용성형외과학회 정회원</p>
                  <p>대한 성형외과 유방성형연구회 학술위원</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 남정현 원장 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Doctor Info */}
              <div className="order-2 lg:order-1 lg:pt-8">
                <p className="text-[13px] text-gray-500 mb-1">성형외과전문의</p>
                <h2 className="text-[26px] md:text-[32px] font-semibold text-[#2a2a2a] mb-1 tracking-[-0.02em]">
                  남정현 원장
                </h2>
                <div className="w-8 h-[2px] bg-[#2a2a2a] mb-6" />

                <div className="space-y-2 text-[13px] md:text-[14px] text-gray-600 leading-relaxed">
                  <p>순천향대학교 의과대학 졸업</p>
                  <p>순천향대학병원 성형외과 전문의</p>
                  <p>순천향대학교 대학원 성형외과학 석사</p>
                  <p>대한 성형외과의사 정회원</p>
                  <p>대한 성형외과학회 정회원</p>
                  <p>대한 미용성형외과학회 정회원</p>
                </div>
              </div>

              {/* Doctor Image */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative w-[340px] h-[450px] md:w-[420px] md:h-[560px]">
                  <Image
                    src="/의료진 페이지 사진/3(남정현-원장님).jpg"
                    alt="남정현 원장"
                    fill
                    className="object-cover"
                    quality={100}
                    sizes="(max-width: 768px) 340px, 420px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 엄나구모의 역사 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-[22px] md:text-[28px] font-semibold text-[#2a2a2a] mb-3 tracking-[-0.02em]">
                엄나구모의 역사
              </h2>
              <p className="text-[14px] text-gray-500 mb-8">
                100년을 향하는 엄나구모의 기술과 철학
              </p>
              {/* 역사 대표 이미지 */}
              <div className="relative w-full max-w-[1000px] mx-auto aspect-[16/9] mb-8">
                <Image
                  src="/의료진 페이지 사진/4.jpg"
                  alt="엄나구모의 역사"
                  fill
                  className="object-cover rounded-lg"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 1000px"
                />
              </div>
            </div>

            {/* 일본 나구모 의학 가문 Timeline */}
            <div className="mb-16">
              <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
                {/* Left - Title & Image */}
                <div>
                  <h3 className="text-[15px] md:text-[16px] font-semibold text-[#2a2a2a] mb-4">
                    일본 나구모 의학 가문 (1903-현재)
                  </h3>
                  <div className="relative w-full aspect-square max-w-[240px]">
                    <Image
                      src="/의료진 페이지 사진/5(확인증).jpg"
                      alt="나구모 의학 가문"
                      fill
                      className="object-contain"
                      quality={100}
                      sizes="240px"
                    />
                  </div>
                </div>

                {/* Right - Timeline */}
                <div className="space-y-3 text-[13px] md:text-[14px] text-gray-600">
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">1903년</span>
                    <span>일본 나구모 의학 가문 창립, 도쿄의 의학교육 시작</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">1920년</span>
                    <span>나구모 가문 2대, 외과 전문의로 확립</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">1945년</span>
                    <span>전후 재건성형외과 봉사 개척</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">1960년</span>
                    <span>나구모 가문 3대, 일본 최초 가슴전문 외과 출범</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">1975년</span>
                    <span>도쿄 나구모 클리닉 본원 설립</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">1985년</span>
                    <span>나고야, 오사카 분원 개원</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">1995년</span>
                    <span>후쿠오카 분원 개원, 일본 4대 도시 네트워크 완성</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2000년</span>
                    <span>가슴재수술 5,000례 돌파</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2010년</span>
                    <span>가슴재수술 10,000례 돌파</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 한국 엄나구모성형외과 Timeline */}
            <div>
              <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
                {/* Left - Title & Image */}
                <div>
                  <h3 className="text-[15px] md:text-[16px] font-semibold text-[#2a2a2a] mb-4">
                    한국 엄나구모성형외과 (2008-현재)
                  </h3>
                  <div className="relative w-full aspect-[4/3] max-w-[260px]">
                    <Image
                      src="/의료진 페이지 사진/6(병원사진).jpg"
                      alt="엄나구모 병원"
                      fill
                      className="object-cover"
                      quality={100}
                      sizes="260px"
                    />
                  </div>
                </div>

                {/* Right - Timeline */}
                <div className="space-y-3 text-[13px] md:text-[14px] text-gray-600">
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2008년</span>
                    <span>엄순천 원장, 일본 교토대학교 의학박사 박사과정학위 취득</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2009년</span>
                    <span>일본 도쿄 나구모 클리닉 수석의사 임명</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2010년</span>
                    <span>나구모 클리닉 한국인 최초 수석의사, 12년간 도쿄와 교육 활동 계속</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2012년</span>
                    <span>한국 성형외과 전문의 취득</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2013년</span>
                    <span>서울 강남 논현동 엄나구모성형외과 개원</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2014년</span>
                    <span>가슴성형 500례 달성</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2015년</span>
                    <span>대한성형외과학회 정회원 등록</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2016년</span>
                    <span>가슴성형 1,000례 돌파</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2017년</span>
                    <span>겨드랑이 절개 가슴수술 특화 시스템 구축</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2018년</span>
                    <span>가슴성형 2,000례 달성</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2019년</span>
                    <span>대한미용성형외과학회 창립회원 등록</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2020년</span>
                    <span>비대면 온라인 상담 시스템 도입</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2021년</span>
                    <span>가슴성형 3,000례 돌파</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2022년</span>
                    <span>3D 가슴성형 시뮬레이션 도입</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2023년</span>
                    <span>엄나구모 10주년, 가슴성형 4,000례 돌파</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2024년</span>
                    <span>12년간 전통 계승 기념 학술 심포지엄 개최</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#8B7355] font-medium min-w-[60px]">2025년</span>
                    <span>현재 - 한국 대표 가슴성형 전문 클리닉으로 자리매김</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
