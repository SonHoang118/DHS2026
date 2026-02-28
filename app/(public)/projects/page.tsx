'use client';

import Link from 'next/link';

export default function Projects() {
  const projects = [
    {
      slug: 'toa-nha-thuong-mai-trung-tam',
      title: 'Tòa Nhà Thương Mại Trung Tâm',
      category: 'Thương Mại',
      year: 2022,
      location: 'Quận 1, TP.HCM',
      description: 'Tòa nhà 15 tầng với diện tích 5000m² bao gồm văn phòng, không gian bán lẻ và nhà hàng',
    },
    {
      slug: 'khu-biet-thu-cao-cap',
      title: 'Khu Biệt Thự Cao Cấp',
      category: 'Nhà Ở',
      year: 2021,
      location: 'Thảo Điền, TP.HCM',
      description: '50 biệt thự hiệu quả năng lượng với kiến trúc hiện đại và tiện ích cao cấp',
    },
    {
      slug: 'trung-tam-trinh-dien-nghe-thuat',
      title: 'Trung Tâm Trình Diễn Nghệ Thuật',
      category: 'Công Cộng',
      year: 2023,
      location: 'Quan Hạng, Hà Nội',
      description: 'Công trình công cộng hiện đại với công suất 1000 chỗ, thiết kế kiến trúc độc đáo',
    },
    {
      slug: 'toa-nha-van-phong-xanh',
      title: 'Tòa Nhà Văn Phòng Xanh',
      category: 'Thương Mại',
      year: 2023,
      location: 'Biwase, TP.HCM',
      description: 'Tòa nhà 10 tầng với chứng chỉ LEED Green Building, công nghệ tiết kiệm năng lượng',
    },
    {
      slug: 'khu-dan-cu-nhan-ai',
      title: 'Khu Dân Cư Nhân Ái',
      category: 'Nhà Ở',
      year: 2020,
      location: 'Bình Chánh, TP.HCM',
      description: '200 căn hộ với tiện ích đầy đủ, công viên trung tâm và trường học',
    },
    {
      slug: 'benh-vien-da-khoa-tien-tien',
      title: 'Bệnh Viện Đa Khoa Tiên Tiến',
      category: 'Công Cộng',
      year: 2022,
      location: 'Hải Phòng',
      description: 'Bệnh viện 300 giường trang bị công nghệ y tế hiện đại, kiến trúc thân thiện bệnh nhân',
    },
  ];

  return (
    <main>
      <section className="page-header">
        <h1>Dự Án Của Chúng Tôi</h1>
        <p>Những công trình tiêu biểu đã hoàn thành</p>
      </section>

      <section className="projects-list">
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.slug} className="project-card-item">
              <div className="project-card-image">
                <div className="project-emoji">🏗️</div>
              </div>
              <div className="project-card-content">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p className="project-location">📍 {project.location}</p>
                <p className="project-year">Năm: {project.year}</p>
                <p className="project-description">{project.description}</p>
                <Link href={`/projects/${project.slug}`} className="btn btn-small">
                  Xem Chi Tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="projects-stats">
        <h2>Thành Tựu Của Chúng Tôi</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>150+</h3>
            <p>Dự Án Hoàn Thành</p>
          </div>
          <div className="stat-item">
            <h3>500,000+</h3>
            <p>M² Kiến Trúc</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Khách Hàng Hài Lòng</p>
          </div>
          <div className="stat-item">
            <h3>$100M+</h3>
            <p>Giá Trị Dự Án</p>
          </div>
        </div>
      </section>
    </main>
  );
}
