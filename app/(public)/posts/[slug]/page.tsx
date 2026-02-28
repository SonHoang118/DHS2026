'use client';

import { useParams } from 'next/navigation';

export default function PostDetail() {
  const params = useParams();
  const slug = params.slug as string;

  // Post data
  const posts: Record<string, any> = {
    'xu-huong-kien-truc-2024': {
      title: 'Xu Hướng Kiến Trúc Bền Vững Năm 2024',
      author: 'Nguyễn Văn A',
      date: '15 Tháng 2, 2024',
      category: 'Kiến Trúc',
      readTime: '5 phút',
      content: `
        <h2>Giới thiệu</h2>
        <p>
          Năm 2024 sẽ chứng kiến sự thay đổi đáng kể trong lĩnh vực kiến trúc, 
          với sự tập trung vào tính bền vững và kỹ thuật số. Các kiến trúc sư 
          trên thế giới đang tìm cách kết hợp công nghệ hiện đại với các 
          nguyên tắc thiết kế bền vững.
        </p>

        <h2>1. Kiến Trúc Xanh và Bền Vững</h2>
        <p>
          Các tòa nhà xanh không chỉ tốt cho môi trường mà còn giúp giảm 
          chi phí vận hành. Sử dụng năng lượng tái tạo, vật liệu tái chế 
          và hệ thống tiết kiệm nước đang trở thành tiêu chuẩn.
        </p>

        <h2>2. Thiết Kế Linh Hoạt</h2>
        <p>
          Không gian có thể thích ứng đang trở thành ưu tiên, cho phép các 
          tòa nhà thay đổi chức năng theo nhu cầu. Điều này đặc biệt quan 
          trọng sau đại dịch COVID-19.
        </p>

        <h2>3. Công Nghệ BIM</h2>
        <p>
          Building Information Modeling (BIM) đang trở thành tiêu chuẩn trong 
          ngành, giúp cải thiện cộng tác giữa các bên liên quan.
        </p>

        <h2>Kết luận</h2>
        <p>
          Kiến trúc của tương lai sẽ là sự kết hợp giữa tính bền vững, 
          công nghệ và sáng tạo. Những công ty như chúng tôi đang dẫn đầu 
          trong cuộc chuyển đổi này.
        </p>
      `,
    },
    'thiet-ke-noi-that-can-ho-hien-dai': {
      title: 'Thiết Kế Nội Thất Căn Hộ Hiện Đại',
      author: 'Phạm Thị D',
      date: '1 Tháng 2, 2024',
      category: 'Nội Thất',
      readTime: '5 phút',
      content: `
        <h2>Giới thiệu</h2>
        <p>
          Thiết kế nội thất căn hộ hiện đại đòi hỏi sự cân bằng giữa 
          tính thẩm mỹ và chức năng. Trong bài viết này, chúng tôi sẽ 
          chia sẻ những mẹo để tối ưu hóa không gian bạn.
        </p>

        <h2>1. Sử Dụng Màu Sắc Thông Minh</h2>
        <p>
          Lựa chọn bảng màu trung tính làm cơ sở, sau đó thêm các điểm 
          nhấn màu sắc thông qua nội thất và trang trí.
        </p>

        <h2>2. Lưu Trữ Thông Minh</h2>
        <p>
          Tận dụng không gian lưu trữ dọc để giữ không gian sạch sẽ và 
          tổ chức.
        </p>

        <h2>3. Ánh Sáng Tự Nhiên</h2>
        <p>
          Tối đa hóa ánh sáng tự nhiên để tạo cảm giác rộng rãi hơn.
        </p>

        <h2>Kết luận</h2>
        <p>
          Với những mẹo này, bạn có thể tạo ra một căn hộ vừa đẹp vừa 
          tiện nghi.
        </p>
      `,
    },
  };

  const post = posts[slug] || posts['xu-huong-kien-truc-2024'];

  return (
    <main>
      <article className="post-detail">
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta-detail">
            <span className="category-badge">{post.category}</span>
            <span>👤 {post.author}</span>
            <span>📅 {post.date}</span>
            <span>⏱️ {post.readTime}</span>
          </div>
        </header>

        <div className="post-featured-image">
          <div className="featured-placeholder">📰 {post.title}</div>
        </div>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="post-footer">
          <div className="author-info">
            <div className="author-avatar">👤</div>
            <div className="author-details">
              <h3>{post.author}</h3>
              <p>Kiến trúc sư chuyên nghiệp với nhiều năm kinh nghiệm trong ngành</p>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
