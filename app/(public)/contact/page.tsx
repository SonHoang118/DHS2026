'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send form data to API
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24 giờ.');
  };

  return (
    <main>
      <section className="page-header">
        <h1>Liên Hệ Với Chúng Tôi</h1>
        <p>Chúng tôi rất vui được nghe từ bạn</p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <h3>📍 Địa Chỉ</h3>
            <p>123 Đường Nguyễn Hữu Cảnh, Quận 1</p>
            <p>TP. Hồ Chí Minh, Việt Nam</p>
          </div>
          <div className="info-item">
            <h3>📞 Điện Thoại</h3>
            <p>+84 28 3823 8899</p>
            <p>+84 93 123 4567 (Mobile)</p>
          </div>
          <div className="info-item">
            <h3>📧 Email</h3>
            <p>
              <a href="mailto:info@architecture.vn">info@architecture.vn</a>
            </p>
            <p>
              <a href="mailto:projects@architecture.vn">projects@architecture.vn</a>
            </p>
          </div>
          <div className="info-item">
            <h3>🕐 Giờ Làm Việc</h3>
            <p>Thứ Hai - Thứ Sáu: 8:00 - 17:30</p>
            <p>Thứ Bảy: 8:00 - 12:00</p>
            <p>Chủ Nhật: Nghỉ</p>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Họ Tên *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nhập họ tên của bạn"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Điện Thoại</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+84 123 456 789"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Chủ Đề *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Chọn chủ đề</option>
                <option value="thiet_ke">Tư vấn thiết kế</option>
                <option value="thi_cong">Tư vấn thi công</option>
                <option value="noi_that">Thiết kế nội thất</option>
                <option value="khac">Khác</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Tin Nhắn *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Nhập nội dung tin nhắn của bạn"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Gửi Tin Nhắn
            </button>
          </form>
        </div>
      </section>

      <section className="why-contact-us">
        <h2>Tại Sao Liên Hệ Với Chúng Tôi?</h2>
        <div className="benefits-grid">
          <div className="benefit">
            <h3>⚡ Phản Hồi Nhanh</h3>
            <p>Chúng tôi sẽ phản hồi trong vòng 24 giờ</p>
          </div>
          <div className="benefit">
            <h3>💡 Tư Vấn Miễn Phí</h3>
            <p>Nhận tư vấn chi tiết về dự án của bạn</p>
          </div>
          <div className="benefit">
            <h3>📋 Giải Pháp Toàn Diện</h3>
            <p>Từ khái niệm đến thực thi hoàn chỉnh</p>
          </div>
          <div className="benefit">
            <h3>🤝 Đối Tác Tin Cậy</h3>
            <p>Hợp tác lâu dài với khách hàng</p>
          </div>
        </div>
      </section>
    </main>
  );
}
