import Link from 'next/link';

const QUICK_LINKS = [
  { href: '/breast-augmentation', label: '강남 가슴성형(가슴확대) · 가슴 첫수술' },
  { href: '/breast-revision', label: '강남 가슴수술 · 가슴 재수술' },
  { href: '/reduction-lift', label: '가슴 축소/거상술' },
  { href: '/breast-reconstruction', label: '가슴 재건술' },
  { href: '/implant-removal', label: '보형물 제거' },
  { href: '/implant-guide', label: '보형물 가이드' },
  { href: '/before-after', label: '가슴성형 전후사진' },
  { href: '/checklist', label: '가슴수술 체크리스트' },
  { href: '/doctors', label: '의료진 소개' },
] as const;

export default function HomeSeoSection() {
  return (
    <section className="py-14 md:py-16 bg-[var(--paper)] border-y border-line">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <h2 className="text-[22px] md:text-[28px] font-semibold text-[var(--ink)] tracking-[-0.02em]">
          가슴성형·가슴수술·가슴확대 전문 엄나구모 성형외과
        </h2>
        <p className="mt-4 text-[14px] md:text-[15px] text-[var(--ink-muted)] leading-relaxed">
          엄나구모 성형외과는 서울특별시 강남구 도산대로 318 SB타워 6층에서 가슴성형과 가슴수술을 중심으로
          상담부터 수술, 회복관리까지 개인별 상태에 맞춘 계획을 제안합니다. 가슴확대, 가슴거상, 가슴 재수술은 물론
          처진가슴 교정, 축소술, 재건술, 보형물 제거 등 다양한 케이스를 진료합니다.
        </p>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-line bg-white px-4 py-3 text-[13px] md:text-[14px] text-[var(--ink)] hover:border-[var(--navy)]/40 hover:text-[var(--navy)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>


      </div>
    </section>
  );
}
