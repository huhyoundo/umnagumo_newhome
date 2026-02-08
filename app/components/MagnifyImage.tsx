'use client';

import React, { useState, useRef } from 'react';
import SafeImage from './SafeImage';
import { ImageProps } from 'next/image';

interface MagnifyImageProps extends ImageProps {
    zoomLevel?: number;
    lensSize?: number; // Size of the magnifying glass in pixels
    activeOnRightHalfOnly?: boolean; // Only activate lens on the right 50% of the image
}

export default function MagnifyImage({
    zoomLevel = 2.5,
    lensSize = 150,
    activeOnRightHalfOnly = false,
    className,
    ...props
}: MagnifyImageProps) {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Relative position (0-100%)
    const [absolutePos, setAbsolutePos] = useState({ x: 0, y: 0 }); // Absolute position in pixels
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const xParams = e.clientX - left;
        const yParams = e.clientY - top;

        // Calculate percentage position
        const xPct = (xParams / width) * 100;
        const yPct = (yParams / height) * 100;

        setMousePos({ x: xPct, y: yPct });
        setAbsolutePos({ x: xParams, y: yParams });
    };

    // Determine visibility based on hover state AND right-half constraint
    const shouldShowLens = isHovering && (!activeOnRightHalfOnly || mousePos.x >= 50);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden cursor-none z-20 ${className || ''}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            style={{ width: '100%', height: '100%' }}
        >
            {/* Base Image */}
            <SafeImage {...props} className="object-contain w-full h-full pointer-events-none" />

            {/* Magnifying Lens */}
            {shouldShowLens && (
                <div
                    style={{
                        position: 'absolute',
                        left: absolutePos.x - lensSize / 2,
                        top: absolutePos.y - lensSize / 2,
                        width: lensSize,
                        height: lensSize,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        background: '#fff',
                        pointerEvents: 'none', // Ensure mouse events pass through to container
                        zIndex: 30, // Higher than base image
                    }}
                >
                    {/* Zoomed Image Container */}
                    <div
                        style={{
                            position: 'absolute',
                            width: `${zoomLevel * 100}%`,
                            height: `${zoomLevel * 100}%`,
                            transform: `translate(calc(${lensSize / 2}px - ${mousePos.x}%), calc(${lensSize / 2}px - ${mousePos.y}%))`,
                            transformOrigin: '0 0',
                        }}
                    >
                        <SafeImage {...props} className="object-contain w-full h-full" priority />
                    </div>
                </div>
            )}
        </div>
    );
}
