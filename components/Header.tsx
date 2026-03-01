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
import Link from "next/link";

export default function Header() {
  const menu = [
    { name: "Trang chủ", href: "/" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Dự án", href: "/projects" },
    { name: "Liên hệ", href: "/contact" },
    { name: "Bài viết", href: "/posts" },
  ];

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-5">

        <div className="flex items-center gap-3  text-[22px] text-[#C00707]">
              <img src='/images/logo.jpg' alt='DHStudio Logo' className="w-7.5" />
              <span style={{ fontFamily: 'Audiowide, sans-serif' }}>DHStudio</span>
        </div>

        <nav className="hidden md:flex items-center gap-12 text-gray-600 font-medium">
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
        <button className="hidden md:block border-b border-black pb-1 font-medium hover:opacity-70 transition">
          +84 983 239 596
        </button>

      </div>
    </header>
  );
}