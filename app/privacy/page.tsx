import type { Metadata } from 'next';
import Header from '../components/Header';
import FooterDeferred from '../components/deferred/FooterDeferred';
import { createPageMetadata } from '../lib/seo';

export const metadata: Metadata = {
    ...createPageMetadata({
        title: '개인정보 처리방침',
        description: '엄나구모 성형외과 개인정보 처리방침입니다.',
        path: '/privacy',
    }),
    robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />
            <main className="pt-[120px] pb-24 min-h-screen bg-[var(--paper)]">
                <div className="max-w-[800px] mx-auto px-6">
                    <h1 className="text-3xl font-bold text-[var(--navy)] mb-12 pb-6 border-b border-line">
                        개인정보 처리방침
                    </h1>

                    <div className="space-y-12 text-[var(--ink)] leading-relaxed">
	                        <section>
	                            <p className="mb-6">
	                                엄나구모성형외과의원(이하 &apos;본원&apos;)은 고객님의 개인정보를 소중히 여기며, 「개인정보 보호법」 및 「의료법」 등 관련 법령을 철저히 준수하고 있습니다. 본원은 개인정보 처리방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보 보호를 위해 어떠한 조치가 취해지고 있는지 안내해 드립니다.
	                            </p>
	                            <p className="font-medium text-[var(--navy)]">
	                                본 방침은 2025년 1월 20일부터 시행됩니다.
	                            </p>
	                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[var(--navy)] mb-6">제 1 조 (개인정보의 수집 항목 및 방법)</h2>
                            <p className="mb-4">본원은 진료 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>

                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="font-bold mb-2">1. 수집 항목</h3>
                                    <ul className="list-disc ml-5 space-y-1 text-sm text-[var(--ink-muted)]">
                                        <li><span className="font-medium text-[var(--ink)]">필수항목:</span> 성명, 생년월일, 성별, 연락처, 주소</li>
                                        <li><span className="font-medium text-[var(--ink)]">진료정보:</span> 진료기록, 수술이력, 건강상태, 신체정보(신장, 체중 등)</li>
                                        <li><span className="font-medium text-[var(--ink)]">결제정보:</span> 카드번호, 결제승인내역 등 진료비 수납에 필요한 정보</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold mb-2">2. 수집 방법</h3>
                                    <p className="text-sm text-[var(--ink-muted)] ml-5">
                                        홈페이지, 전화, 카카오톡 상담, 내원 상담, 진료 접수 시 서면 작성
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[var(--navy)] mb-6">제 2 조 (개인정보의 수집 및 이용 목적)</h2>
                            <p className="mb-4">본원은 수집한 개인정보를 다음의 목적으로만 이용합니다.</p>
                            <ul className="list-disc ml-5 space-y-2 text-sm text-[var(--ink-muted)]">
                                <li>진료 예약, 상담 및 본인 확인</li>
                                <li>진단, 수술, 시술 및 사후관리 서비스 제공</li>
                                <li>진료비 청구, 수납, 환불 등 원무 업무</li>
                                <li>진료 관련 안내 및 고객 문의 응대</li>
                                <li>의료 서비스 품질 향상을 위한 통계 분석</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[var(--navy)] mb-6">제 3 조 (개인정보의 제 3 자 제공)</h2>
                            <p className="mb-4">본원은 원칙적으로 고객님의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다.</p>
                            <ul className="list-disc ml-5 space-y-2 text-sm text-[var(--ink-muted)]">
                                <li>고객님이 사전에 동의한 경우</li>
                                <li>「국민건강보험법」에 따른 요양급여비용 청구</li>
                                <li>법령에 의거하거나 수사기관의 적법한 요청이 있는 경우</li>
                                <li>통계 작성 및 학술연구 목적으로 특정 개인을 식별할 수 없는 형태로 제공하는 경우</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[var(--navy)] mb-6">제 4 조 (개인정보의 보유 및 이용 기간)</h2>
                            <p className="text-sm text-[var(--ink-muted)]">
                                본원은 법령에서 정한 보존기간 동안 개인정보를 보유합니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[var(--navy)] mb-6">제 5 조 (개인정보의 파기절차 및 방법)</h2>
                            <p className="mb-4">본원은 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.</p>
                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="font-bold mb-2">1. 파기절차</h3>
                                    <p className="text-sm text-[var(--ink-muted)] ml-5">
                                        고객님의 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기됩니다.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">2. 파기방법</h3>
                                    <ul className="list-disc ml-5 space-y-1 text-sm text-[var(--ink-muted)]">
                                        <li>전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
                                        <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[var(--navy)] mb-6">제 6 조 (이용자 및 법정대리인의 권리와 그 행사방법)</h2>
                            <p className="mb-4">이용자 및 법정대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.</p>
                            <ul className="list-disc ml-5 space-y-2 text-sm text-[var(--ink-muted)]">
                                <li>내원하여 본인 확인 절차를 거친 후 열람, 정정 및 삭제가 가능합니다.</li>
                                <li>개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[var(--navy)] mb-6">제 7 조 (개인정보의 안전성 확보조치)</h2>
                            <p className="mb-4">본원은 고객님의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 대책을 강구하고 있습니다.</p>
                            <ul className="list-disc ml-5 space-y-2 text-sm text-[var(--ink-muted)]">
                                <li>개인정보의 암호화: 고객님의 중요한 정보는 암호화되어 저장/관리되고 있습니다.</li>
                                <li>해킹 등에 대비한 대책: 백신프로그램을 이용하고, 침입차단시스템을 가동하고 있습니다.</li>
                                <li>취급 직원의 최소화 및 교육: 개인정보 취급 직원은 담당자에 한정시키고 있으며, 정기적인 교육을 실시하고 있습니다.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[var(--navy)] mb-6">제 8 조 (개인정보 보호책임자)</h2>
                            <p className="mb-4">본원은 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호책임자를 지정하고 있습니다.</p>
                            <div className="bg-[rgba(29,35,86,0.05)] p-6 rounded-lg text-sm">
                                <ul className="space-y-2">
                                    <li className="flex"><span className="w-24 font-bold text-[var(--navy)]">책임자</span> <span className="text-[var(--ink)]">행정원장</span></li>
                                    <li className="flex"><span className="w-24 font-bold text-[var(--navy)]">담당부서</span> <span className="text-[var(--ink)]">원무행정팀</span></li>
                                    <li className="flex"><span className="w-24 font-bold text-[var(--navy)]">전화번호</span> <span className="text-[var(--ink)]">02-512-6838</span></li>
                                </ul>
                            </div>
                        </section>

                        <section>
	                            <h2 className="text-xl font-bold text-[var(--navy)] mb-6">제 9 조 (고지의 의무)</h2>
	                            <p className="text-sm text-[var(--ink-muted)]">
	                                현 개인정보 처리방침은 2025년 1월 20일부터 적용됩니다. 내용의 추가, 삭제 및 수정이 있을 시에는 홈페이지의 &apos;공지사항&apos;을 통해 고지할 것입니다.
	                            </p>
	                        </section>
	                    </div>
	                </div>
            </main>
            <FooterDeferred />
        </>
    );
}
