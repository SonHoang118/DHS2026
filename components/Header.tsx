// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="header">
//       <div className="header-container">
//         <Link href="/" className="logo">
//           <span className="logo-icon">🏢</span>
//           <span className="logo-text">KIẾN TRÚC CHUYÊN NGHIỆP</span>
//         </Link>

//         <button
//           className="mobile-menu-btn"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           ☰
//         </button>

//         <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
//           <ul>
//             <li><Link href="/">Trang Chủ</Link></li>
//             <li><Link href="/about">Về Chúng Tôi</Link></li>
//             <li><Link href="/services">Dịch Vụ</Link></li>
//             <li><Link href="/projects">Dự Án</Link></li>
//             <li><Link href="/posts">Blog</Link></li>
//             <li><Link href="/contact" className="btn-contact">Liên Hệ</Link></li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// }
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const menu = [
    { name: "Trang chủ", href: "/" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Dự án", href: "/projects" },
    { name: "Bài viết", href: "/posts" },
    { name: "Liên hệ", href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY <= 8);
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 120);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const headerPadding = isAtTop ? "py-5" : "py-2";
  const headerTranslate = mobileMenuOpen
    ? "translate-y-0"
    : isScrolling
      ? "-translate-y-full"
      : "translate-y-0";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-white/40 bg-white/60 backdrop-blur-xl supports-backdrop-filter:bg-white/45 shadow-[0_6px_24px_rgba(15,23,42,0.08)] transition-transform duration-300 ${headerTranslate}`}>
      <div className={`max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${headerPadding}`}>

        <div className="flex items-center gap-3  text-[22px] text-[#C00707]">
              <img src='/images/logo.jpg' alt='DHStudio Logo' className="w-7.5" />
              <span style={{ fontFamily: 'Audiowide, sans-serif' }}>DHStudio</span>
        </div>

        <nav className="hidden lg:flex items-center gap-12 text-gray-600 font-medium">
          {menu.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="hover:text-[#FF4400] transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <button className="hidden lg:block border-b border-black pb-1 font-medium hover:opacity-70 transition">
          +84 983 239 596
        </button>

        <button
          type="button"
          aria-label="Mo menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-700 transition-all duration-300"
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-5 h-5 transition-transform duration-300 ${mobileMenuOpen ? "rotate-90" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

      </div>

      <nav
        className={`lg:hidden border-t border-gray-200 bg-white px-4 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen
            ? "max-h-[420px] py-4 opacity-100 translate-y-0"
            : "max-h-0 py-0 opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-3">
            {menu.map((item, i) => (
              <li
                key={i}
                className={`transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${i * 40}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-700 font-medium hover:text-[#FF4400] transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li
              className={`transition-all duration-300 ${
                mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              }`}
              style={{ transitionDelay: mobileMenuOpen ? `${menu.length * 40}ms` : "0ms" }}
            >
              <a
                href="tel:+84983239596"
                className="block py-2 text-[#C00707] font-semibold"
              >
                +84 983 239 596
              </a>
            </li>
        </ul>
      </nav>
    </header>
  );
}