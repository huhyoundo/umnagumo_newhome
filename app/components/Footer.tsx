'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    naver: any;
  }
}

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
    <footer className="bg-[#3a3a3a]">
      {/* Map + Info Section */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Naver Map - Left Side */}
          <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0">
            <div
              ref={mapRef}
              className="w-full h-[250px] lg:h-[280px] rounded-lg overflow-hidden bg-gray-600"
              id="footer-map"
            />
          </div>

          {/* Info - Right Side */}
          <div className="flex-1">
            <h3 className="font-semibold text-[18px] md:text-[20px] text-[#C4A574] mb-4">
              엄나구모성형외과의원
            </h3>
            <div className="space-y-1 text-[13px] md:text-[14px] text-gray-300 mb-6">
              <p>서울특별시 강남구 도산대로 318</p>
              <p>SBI타워 6층 엄나구모 성형외과 의원</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-gray-600">
              <div>
                <p className="font-medium text-[12px] text-gray-400 mb-2 tracking-wider">진료시간</p>
                <div className="space-y-1 text-[13px] text-gray-300">
                  <p className="flex justify-between max-w-[180px]">
                    <span className="text-[#C4A574]">평 일</span>
                    <span>10:00 - 18:30</span>
                  </p>
                  <p className="flex justify-between max-w-[180px]">
                    <span className="text-[#C4A574]">토요일</span>
                    <span>10:00 - 16:00</span>
                  </p>
                </div>
              </div>
              <div>
                <p className="font-medium text-[12px] text-gray-400 mb-2 tracking-wider">연락처</p>
                <div className="space-y-2 text-[13px] text-gray-300">
                  <Link
                    href="tel:02-512-6838"
                    className="flex items-center gap-2 hover:text-[#C4A574] transition-colors"
                  >
                    <svg className="w-4 h-4 text-[#C4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    02) 512 - 6838
                  </Link>
                  <Link
                    href="tel:02-512-6864"
                    className="flex items-center gap-2 hover:text-[#C4A574] transition-colors"
                  >
                    <svg className="w-4 h-4 text-[#C4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    02) 512 - 6864
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Copyright Only */}
      <div className="border-t border-gray-600">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-5 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <p className="text-gray-400 text-[11px] md:text-[12px]">
              © 2024 UMNAGUMO PLASTIC SURGERY. All rights reserved.
            </p>
            <p className="text-gray-500 text-[10px] md:text-[11px]">
              사업자 등록번호: 211-09-47855
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
