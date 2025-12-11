'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    naver: any;
  }
}

const quickLinks = [
  { label: '가슴재수술', href: '/breast-revision' },
  { label: '유륜거상술', href: '/areola-lift' },
  { label: '안전케어', href: '/safety-care' },
  { label: '보형물가이드', href: '/implant-guide' },
  { label: '의료진소개', href: '/doctors' },
  { label: '전후사진', href: '/before-after' },
];

export default function Footer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.naver || !window.naver.maps || mapInitialized.current) return;

      mapInitialized.current = true;
      const location = new window.naver.maps.LatLng(37.5219756, 127.0363404);

      const map = new window.naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });

      new window.naver.maps.Marker({
        position: location,
        map: map,
      });
    };

    // Check if naver maps is loaded
    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      // Wait for script to load
      const checkNaver = setInterval(() => {
        if (window.naver && window.naver.maps) {
          clearInterval(checkNaver);
          initMap();
        }
      }, 100);

      // Cleanup after 10 seconds
      const timeout = setTimeout(() => {
        clearInterval(checkNaver);
      }, 10000);

      return () => {
        clearInterval(checkNaver);
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <footer className="bg-[#2a2a2a]">
      {/* Map + Info Section */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Naver Map - Left Side */}
          <div className="lg:col-span-5">
            <h3 className="font-display text-[11px] tracking-[0.2em] text-[#C4A574] mb-4 uppercase">
              LOCATION
            </h3>
            <div
              ref={mapRef}
              className="w-full h-[280px] lg:h-[300px] rounded-lg overflow-hidden bg-gray-700"
              id="footer-map"
            />
          </div>

          {/* Info - Right Side */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div>
                <h3 className="font-display text-[11px] tracking-[0.2em] text-[#C4A574] mb-4 uppercase">
                  CONTACT
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-semibold text-[17px] md:text-[18px] mb-2">
                      엄나구모성형외과의원
                    </p>
                    <div className="space-y-1 text-[13px] text-gray-400">
                      <p>서울특별시 강남구 도산대로 318</p>
                      <p>SBI타워 6층</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="tel:02-512-6838"
                      className="flex items-center gap-3 text-[14px] text-gray-300 hover:text-[#C4A574] transition-colors group"
                    >
                      <div className="w-8 h-8 bg-[#8B7355]/20 rounded-full flex items-center justify-center group-hover:bg-[#8B7355]/30 transition-colors">
                        <svg className="w-4 h-4 text-[#C4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      02-512-6838
                    </Link>
                    <Link
                      href="tel:02-512-6864"
                      className="flex items-center gap-3 text-[14px] text-gray-300 hover:text-[#C4A574] transition-colors group"
                    >
                      <div className="w-8 h-8 bg-[#8B7355]/20 rounded-full flex items-center justify-center group-hover:bg-[#8B7355]/30 transition-colors">
                        <svg className="w-4 h-4 text-[#C4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      02-512-6864
                    </Link>
                  </div>
                </div>
              </div>

              {/* Business Hours & Quick Links */}
              <div className="space-y-8">
                {/* Business Hours */}
                <div>
                  <h3 className="font-display text-[11px] tracking-[0.2em] text-[#C4A574] mb-4 uppercase">
                    BUSINESS HOURS
                  </h3>
                  <div className="space-y-2 text-[13px]">
                    <div className="flex justify-between max-w-[200px]">
                      <span className="text-gray-400">평일</span>
                      <span className="text-white">10:00 - 18:30</span>
                    </div>
                    <div className="flex justify-between max-w-[200px]">
                      <span className="text-gray-400">토요일</span>
                      <span className="text-white">10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between max-w-[200px]">
                      <span className="text-gray-400">점심시간</span>
                      <span className="text-white">13:00 - 14:00</span>
                    </div>
                    <p className="text-gray-500 text-[11px] mt-2">
                      * 일요일/공휴일 휴진
                    </p>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-display text-[11px] tracking-[0.2em] text-[#C4A574] mb-4 uppercase">
                    QUICK LINKS
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-[12px] text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="flex items-center gap-4">
                <span className="text-[11px] text-gray-500 tracking-wider">FOLLOW US</span>
                <div className="flex items-center gap-3">
                  <Link
                    href="https://instagram.com/umnagumo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#8B7355] transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </Link>
                  <Link
                    href="https://blog.naver.com/umnagumo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#03C75A] transition-colors"
                    aria-label="Naver Blog"
                  >
                    <span className="text-white font-bold text-[10px]">N</span>
                  </Link>
                  <Link
                    href="https://youtube.com/@umnagumo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#FF0000] transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Copyright */}
      <div className="border-t border-gray-700 bg-[#222]">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="font-display text-[14px] text-[#C4A574] tracking-wide">
                UMNAGUMO
              </span>
              <span className="text-gray-500 text-[11px]">
                사업자 등록번호: 211-09-47855
              </span>
            </div>
            <p className="text-gray-500 text-[11px]">
              Copyright 2024 UMNAGUMO PLASTIC SURGERY. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
