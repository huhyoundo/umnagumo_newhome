'use client';

import Image from 'next/image';
import { useState } from 'react';

type LiteYouTubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
  params?: string;
};

export default function LiteYouTubeEmbed({
  videoId,
  title,
  className = '',
  params = 'rel=0&modestbranding=1',
}: LiteYouTubeEmbedProps) {
  const [isActivated, setIsActivated] = useState(false);

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-[26px] border border-line bg-black shadow-[0_22px_60px_rgba(0,0,0,0.14)] ${className}`}
    >
      {isActivated ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsActivated(true)}
          className="group relative w-full h-full"
          aria-label={`${title} 재생`}
        >
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" aria-hidden="true" />
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm shadow-[0_18px_45px_rgba(0,0,0,0.25)] group-hover:scale-105 transition-transform duration-300">
              <span className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-[var(--navy)] ml-1" />
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
