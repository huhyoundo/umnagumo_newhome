'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Use specific fonts via CSS variables defined in layout
// --font-cormorant
// --font-noto-serif
// --font-montserrat

export default function NamStylePage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-[#F8F6F3] overflow-x-hidden selection:bg-[#C9A962] selection:text-[#0A0A0A]">
            <style jsx global>{`
        :root {
          --gold: #C9A962;
          --gold-light: #E8D5A3;
          --gold-dark: #8B7355;
          --black: #0A0A0A;
          --charcoal: #1A1A1A;
          --gray-dark: #2A2A2A;
          --white: #F8F6F3;
        }
        
        .font-cormorant { font-family: var(--font-cormorant), serif; }
        .font-noto { font-family: var(--font-noto-serif), serif; }
        .font-montserrat { font-family: var(--font-montserrat), sans-serif; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.02); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1.5s ease-out forwards;
        }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
      `}</style>

            {/* Noise Overlay */}
            <div
                className="fixed inset-0 opacity-[0.02] pointer-events-none z-50"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Header */}
            <header className="fixed top-0 left-0 w-full px-8 py-8 md:px-[60px] md:py-[30px] flex justify-between items-center z-[100] bg-gradient-to-b from-[#0A0A0A]/90 to-transparent">
                <div className="flex flex-col">
                    <Link href="/" className="font-cormorant text-[14px] tracking-[4px] text-[var(--gold)] uppercase hover:opacity-80 transition-opacity">
                        EOM NAGUMO
                    </Link>
                    <span className="font-noto text-[10px] tracking-[2px] text-[var(--gold-light)] opacity-70 mt-1">
                        Plastic Surgery
                    </span>
                </div>

                <Link
                    href="/doctors"
                    className="font-montserrat text-[10px] tracking-[2px] text-[var(--gold)] border border-[var(--gold)] px-4 py-2 rounded-full hover:bg-[var(--gold)] hover:text-black transition-all duration-300"
                >
                    BACK TO DOCTORS
                </Link>
            </header>

            {/* Hero Section */}
            <section className="h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0" style={{
                        background: `radial-gradient(ellipse at 30% 50%, rgba(201, 169, 98, 0.08) 0%, transparent 50%),
                          radial-gradient(ellipse at 70% 70%, rgba(201, 169, 98, 0.05) 0%, transparent 40%)`
                    }} />
                </div>

                <div className="text-center z-10 px-4">
                    <p className="font-montserrat text-[11px] tracking-[8px] text-[var(--gold)] uppercase mb-[30px] opacity-0 animate-fadeInUp delay-200">
                        Dr. Nam Jung-Hyun's Breast Philosophy
                    </p>
                    <h1 className="font-cormorant text-[42px] md:text-[80px] font-light tracking-[6px] leading-[1.2] mb-[40px] opacity-0 animate-fadeInUp delay-400">
                        Internal Sculpting<br />
                        <span className="italic text-[var(--gold)]">Breast</span>
                    </h1>
                    <div className="w-[80px] h-[1px] mx-auto mb-[40px] opacity-0 animate-fadeInUp delay-600"
                        style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
                    />
                    <p className="font-noto text-[16px] font-light text-[#F8F6F3]/70 max-w-[600px] mx-auto opacity-0 animate-fadeInUp delay-800 leading-relaxed">
                        가슴은 크게 만드는 수술이 아니라,<br />
                        몸 안의 공간을 조각하는 작업입니다.
                    </p>
                </div>

                <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[10px] animate-bounce">
                    <span className="font-montserrat text-[9px] tracking-[3px] text-[var(--gold-light)] opacity-50">SCROLL</span>
                    <div className="w-[1px] h-[40px]" style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
                </div>
            </section>

            {/* Philosophy Section */}
            <PhilosophyContent />

            {/* Technologies Section */}
            <TechnologiesContent />

            {/* Style Elements Section */}
            <StyleElementsContent />

            {/* Closing Section */}
            <section className="py-[150px] px-[30px] md:px-[60px] text-center relative bg-gradient-to-b from-[var(--charcoal)] to-[var(--black)]">
                <p className="font-noto text-[20px] md:text-[28px] font-light leading-[2] max-w-[800px] mx-auto mb-[60px] text-[#F8F6F3]/90">
                    엄나구모의 가슴은<br />
                    <strong className="font-normal text-[var(--gold)]">'보이는 예쁨'</strong>이 아닌<br />
                    <strong className="font-normal text-[var(--gold)]">'느껴지는 자연스러움'</strong>을 목표로 합니다.
                </p>
                <div className="flex flex-col items-center gap-[15px]">
                    <div className="w-[60px] h-[1px] bg-[var(--gold)] mb-[20px]" />
                    <span className="font-noto text-[18px] tracking-[4px] font-normal">남 정 현</span>
                    <span className="font-montserrat text-[10px] tracking-[4px] text-[var(--gold)] uppercase">Plastic Surgeon · Eom Nagumo</span>
                </div>
            </section>

            {/* Footer */}
            <footer className="p-[60px] border-t border-[var(--gold)]/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                <div className="font-cormorant text-[12px] tracking-[3px] text-[var(--gold)] uppercase">Eom Nagumo Plastic Surgery</div>
                <div className="font-montserrat text-[10px] tracking-[2px] text-[#F8F6F3]/30">Internal Sculpting Breast · Dr. Nam Jung-Hyun</div>
            </footer>
        </div>
    );
}

// Client Components for Interactions

function PhilosophyContent() {
    const { ref, isVisible } = useScrollObserver();

    return (
        <section className="py-[100px] md:py-[150px] px-[30px] md:px-[60px] relative">
            <div className="font-montserrat text-[10px] tracking-[6px] text-[var(--gold)] uppercase mb-[60px] flex items-center gap-[20px]">
                <span className="w-[40px] h-[1px] bg-[var(--gold)]" />
                Philosophy
            </div>

            <div className="grid md:grid-cols-2 gap-[60px] md:gap-[100px] max-w-[1400px] mx-auto">
                <div
                    ref={ref}
                    className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <h2 className="font-noto text-[24px] md:text-[32px] font-light leading-[1.8] mb-[40px] text-[#F8F6F3]/90">
                        <strong className="font-normal text-[var(--gold)]">흉곽 구조</strong>, 근육 장력, 피부 탄성을<br />
                        분석해 <strong className="font-normal text-[var(--gold)]">자연스러운 곡선</strong>과<br />
                        움직임을 완성합니다.
                    </h2>
                    <p className="font-noto text-[15px] font-light leading-[2.2] text-[#F8F6F3]/60">
                        숫자로 정해진 사이즈가 아닌, 체형과 골격에 맞춘 퍼스널 디자인.<br />
                        보형물을 단순히 삽입하는 것이 아닌, 몸의 구조를 이해하고<br />
                        그 안에서 가장 아름다운 형태를 찾아가는 과정입니다.
                    </p>
                </div>

                <div className="relative flex items-center justify-center min-h-[300px]">
                    <div className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px]">
                        {/* Animated Rings mimicking CSS keyframes */}
                        <div className="absolute inset-0 border border-[var(--gold)] rounded-full opacity-30 animate-[pulse-ring_4s_ease-in-out_infinite]" />
                        <div className="absolute top-[12.5%] left-[12.5%] w-[75%] h-[75%] border border-[var(--gold)] rounded-full opacity-30 animate-[pulse-ring_4s_ease-in-out_infinite_0.5s]" />
                        <div className="absolute top-[25%] left-[25%] w-[50%] h-[50%] border border-[var(--gold)] rounded-full opacity-30 animate-[pulse-ring_4s_ease-in-out_infinite_1s]" />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <span className="font-cormorant text-[14px] tracking-[4px] text-[var(--gold)]">SCULPTING</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TechnologiesContent() {
    const { ref, isVisible } = useScrollObserver();
    const technologies = [
        { icon: "M15 25 Q25 15 35 25 Q25 35 15 25", name: "Gumo Frame Fit™", title: "흉곽 구조 기반 최적화", desc: "흉곽·늑골 구조를 분석하여 볼륨, 폭, 곡률을 최적화합니다. 체형에 따라 맞춰지는 퍼스널 가슴라인을 설계합니다." },
        { icon: "M25 13 A12 7 0 1 0 25 37 A12 7 0 1 0 25 13 Z M25 19 A6 3 0 1 0 25 31 A6 3 0 1 0 25 19 Z", name: "N.Shell Pocket™", title: "구형 구축 방지 설계", desc: "미세 포켓 설계로 구형 구축을 방지합니다. 단단하게 굳지 않고 오래가는 안정적인 가슴을 유지합니다." },
        { icon: "M10 20 Q25 35 40 20", name: "Natural Drop Curve™", title: "자연스러운 하방 곡선", desc: "브라를 벗었을 때 가장 자연스러운 하방 곡선을 구현합니다. 모양보다 '실루엣'을 우선하는 디자인 철학입니다." },
        { icon: "M15 25 C15 15 35 15 35 25 C35 35 15 35 15 25", name: "Soft-Tension Method™", title: "촉감·압력·장력 조절", desc: "촉감, 압력, 장력을 미세하게 조절하는 기술입니다. 말랑하지만 흘러내리지 않는 균형을 설계합니다." },
        { icon: "M25 17 A8 8 0 1 0 25 33 A8 8 0 1 0 25 17 Z", name: "No-Trace Areola™", title: "미세 흉터 최소화", desc: "유륜 절개의 미세 흉터를 최소화하는 기법입니다. 눈으로 보기 어려운 세밀한 절개 디자인을 제공합니다." },
        { icon: "M25 15 A15 10 0 1 0 25 35 A15 10 0 1 0 25 15 Z", name: "N-Light Hybrid Lift™", title: "하이브리드 설계", desc: "보형물과 지방을 조합한 하이브리드 설계입니다. 하드 볼륨이 아닌 부드러운 실루엣을 완성합니다." },
    ];

    return (
        <section className="py-[100px] md:py-[150px] px-[30px] md:px-[60px] bg-gradient-to-b from-transparent to-[var(--charcoal)]">
            <div className="font-montserrat text-[10px] tracking-[6px] text-[var(--gold)] uppercase mb-[60px] flex items-center gap-[20px]">
                <span className="w-[40px] h-[1px] bg-[var(--gold)]" />
                Proprietary Technologies
            </div>

            <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-[40px] max-w-[1400px] mx-auto">
                {technologies.map((tech, i) => (
                    <div
                        key={i}
                        className={`group bg-gradient-to-br from-[var(--gray-dark)]/50 to-[var(--charcoal)]/80 border border-[var(--gold)]/10 p-[40px] relative overflow-hidden transition-all duration-500 hover:border-[var(--gold)]/30 hover:-translate-y-1
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                    >
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="w-[50px] h-[50px] mb-[30px] text-[var(--gold)]">
                            <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
                                {/* Simplified path rendering for icons */}
                                <path d={tech.icon} />
                            </svg>
                        </div>

                        <div className="font-montserrat text-[11px] tracking-[3px] text-[var(--gold)] uppercase mb-[20px]">{tech.name}</div>
                        <div className="font-noto text-[18px] font-normal mb-[20px] leading-[1.6] text-[#F8F6F3]">{tech.title}</div>
                        <div className="font-noto text-[13px] font-light text-[#F8F6F3]/50 leading-[1.9]">{tech.desc}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function StyleElementsContent() {
    const { ref, isVisible } = useScrollObserver();
    const styles = [
        { num: '01', title: '과한 데콜테 금지', desc: '인위적으로 과장된 볼륨이 아닌, 자연스러운 라인을 추구합니다.' },
        { num: '02', title: '자연 하부폴드 곡선 강조', desc: '가슴 아래 라인의 자연스러운 곡선미를 살립니다.' },
        { num: '03', title: '바깥폭 밸런싱 중심', desc: '체형에 맞는 가슴 폭의 균형을 최우선으로 고려합니다.' },
        { num: '04', title: '움직임 중심의 디자인', desc: '정지된 모습이 아닌, 움직일 때 자연스러운 가슴을 설계합니다.' },
        { num: '05', title: '숫자보다 비율, 모양보다 촉감', desc: 'cc 단위의 숫자가 아닌, 전체적인 비율과 실제 촉감을 중시합니다.' },
    ];

    return (
        <section className="py-[150px] px-[30px] md:px-[60px] bg-[var(--charcoal)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[100px] bg-gradient-to-b from-[var(--gold)] to-transparent" />

            <div className="text-center mb-[100px]">
                <h2 className="font-cormorant text-[42px] font-light tracking-[4px] mb-[20px] text-[#F8F6F3]">남정현 스타일 5요소</h2>
                <p className="font-montserrat text-[11px] tracking-[4px] text-[var(--gold)] uppercase">The Five Principles</p>
            </div>

            <div ref={ref} className="max-w-[900px] mx-auto">
                {styles.map((item, i) => (
                    <div
                        key={i}
                        className={`grid grid-cols-[60px_1fr] gap-[40px] py-[40px] border-b border-[var(--gold)]/10 items-start transition-all duration-300 hover:pl-[20px] hover:border-[var(--gold)]/30
               ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[20px]'}`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                    >
                        <div className="font-cormorant text-[36px] font-light text-[var(--gold)] opacity-50">{item.num}</div>
                        <div>
                            <h3 className="font-noto text-[20px] font-normal mb-[12px] text-[#F8F6F3]">{item.title}</h3>
                            <p className="font-noto text-[14px] font-light text-[#F8F6F3]/50">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function useScrollObserver() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
}
