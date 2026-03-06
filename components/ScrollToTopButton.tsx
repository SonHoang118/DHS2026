"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 1000);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Len dau trang"
      onClick={scrollToTop}
      className={`fixed right-4 md:right-6 bottom-5 md:bottom-7 z-60 rounded-full w-11 h-11 md:w-12 md:h-12 border border-white/40 bg-white/60 backdrop-blur-xl supports-backdrop-filter:bg-white/45 text-[#C00707] shadow-[0_6px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:bg-white/75 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
