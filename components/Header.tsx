"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProjectMobileDropdownOpen, setIsProjectMobileDropdownOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
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

  useEffect(() => {
    async function loadMeta() {
      try {
        const [categoriesRes, stylesRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/styles'),
        ]);

        if (!categoriesRes.ok || !stylesRes.ok) {
          return;
        }

        const categoriesData = await categoriesRes.json();
        const stylesData = await stylesRes.json();

        setCategories(Array.isArray(categoriesData?.items) ? categoriesData.items.map((item: any) => item.name).filter(Boolean) : []);
        setStyles(Array.isArray(stylesData?.items) ? stylesData.items.map((item: any) => item.name).filter(Boolean) : []);
      } catch (err) {
        console.error('Header taxonomy load failed', err);
      }
    }

    loadMeta();
  }, []);

  const searchParams = useSearchParams();
  const selectedCategories = searchParams.getAll("category").map((v) => v.trim()).filter(Boolean);
  const selectedStyles = searchParams.getAll("style").map((v) => v.trim()).filter(Boolean);

  const makeProjectsLink = ({ category, style }: { category?: string; style?: string }) => {
    let nextCategories = [...selectedCategories];
    let nextStyles = [...selectedStyles];

    if (category) {
      if (nextCategories.includes(category)) {
        nextCategories = nextCategories.filter((cat) => cat !== category);
      } else {
        nextCategories = [...new Set([...nextCategories, category])];
      }
    }

    if (style) {
      if (nextStyles.includes(style)) {
        nextStyles = nextStyles.filter((sty) => sty !== style);
      } else {
        nextStyles = [...new Set([...nextStyles, style])];
      }
    }

    const params = new URLSearchParams();
    nextCategories.forEach((cat) => params.append("category", cat));
    nextStyles.forEach((sty) => params.append("style", sty));

    return `/projects?${params.toString()}`;
  };

  const headerPadding = isAtTop ? "py-5" : "py-2";
  const headerTranslate = mobileMenuOpen
    ? "translate-y-0"
    : isScrolling
      ? "-translate-y-full"
      : "translate-y-0";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-white/40 bg-white/60 backdrop-blur-xl supports-backdrop-filter:bg-white/45 shadow-[0_6px_24px_rgba(15,23,42,0.08)] transition-transform duration-300 ${headerTranslate}`}>
      <div className={`max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${headerPadding}`}>

        <Link href="/" className="flex items-center gap-3 text-[22px] text-[#760001]">
          <img src='/images/logo2.jpg' alt='DHStudio Logo' className="w-8.5" />
          <span style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 'bold' }}>DHStudio</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-12 text-gray-600 font-medium">
          {menu.map((item, i) => {
            if (item.name === "Dự án") {
              return (
                <div
                  key={i}
                  className="relative"
                  onMouseEnter={() => setIsProjectDropdownOpen(true)}
                  onMouseLeave={() => setIsProjectDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="hover:text-[#FF4400] transition"
                  >
                    <span className="inline-flex items-center gap-1">
                      {item.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </Link>

                  <div
                    className={`absolute left-0 mt-2 min-w-[320px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-all duration-200 ${                      isProjectDropdownOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
                    }`}
                    style={{ zIndex: 60 }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Danh mục</h4>
                        <ul className="space-y-1">
                          {categories.length > 0 ? (
                            categories.map((cat, idx) => {
                              const selected = selectedCategories.includes(cat);
                              return (
                                <li key={idx}>
                                  <Link
                                    href={makeProjectsLink({ category: cat })}
                                    className={`inline-block px-2 py-1 rounded-md text-sm transition border border-dashed ${selected ? "border-[#C00707] bg-[#ffe9e3] text-[#C00707] font-semibold" : "border-gray-300 bg-white text-gray-600 hover:border-[#FF4400] hover:text-[#FF4400]"}`}
                                  >
                                    {cat}
                                  </Link>
                                </li>
                              );
                            })
                          ) : (
                            <li className="text-xs text-gray-400">Không tìm thấy category</li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Phong cách</h4>
                        <ul className="space-y-1">
                          {styles.length > 0 ? (
                            styles.map((styleItem, idx) => {
                              const selected = selectedStyles.includes(styleItem);
                              return (
                                <li key={idx}>
                                  <Link
                                    href={makeProjectsLink({ style: styleItem })}
                                    className={`inline-block px-2 py-1 rounded-md text-sm transition border border-dashed ${selected ? "border-[#C00707] bg-[#ffe9e3] text-[#C00707] font-semibold" : "border-gray-300 bg-white text-gray-600 hover:border-[#FF4400] hover:text-[#FF4400]"}`}
                                  >
                                    {styleItem}
                                  </Link>
                                </li>
                              );
                            })
                          ) : (
                            <li className="text-xs text-gray-400">Không tìm thấy style</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={i}
                href={item.href}
                className="hover:text-[#FF4400] transition"
              >
                {item.name}
              </Link>
            );
          })}
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
            {menu.map((item, i) => {
              if (item.name === "Dự án") {
                return (
                  <li
                    key={i}
                    className={`transition-all duration-300 ${
                      mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    }`}
                    style={{ transitionDelay: mobileMenuOpen ? `${i * 40}ms` : "0ms" }}
                  >
                    <button
                      type="button"
                      onClick={() => setIsProjectMobileDropdownOpen((prev) => !prev)}
                      className="w-full text-left py-2 text-gray-700 font-medium hover:text-[#FF4400] transition flex items-center justify-between"
                    >
                      Dự án
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 transition-transform ${isProjectMobileDropdownOpen ? "rotate-180" : "rotate-0"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`${isProjectMobileDropdownOpen ? "max-h-[640px]" : "max-h-0"} overflow-hidden transition-all duration-300 mt-2`}> 
                      <ul className="flex flex-col gap-2">
                        <li>
                          <Link
                            href="/projects"
                            onClick={() => { setMobileMenuOpen(false); setIsProjectMobileDropdownOpen(false); }}
                            className="block px-3 py-2 rounded-md border border-dashed border-gray-300 text-sm text-gray-700 hover:border-[#FF4400] hover:text-[#FF4400]"
                          >
                            Tất cả dự án
                          </Link>
                        </li>
                        <li>
                          <p className="text-sm font-semibold mb-1">Danh mục</p>
                          <div className="flex flex-wrap gap-2">
                            {categories.map((cat, idx) => {
                              const selected = selectedCategories.includes(cat);
                              return (
                                <Link
                                  key={`mobile-cat-${idx}`}
                                  href={makeProjectsLink({ category: cat })}
                                  onClick={() => { setMobileMenuOpen(false); setIsProjectMobileDropdownOpen(false); }}
                                  className={`px-2 py-1 rounded-md border border-dashed text-sm ${selected ? "border-[#C00707] bg-[#ffe9e3] text-[#C00707]" : "border-gray-300 text-gray-600 hover:border-[#FF4400] hover:text-[#FF4400]"}`}
                                >
                                  {cat}
                                </Link>
                              );
                            })}
                          </div>
                        </li>
                        <li>
                          <p className="text-sm font-semibold mb-1">Phong cách</p>
                          <div className="flex flex-wrap gap-2">
                            {styles.map((styleItem, idx) => {
                              const selected = selectedStyles.includes(styleItem);
                              return (
                                <Link
                                  key={`mobile-style-${idx}`}
                                  href={makeProjectsLink({ style: styleItem })}
                                  onClick={() => { setMobileMenuOpen(false); setIsProjectMobileDropdownOpen(false); }}
                                  className={`px-2 py-1 rounded-md border border-dashed text-sm ${selected ? "border-[#C00707] bg-[#ffe9e3] text-[#C00707]" : "border-gray-300 text-gray-600 hover:border-[#FF4400] hover:text-[#FF4400]"}`}
                                >
                                  {styleItem}
                                </Link>
                              );
                            })}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
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
              );
            })}
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