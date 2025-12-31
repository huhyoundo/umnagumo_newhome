'use client';

import { useRef, useState, useCallback } from 'react';
import Image from './SafeImage';

interface InteractiveSculptureProps {
    imageSrc: string;
}

export default function InteractiveSculpture({ imageSrc }: InteractiveSculptureProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // Smooth lerp for mouse movement
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    // We use a separate state for the animated values to decouple from the event loop
    const [animatedPos, setAnimatedPos] = useState({ x: 0, y: 0 });
    const requestRef = useRef<number>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    // Animation loop
    useEffect(() => {
        const animate = () => {
            setAnimatedPos(prev => ({
                x: lerp(prev.x, mousePos.x, 0.1),
                y: lerp(prev.y, mousePos.y, 0.1),
            }));
            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [mousePos]);

    const rotateX = animatedPos.y * -10; // Tilt range
    const rotateY = animatedPos.x * 10;

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full perspective-[1000px] cursor-none" // Using custom cursor feel
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="relative w-full h-full transform-style-3d transition-transform duration-100 ease-out"
                style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                }}
            >
                {/* Parallax Frame 1 (Back) */}
                <div
                    className="absolute -top-6 -left-6 w-36 h-36 border border-[var(--navy)]/40 z-0"
                    style={{
                        transform: `translateZ(-40px) translateX(${animatedPos.x * 20}px) translateY(${animatedPos.y * 20}px)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                />

                {/* Main Image Container */}
                <div
                    className="relative w-[280px] h-[380px] md:w-[340px] md:h-[460px] mx-auto overflow-hidden shadow-2xl rounded-sm bg-white transform-style-3d z-10"
                    style={{
                        transform: 'translateZ(0px)',
                    }}
                >
                    <Image
                        src={imageSrc}
                        alt="Sculpture"
                        fill
                        className="object-contain transform transition-transform duration-500"
                        style={{
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                        quality={100}
                        sizes="(max-width: 768px) 280px, 340px"
                    />

                    {/* Lighting/Sheen Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
                        style={{
                            background: `linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)`,
                            transform: `translateX(${(animatedPos.x - 0.5) * 200}%)`,
                            opacity: isHovered ? 1 : 0,
                        }}
                    />
                </div>

                {/* Parallax Frame 2 (Front) */}
                <div
                    className="absolute -bottom-6 -right-6 w-36 h-36 border border-[var(--navy)]/40 z-20"
                    style={{
                        transform: `translateZ(40px) translateX(${animatedPos.x * -30}px) translateY(${animatedPos.y * -30}px)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                />

                {/* Custom floating cursor element for 'interactive' feel */}
                {isHovered && (
                    <div
                        className="absolute w-12 h-12 rounded-full border border-[var(--navy)] pointer-events-none z-50 flex items-center justify-center opacity-50"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(${animatedPos.x * 300}px, ${animatedPos.y * 400}px) translateZ(80px)`,
                        }}
                    >
                        <div className="w-1 h-1 bg-[var(--navy)] rounded-full" />
                    </div>
                )}
            </div>
        </div>
    );
}

import { useEffect } from 'react';
