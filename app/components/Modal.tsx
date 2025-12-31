
'use client';

import { useCallback, useRef, useEffect, MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: React.ReactNode }) {
    const overlay = useRef(null);
    const wrapper = useRef(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay, wrapper]
    );

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss();
        },
        [onDismiss]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [onKeyDown]);

    return (
        <div
            ref={overlay}
            className="fixed inset-0 z-[100] mx-auto bg-black/60 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center animate-fadeIn"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className="relative bg-white pt-8 md:pt-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[20px] md:rounded-[30px] shadow-2xl animate-scaleApp"
                onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to overlay
            >
                <button
                    onClick={onDismiss}
                    className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-50 text-gray-500"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
}
