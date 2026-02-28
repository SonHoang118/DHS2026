import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Về Chúng Tôi</h3>
          <p>
            Công ty Thiết Kế & Thi Công Kiến Trúc Chuyên Nghiệp - Mang đến giải pháp
            kiến trúc toàn diện với chất lượng, sáng tạo và bền vững.
          </p>
          <div className="social-links">
            <a href="#" title="Facebook">f</a>
            <a href="#" title="Instagram">📷</a>
            <a href="#" title="LinkedIn">in</a>
            <a href="#" title="YouTube">▶️</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Liên Kết Nhanh</h3>
          <ul>
            <li><Link href="/">Trang Chủ</Link></li>
            <li><Link href="/about">Về Chúng Tôi</Link></li>
            <li><Link href="/services">Dịch Vụ</Link></li>
            <li><Link href="/projects">Dự Án</Link></li>
            <li><Link href="/posts">Blog</Link></li>
            <li><Link href="/contact">Liên Hệ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Dịch Vụ</h3>
          <ul>
            <li><Link href="/services">Thiết Kế Kiến Trúc</Link></li>
            <li><Link href="/services">Thi Công Xây Dựng</Link></li>
            <li><Link href="/services">Thiết Kế Nội Thất</Link></li>
            <li><Link href="/services">Tư Vấn Kỹ Thuật</Link></li>
            <li><Link href="/services">Quản Lý Dự Án</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Liên Hệ</h3>
          <p>📍 123 Đường Nguyễn Hữu Cảnh, Q.1, TP.HCM</p>
          <p>📞 +84 28 3823 8899</p>
          <p>📧 <a href="mailto:info@architecture.vn">info@architecture.vn</a></p>
          <p>🕐 Thứ 2-6: 8:00-17:30 | Thứ 7: 8:00-12:00</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Công Ty Thiết Kế & Thi Công Kiến Trúc. Tất cả quyền được bảo lưu.</p>
        <div className="footer-links">
          <a href="#privacy">Chính Sách Riêng Tư</a>
          <a href="#terms">Điều Khoản Sử Dụng</a>
          <a href="#sitemap">Sơ Đồ Trang</a>
        </div>
      </div>
    </footer>
  );
}
