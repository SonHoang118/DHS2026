'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          <span className="logo-icon">🏢</span>
          <span className="logo-text">KIẾN TRÚC CHUYÊN NGHIỆP</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link href="/">Trang Chủ</Link></li>
            <li><Link href="/about">Về Chúng Tôi</Link></li>
            <li><Link href="/services">Dịch Vụ</Link></li>
            <li><Link href="/projects">Dự Án</Link></li>
            <li><Link href="/posts">Blog</Link></li>
            <li><Link href="/contact" className="btn-contact">Liên Hệ</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
