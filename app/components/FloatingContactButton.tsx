'use client';

import Link from 'next/link';

export default function FloatingContactButton() {
  return (
    <>
      {/* Floating Buttons - Always Visible */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* YouTube */}
        <Link
          href="https://www.youtube.com/@umnagumo"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[140px] flex items-center justify-between bg-white shadow-lg rounded-full px-4 py-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <span className="text-[12px] font-medium text-gray-700 group-hover:text-[#FF0000] transition-colors">
            YouTube
          </span>
          <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
        </Link>

        {/* Instagram */}
        <Link
          href="https://www.instagram.com/umnagumo/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[140px] flex items-center justify-between bg-white shadow-lg rounded-full px-4 py-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <span className="text-[12px] font-medium text-gray-700 group-hover:text-[#E4405F] transition-colors">
            Instagram
          </span>
          <div className="w-8 h-8 bg-gradient-to-tr from-[#FFDC80] via-[#E4405F] to-[#833AB4] rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
        </Link>

        {/* Naver Reservation */}
        <Link
          href="https://map.naver.com/p/entry/place/13107285?placePath=%252Fhome%253Fentry%253Dplt&searchType=place&lng=127.0363228&lat=37.5220015"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[140px] flex items-center justify-between bg-white shadow-lg rounded-full px-4 py-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <span className="text-[12px] font-medium text-gray-700 group-hover:text-[#03C75A] transition-colors">
            네이버 예약
          </span>
          <div className="w-8 h-8 bg-[#03C75A] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">N</span>
          </div>
        </Link>

        {/* KakaoTalk */}
        <Link
          href="http://pf.kakao.com/_QRNzxj"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[140px] flex items-center justify-between bg-white shadow-lg rounded-full px-4 py-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <span className="text-[12px] font-medium text-gray-700 group-hover:text-[#FAE100] transition-colors">
            카카오 상담
          </span>
          <div className="w-8 h-8 bg-[#FAE100] rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-[#3C1E1E]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.58 2 11c0 2.8 1.8 5.27 4.5 6.71-.14.52-.92 3.29-.92 3.29 0 0-.02.13.07.18.09.05.19.01.19.01.25-.03 2.95-1.93 3.42-2.26.91.13 1.85.07 2.74.07 5.52 0 10-3.58 10-8 0-4.42-4.48-8-10-8z"/>
            </svg>
          </div>
        </Link>

        {/* Phone Call */}
        <Link
          href="tel:025126838"
          className="w-[140px] flex items-center justify-between bg-white shadow-lg rounded-full px-4 py-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <span className="text-[12px] font-medium text-gray-700 group-hover:text-[var(--navy)] transition-colors">
            02-512-6838
          </span>
          <div className="w-8 h-8 bg-[var(--navy)] rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </>
  );
}

function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 z-50 w-11 h-11 bg-white border border-gray-200 rounded-full
        flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
      aria-label="맨 위로 이동"
    >
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
