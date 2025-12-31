'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from './SafeImage';

export default function InteractiveLogoPoster() {
    const containerRef = useRef<HTMLDivElement>(null);
    // Target values (where the mouse is)
    const [target, setTarget] = useState({ x: 0, y: 0 });
    // Current values (for smooth animation)
    const [current, setCurrent] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const rafRef = useRef<number>(null);

    // Linear Interpolation for smoothness
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTarget({ x, y });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setTarget({ x: 0, y: 0 });
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    // Animation Loop
    useEffect(() => {
        const animate = () => {
            setCurrent(prev => ({
                x: lerp(prev.x, target.x, 0.1), // 0.1 factor for "elegant" smoothness
                y: lerp(prev.y, target.y, 0.1),
            }));
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [target]);

    // Calculate dynamic styles based on smoothed 'current' values
    // Rolling number animation for year
    const [year, setYear] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const targetYear = 1988;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) {
            setYear(0);
            return;
        }

        const duration = 2000;
        const startTime = Date.now();

        const animateYear = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // EaseOutQuart
            const ease = 1 - Math.pow(1 - progress, 4);

            const currentYear = Math.floor(ease * targetYear);
            setYear(currentYear);

            if (progress < 1) {
                requestAnimationFrame(animateYear);
            }
        };

        requestAnimationFrame(animateYear);
    }, [isVisible]);

    // Reduced angles for elegance: max +/- 8 degrees instead of 15
    const rotateX = current.y * -8;
    const rotateY = current.x * 8;

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/11] perspective-[1500px] group"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* 3D Card Container */}
            <div
                className="relative w-full h-full preserve-3d will-change-transform"
                style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
                    transition: 'transform 0.1s linear',
                    boxShadow: isHovered
                        ? '0 30px 60px -20px rgba(0,0,0,0.2)'
                        : '0 10px 30px -10px rgba(0,0,0,0.05)',
                }}
            >
                {/* Main Image - Full Cover with rounded corners */}
                <div className="absolute inset-0 rounded-[20px] overflow-hidden transform translate-z-[1px] bg-[#f5f5f5]">
                    <Image
                        src="/메인페이지 사진/info_sculpture_clean.png"
                        alt="UMNAGUMO BRAND SCULPTURE"
                        fill
                        className="object-cover brightness-[1.15]"
                        priority
                    />
                </div>

                {/* Specular Edge Highlight (Rim Light) */}
                <div
                    className="absolute inset-0 rounded-[20px] pointer-events-none border border-white/60"
                    style={{
                        opacity: isHovered ? 1 : 0.3,
                        transition: 'opacity 0.6s ease'
                    }}
                />

                {/* Custom Pill Badge - Floating Effect */}
                <div
                    className="absolute bottom-6 left-6 z-50 pointer-events-none preserve-3d"
                    style={{
                        transform: 'translateZ(30px)',
                    }}
                >
                    <div className="bg-black/80 backdrop-blur-sm text-white px-5 py-2.5 rounded-full flex items-center gap-3 shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                        <span className="text-[11px] tracking-[0.2em] font-medium uppercase font-display text-white/90 min-w-[80px]">
                            Since {year}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
