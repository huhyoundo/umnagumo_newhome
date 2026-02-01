'use client';

import Image from './SafeImage';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { doctors } from '../data/doctors';

function DoctorCard({ doctor, index, isVisible }: { doctor: typeof doctors[number], index: number, isVisible: boolean }) {
  return (
    <div
      className="group relative flex flex-col items-center text-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${0.1 + index * 0.15}s`,
      }}
    >
      <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden rounded-[20px] bg-[#f8f6f3]">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <p className="text-[11px] md:text-[12px] text-[var(--navy)] tracking-[0.2em] font-medium uppercase mb-2">
        {doctor.role}
      </p>
      <h3 className="text-[20px] md:text-[22px] font-semibold text-[var(--ink)] mb-4">
        {doctor.name}
      </h3>

      <div className="w-8 h-[1px] bg-[var(--line)] mb-4 group-hover:w-16 transition-all duration-300" />

      {/* Show only first credential or a summarized version if needed, 
          but for now let's just show a 'View Profile' link to keep it clean like a summary */}
      <Link
        href="/doctors"
        className="inline-flex items-center gap-2 text-[13px] text-[var(--ink-muted)] hover:text-[var(--navy)] transition-colors duration-300"
      >
        <span>프로필 보기</span>
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}

export default function DoctorSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white border-b border-line">
      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[12px] text-[var(--navy)] tracking-[0.25em] font-medium uppercase mb-4"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.6s ease' }}>
            MEDICAL TEAM
          </p>
          <h2 className="text-[28px] md:text-[36px] font-semibold text-[var(--ink)] tracking-[-0.02em]"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.6s ease 0.1s' }}>
            엄나구모 의료진 소개
          </h2>
          <p className="mt-5 text-[15px] text-[var(--ink-muted)] leading-relaxed max-w-[600px] mx-auto break-keep"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.6s ease 0.2s' }}>
            25년 이상의 경험과 노하우를 가진 의료진이<br className="md:hidden" />
            상담부터 수술, 회복까지 직접 책임집니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-12 gap-x-8 lg:gap-x-12 justify-center max-w-[800px] mx-auto">
          {doctors.filter(d => !d.role.includes('마취')).map((doctor, index) => (
            <DoctorCard key={doctor.name} doctor={doctor} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
