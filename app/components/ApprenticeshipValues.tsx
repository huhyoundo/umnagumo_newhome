'use client';

import { useRef, useState, useEffect } from 'react';

export default function ApprenticeshipValues() {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const values = [
        {
            id: '01',
            enTitle: 'Training Method',
            koTitle: '수련 방식',
            desc: [
                <>스승이 제자의 뒤에서<br />손을 직접 잡아주며 지도</>,
                <>매일 수술 후 스승의<br />직접평가 및 피드백</>,
                <>기구 파지법부터 배우는<br />기본기 훈련</>,
                <>일만 번의 반복이 한 번의<br />완벽한 수술이 될 때까지</>,
            ],
        },
        {
            id: '02',
            enTitle: 'Philosophy',
            koTitle: '핵심 철학',
            desc: [
                <>“수술은 수학이 아니다”<br />- 이론을 넘어선 직관과 응용력</>,
                <>첫수술 환자 임상으로<br />기술을 갈고닦지 않음</>,
                <>스승에서 제자로, 그 제자가<br />다시 스승이 되는 계승 구조</>,
            ],
        },
        {
            id: '03',
            enTitle: 'Differentiation',
            koTitle: '차별점',
            desc: [
                <>대형병원에서 가르치지 않는<br />고난도 술기 직접 전수</>,
                '경쟁사가 될 것을 우려해 간단한 술기만 가르치는 일반 병원과 차별화',
                '오직 환자의 결과에만 집중하는 문화',
            ],
        },
    ];

    return (
        <div ref={containerRef} className="py-24 max-w-[1300px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-3 gap-0 border-t border-[var(--navy)]/10">
                {values.map((item, idx) => (
                    <div
                        key={idx}
                        className="group relative border-b lg:border-b-0 lg:border-r border-[var(--navy)]/10 last:border-r-0 p-10 lg:p-14 transition-all duration-500 hover:bg-[var(--paper)]"
                        onMouseEnter={() => setActiveIdx(idx)}
                        onMouseLeave={() => setActiveIdx(null)}
                    >
                        {/* Background Hover Effect */}
                        <div
                            className="absolute top-0 left-0 w-full h-[2px] bg-[var(--gold)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                        />

                        {/* Content */}
                        <div
                            className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: `${idx * 150}ms` }}
                        >
                            <div className="flex items-baseline justify-between mb-8">
                                <span className="font-serif text-[42px] text-[var(--gold)] opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                                    {item.id}
                                </span>
                                <span className="text-[14px] font-bold text-[var(--navy)] tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                    Apprenticeship
                                </span>
                            </div>

                            <h3 className="font-serif text-[32px] md:text-[38px] leading-tight text-[var(--navy)] mb-6 group-hover:text-[var(--gold)] transition-colors duration-300">
                                {item.enTitle}
                            </h3>

                            <div className="w-12 h-[1px] bg-[var(--navy)]/20 mb-8 group-hover:w-full group-hover:bg-[var(--gold)]/40 transition-all duration-500" />

                            <h4 className="text-[18px] font-semibold text-[var(--navy)] mb-6">
                                {item.koTitle}
                            </h4>

                            <ul className="space-y-3">
                                {item.desc.map((d, i) => (
                                    <li
                                        key={i}
                                        className="text-[15px] text-[var(--ink-muted)] leading-relaxed font-light group-hover:text-[var(--ink)] transition-colors duration-300 flex items-start gap-3 break-keep"
                                    >
                                        <span className="inline-block w-1 h-1 rounded-full bg-[var(--gold)] mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
                                        <span>{d}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
