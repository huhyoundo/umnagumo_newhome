'use client';

import Image from './SafeImage';
import { useRef, useState, useEffect } from 'react';

function useScrollAnimation(threshold = 0.2) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}

export default function ScarCareSection() {
    const { ref, isVisible } = useScrollAnimation(0.1);

    return (
        <section ref={ref} className="py-24 bg-white">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

                {/* Header Design */}
                <div className="text-center mb-16">
                    <h2 className="text-[40px] md:text-[52px] font-black tracking-tighter text-[#111] mb-4"
                        style={{
                            fontFamily: 'var(--font-montserrat), sans-serif',
                        }}
                    >
                        After<br />Surgery Care
                    </h2>

                    <div className="flex items-center justify-center gap-3 mb-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--navy)]"></span>
                        <span className="text-[20px] md:text-[24px] font-bold text-[var(--ink)]">
                            흉터걱정 <span className="font-black text-[var(--navy)]">ZERO</span>
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--navy)]"></span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <span className="px-6 py-3 rounded-full bg-white border-2 border-[var(--navy)] text-[var(--navy)] font-bold text-[14px] md:text-[16px] shadow-[4px_4px_0px_rgba(29,35,86,0.1)]">
                            깔끔한 절개라인 및 3중 봉합
                        </span>
                        <span className="px-6 py-3 rounded-full bg-[var(--navy)] text-white font-bold text-[14px] md:text-[16px] shadow-[4px_4px_0px_rgba(29,35,86,0.2)]">
                            수술 후 흉터관리
                        </span>
                    </div>
                </div>

                {/* Scar Images Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { img: 1, label: '겨드랑이 절개 6개월 후' },
                        { img: 2, label: '겨드랑이 절개 6개월 후' },
                        { img: 3, label: '겨드랑이 절개 6개월 후' },
                        { img: 4, label: '겨드랑이 절개 6개월 후' }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="group relative aspect-square rounded-[24px] overflow-hidden bg-gray-100 shadow-lg"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'all 0.6s ease-out',
                                transitionDelay: `${0.2 + index * 0.1}s`
                            }}
                        >
                            <Image
                                src={`/assets/scars/scar${item.img}.jpg`}
                                alt={item.label}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(min-width: 1024px) 300px, 50vw"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                <span className="inline-block px-3 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[12px] font-bold text-[var(--navy)] shadow-sm">
                                    {item.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <p
                    className="text-center text-[13px] text-[var(--ink-muted)] mt-12 bg-gray-50 py-3 rounded-lg max-w-2xl mx-auto"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.6s ease-out 0.8s'
                    }}
                >
                    * 개인의 살성에 따라 회복 속도와 흉터의 정도는 차이가 있을 수 있습니다.
                </p>

            </div>
        </section>
    );
}
