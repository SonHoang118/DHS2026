'use client';

import { useParams } from 'next/navigation';

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;

  // Project data - in real app, this would come from a database
  const projects: Record<string, any> = {
    'toa-nha-thuong-mai-trung-tam': {
      title: 'Tòa Nhà Thương Mại Trung Tâm',
      category: 'Thương Mại',
      year: 2022,
      location: 'Quận 1, TP.HCM',
      status: 'Hoàn Thành',
      area: '5000m²',
      value: '$15 Triệu',
      description: 'Tòa nhà 15 tầng với diện tích 5000m² bao gồm văn phòng, không gian bán lẻ và nhà hàng. Công trình được thiết kế theo tiêu chuẩn LEED Silver với các tính năng tiết kiệm năng lượng.',
      details: [
        'Tòa nhà: 15 tầng',
        'Diện tích: 5000m²',
        'Văn phòng: 3000m²',
        'Bán lẻ: 1500m²',
        'Nhà hàng & Quán cà phê: 500m²',
        'Bãi đỗ xe: Hầm 3 tầng',
      ],
      features: [
        'Hệ thống thông gió thông minh',
        'Sử dụng năng lượng tái tạo',
        'Trang thiết bị công nghệ cao',
        'Thiết kế bền vững',
        'Tiêu chuẩn LEED Silver',
      ],
      client: 'Công ty Bất Động Sản ABC',
      team: 'Kiến trúc sư: Nguyễn Văn A, Kỹ sư: Trần Thị B',
    },
    'khu-biet-thu-cao-cap': {
      title: 'Khu Biệt Thự Cao Cấp',
      category: 'Nhà Ở',
      year: 2021,
      location: 'Thảo Điền, TP.HCM',
      status: 'Hoàn Thành',
      area: '50 Biệt Thự',
      value: '$25 Triệu',
      description: '50 biệt thự hiệu quả năng lượng với kiến trúc hiện đại và tiện ích cao cấp. Mỗi biệt thự được thiết kế độc lập với sân vườn riêng.',
      details: [
        '50 biệt thự 2-3 tầng',
        'Diện tích mỗi biệt thự: 120-200m²',
        'Sân vườn riêng từ 200-300m²',
        'Tiện ích: Công viên, hồ bơi, câu lạc bộ',
        'An ninh 24/7',
      ],
      features: [
        'Thiết kế modern + đương đại',
        'Sử dụng vật liệu xanh',
        'Hiệu quả năng lượng cao',
        'Hệ thống thông minh',
        'Eco-friendly amenities',
      ],
      client: 'Tập đoàn Bất Động Sản Lớn',
      team: 'Kiến trúc sư: Nguyễn Văn A, Lê Văn C',
    },
    'trung-tam-trinh-dien-nghe-thuat': {
      title: 'Trung Tâm Trình Diễn Nghệ Thuật',
      category: 'Công Cộng',
      year: 2023,
      location: 'Quan Hạng, Hà Nội',
      status: 'Hoàn Thành',
      area: '8000m²',
      value: '$20 Triệu',
      description: 'Công trình công cộng hiện đại với công suất 1000 chỗ, thiết kế kiến trúc độc đáo kết hợp phong cách hiện đại và truyền thống.',
      details: [
        'Sân khấu chính: 1000 chỗ',
        'Sân khấu phụ: 300 chỗ',
        'Phòng tập luyện: 5 phòng',
        'Thư viện: 2000m²',
        'Quán cà phê: 300m²',
      ],
      features: [
        'Âm học chuyên nghiệp',
        'Hệ thống ánh sáng hiện đại',
        'Không gian đa năng',
        'Kiến trúc biểu tượng',
        'Thân thiện với môi trường',
      ],
      client: 'Bộ Văn Hóa & Thông Tin',
      team: 'Kiến trúc sư: Trần Thị B, Phạm Thị D',
    },
  };

  const project = projects[slug] || projects['toa-nha-thuong-mai-trung-tam'];

  return (
    <main>
      <section className="project-detail-header">
        <h1>{project.title}</h1>
        <div className="project-meta">
          <span className="badge">{project.category}</span>
          <span className="badge">{project.status}</span>
          <span className="badge">{project.year}</span>
        </div>
      </section>

      <section className="project-detail-image">
        <div className="large-image">🏗️ {project.title}</div>
      </section>

      <section className="project-detail-content">
        <div className="project-info">
          <div className="info-card">
            <h3>📍 Vị Trí</h3>
            <p>{project.location}</p>
          </div>
          <div className="info-card">
            <h3>📐 Diện Tích</h3>
            <p>{project.area}</p>
          </div>
          <div className="info-card">
            <h3>💰 Giá Trị</h3>
            <p>{project.value}</p>
          </div>
          <div className="info-card">
            <h3>📅 Hoàn Thành</h3>
            <p>{project.year}</p>
          </div>
        </div>

        <div className="project-description">
          <h2>Mô Tả Dự Án</h2>
          <p>{project.description}</p>
        </div>

        <div className="project-details">
          <div className="details-column">
            <h2>Chi Tiết Kỹ Thuật</h2>
            <ul>
              {project.details.map((detail: string, index: number) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="details-column">
            <h2>Tính Năng Nổi Bật</h2>
            <ul>
              {project.features.map((feature: string, index: number) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-team">
          <div className="team-info">
            <h3>👥 Khách Hàng</h3>
            <p>{project.client}</p>
          </div>
          <div className="team-info">
            <h3>🎯 Đội Ngũ Thực Hiện</h3>
            <p>{project.team}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
