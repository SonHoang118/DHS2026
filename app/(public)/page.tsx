'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>THIẾT KẾ & THI CÔNG KIẾN TRÚC CHUYÊN NGHIỆP</h1>
          <p>Chúng tôi mang đến giải pháp kiến trúc toàn diện từ khái niệm đến thực thi</p>
          <div className="hero-buttons">
            <Link href="/projects" className="btn btn-primary">Xem Dự Án</Link>
            <Link href="/contact" className="btn btn-secondary">Liên Hệ Ngay</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-preview">
        <h2>Dịch Vụ Chính</h2>
        <div className="services-grid">
          <div className="service-item">
            <h3>🏢 Thiết Kế Kiến Trúc</h3>
            <p>Thiết kế nhà ở, công trình thương mại, và công trình công cộng với tiêu chuẩn quốc tế</p>
          </div>
          <div className="service-item">
            <h3>🏗️ Thi Công Xây Dựng</h3>
            <p>Thi công toàn diện với đội ngũ chuyên nghiệp và kinh nghiệm hơn 10 năm</p>
          </div>
          <div className="service-item">
            <h3>📐 Tư Vấn Kỹ Thuật</h3>
            <p>Tư vấn chi tiết về quy hoạch, bố trí không gian, và tối ưu hóa chi phí</p>
          </div>
          <div className="service-item">
            <h3>🎨 Thiết Kế Nội Thất</h3>
            <p>Thiết kế nội thất sang trọng, hiện đại phù hợp với nhu cầu của bạn</p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-projects">
        <h2>Dự Án Nổi Bật</h2>
        <p>Những công trình tiêu biểu của công ty</p>
        <div className="projects-grid">
          <div className="project-preview">
            <div className="project-image">🏢</div>
            <h3>Tòa Nhà Thương Mại Trung Tâm</h3>
            <p>Dự án xây dựng tòa nhà 15 tầng với diện tích 5000m²</p>
          </div>
          <div className="project-preview">
            <div className="project-image">🏠</div>
            <h3>Khu Biệt Thư Cao Cấp</h3>
            <p>Thiết kế 50 biệt thự hiệu quả năng lượng và thân thiện môi trường</p>
          </div>
          <div className="project-preview">
            <div className="project-image">🏛️</div>
            <h3>Trung Tâm Trình Diễn Nghệ Thuật</h3>
            <p>Công trình công cộng với kiến trúc độc đáo, công suất 1000 chỗ</p>
          </div>
        </div>
        <Link href="/projects" className="btn btn-primary">Xem Tất Cả Dự Án</Link>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Tại Sao Chọn Chúng Tôi?</h2>
        <div className="reasons-grid">
          <div className="reason">
            <h3>✓ Kinh Nghiệm</h3>
            <p>Hơn 10 năm kinh nghiệm trong lĩnh vực thiết kế và xây dựng</p>
          </div>
          <div className="reason">
            <h3>✓ Chất Lượng</h3>
            <p>Cam kết chất lượng tốt nhất với tiêu chuẩn xây dựng quốc tế</p>
          </div>
          <div className="reason">
            <h3>✓ Đội Ngũ Chuyên Nghiệp</h3>
            <p>Đội ngũ kiến trúc sư, kỹ sư giàu kinh nghiệm</p>
          </div>
          <div className="reason">
            <h3>✓ Giá Cả Cạnh Tranh</h3>
            <p>Mức giá tối ưu mà không hy sinh chất lượng</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Bắt Đầu Dự Án Của Bạn Ngay Hôm Nay</h2>
        <p>Liên hệ với chúng tôi để nhận tư vấn miễn phí</p>
        <Link href="/contact" className="btn btn-primary">Tư Vấn Miễn Phí</Link>
      </section>
    </main>
  );
}
