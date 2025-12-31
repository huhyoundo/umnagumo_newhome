'use client';

import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface TimelineStep {
    period: string;
    items: string[];
}

interface PostOpTimelineProps {
    steps?: TimelineStep[];
}

export default function PostOpTimeline({ steps: customSteps }: PostOpTimelineProps) {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    const defaultSteps = [
        {
            period: '1주',
            items: ['상태 확인 및 안내', '염증반응 혈액검사', '겨드랑이 처치'],
        },
        {
            period: '3주',
            items: ['캡스 기계관리', '마사지 지도교육', '경과체크'],
        },
        {
            period: '6주',
            items: ['캡스 기계관리', '경과체크', '가슴 수기마사지 체크'],
        },
        {
            period: '2달 반~3달',
            items: ['캡스 기계관리', '경과체크', '가슴 수기마사지 체크'],
        },
    ];

    const steps = customSteps || defaultSteps;

    return (
        <div ref={ref} className="py-20 md:py-28 bg-[var(--paper-2)] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[var(--gold)]/10 to-transparent blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[var(--navy)]/5 to-transparent blur-3xl" />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 lg:px-16 relative z-10">
                {/* Title */}
                <div className="text-center mb-16 md:mb-20">
                    <p
                        className={`font-display text-[12px] tracking-[0.2em] uppercase font-medium mb-4 text-[var(--navy)] transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    >
                        AFTER CARE PROCESS
                    </p>
                    <h2 className="text-[28px] md:text-[36px] font-semibold text-[var(--ink)] tracking-[-0.02em]">
                        <span className={`inline-block transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            엄나구모 성형외과
                        </span>{' '}
                        <span className={`inline-block transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <span className="text-gradient-shift">수술 후 병원 내원</span>
                        </span>{' '}
                        <span className={`inline-block transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            타임라인
                        </span>
                    </h2>
                </div>

                {/* Timeline Grid */}
                <div className="flex flex-wrap justify-center gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] group relative bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-[var(--line)] cursor-default
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Header */}
                            <div className="bg-[#6b5b50] py-5 relative overflow-hidden group-hover:bg-[#5a4b41] transition-colors duration-500">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <h3 className="text-center text-white text-[18px] md:text-[20px] font-bold tracking-tight relative z-10">
                                    {step.period}
                                </h3>
                            </div>

                            {/* Body */}
                            <div className="p-8 flex flex-col items-center justify-center min-h-[220px] relative">
                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="space-y-4 relative z-10 w-full">
                                    {step.items.map((item, i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            {i > 0 && (
                                                <div className="h-4 w-[1px] bg-[var(--line)] my-1 relative overflow-hidden">
                                                    <div className="absolute top-0 left-0 w-full h-full bg-[var(--gold)] -translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-300" />
                                                </div>
                                            )}

                                            {i > 0 && (
                                                <div className="text-[var(--gold)] text-[10px] mb-2 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                                    +
                                                </div>
                                            )}

                                            <p className="text-[15px] md:text-[16px] text-[#444] font-medium text-center break-keep leading-snug group-hover:text-[var(--ink)] transition-colors duration-300">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Line Animation */}
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--navy)] to-[var(--gold)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
