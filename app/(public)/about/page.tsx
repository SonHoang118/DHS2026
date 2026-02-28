'use client';

export default function About() {
  return (
    <main>
      <section className="page-header">
        <h1>Về Chúng Tôi</h1>
        <p>Công ty Thiết Kế & Thi Công Kiến Trúc Chuyên Nghiệp</p>
      </section>

      <section className="about-content">
        <div className="about-intro">
          <h2>Lịch Sử & Sứ Mệnh</h2>
          <p>
            Công ty được thành lập năm 2014, chúng tôi đã trở thành một trong những công ty hàng đầu
            trong lĩnh vực thiết kế và thi công kiến trúc tại Việt Nam. Với sứ mệnh mang đến những
            giải pháp kiến trúc sáng tạo, bền vững và thân thiện với môi trường.
          </p>
        </div>

        <div className="company-stats">
          <div className="stat">
            <h3>10+</h3>
            <p>Năm kinh nghiệm</p>
          </div>
          <div className="stat">
            <h3>150+</h3>
            <p>Dự án hoàn thành</p>
          </div>
          <div className="stat">
            <h3>50+</h3>
            <p>Nhân viên</p>
          </div>
          <div className="stat">
            <h3>100%</h3>
            <p>Khách hàng hài lòng</p>
          </div>
        </div>

        <div className="about-section">
          <h2>Tầm Nhìn & Giá Trị Cốt Lõi</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>🎯 Tầm Nhìn</h3>
              <p>
                Trở thành công ty kiến trúc hàng đầu khu vực, tạo ra những công trình kiến trúc
                vượt thời gian và bền vững.
              </p>
            </div>
            <div className="value-card">
              <h3>💎 Giá Trị</h3>
              <ul>
                <li>Chất lượng và sự xuất sắc trong mọi công việc</li>
                <li>Sáng tạo và đổi mới không ngừng</li>
                <li>Tôn trọng và trách nhiệm với khách hàng</li>
                <li>Bền vững và thân thiện môi trường</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Đội Ngũ Chuyên Gia</h2>
          <p>
            Chúng tôi sở hữu một đội ngũ gồm các kiến trúc sư, kỹ sư xây dựng, thiết kế nội thất
            và chuyên gia tư vấn hàng đầu trong ngành.
          </p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">👨‍💼</div>
              <h3>Nguyễn Văn A</h3>
              <p>Tổng Giám Đốc & Kiến Trúc Sư Trưởng</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">👩‍💼</div>
              <h3>Trần Thị B</h3>
              <p>Giám Đốc Thiết Kế Kiến Trúc</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">👨‍💼</div>
              <h3>Lê Văn C</h3>
              <p>Giám Đốc Dự Án & Thi Công</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">👩‍💼</div>
              <h3>Phạm Thị D</h3>
              <p>Chuyên Gia Thiết Kế Nội Thất</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Kỹ Năng & Công Nghệ</h2>
          <p>Chúng tôi sử dụng các công nghệ hiện đại nhất:</p>
          <div className="skills-grid">
            <div className="skill">
              <h4>CAD & BIM</h4>
              <p>AutoCAD, Revit, ArchiCAD</p>
            </div>
            <div className="skill">
              <h4>Mô Phỏng 3D</h4>
              <p>SketchUp, 3DS Max, V-Ray</p>
            </div>
            <div className="skill">
              <h4>Quản Lý Dự Án</h4>
              <p>MS Project, Primavera</p>
            </div>
            <div className="skill">
              <h4>Tiêu Chuẩn</h4>
              <p>ISO 9001, TCVN, Tiêu chuẩn XD</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
