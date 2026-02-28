'use client';

import Link from 'next/link';

export default function Posts() {
  const posts = [
    {
      slug: 'xu-huong-kien-truc-2024',
      title: 'Xu Hướng Kiến Trúc Bền Vững Năm 2024',
      excerpt: 'Tìm hiểu những xu hướng kiến trúc mới nổi và cách chúng ảnh hưởng đến thiết kế hiện đại.',
      author: 'Nguyễn Văn A',
      date: '15 Tháng 2, 2024',
      category: 'Kiến Trúc',
      readTime: '5 phút',
    },
    {
      slug: 'tieu-chuan-xay-dung-2023',
      title: 'Những Tiêu Chuẩn Xây Dựng Mới Năm 2023',
      excerpt: 'Cập nhật các tiêu chuẩn xây dựng mới nhất và ảnh hưởng của chúng đến quy trình thiết kế.',
      author: 'Trần Thị B',
      date: '10 Tháng 2, 2024',
      category: 'Quy Định',
      readTime: '6 phút',
    },
    {
      slug: 'nang-luong-tai-tao-trong-xay-dung',
      title: 'Năng Lượng Tái Tạo trong Xây Dựng',
      excerpt: 'Cách sử dụng năng lượng tái tạo để giảm chi phí và bảo vệ môi trường.',
      author: 'Lê Văn C',
      date: '5 Tháng 2, 2024',
      category: 'Bền Vững',
      readTime: '7 phút',
    },
    {
      slug: 'thiet-ke-noi-that-can-ho-hien-dai',
      title: 'Thiết Kế Nội Thất Căn Hộ Hiện Đại',
      excerpt: 'Mẹo và kỹ thuật để thiết kế nội thất căn hộ nhỏ một cách hiệu quả.',
      author: 'Phạm Thị D',
      date: '1 Tháng 2, 2024',
      category: 'Nội Thất',
      readTime: '5 phút',
    },
    {
      slug: 'quy-hoach-do-thi-thong-minh',
      title: 'Quy Hoạch Đô Thị Thông Minh',
      excerpt: 'Khám phá cách công nghệ IoT đang thay đổi cách chúng ta thiết kế các thành phố.',
      author: 'Nguyễn Văn A',
      date: '25 Tháng 1, 2024',
      category: 'Công Nghệ',
      readTime: '8 phút',
    },
    {
      slug: 'bao-tri-bao-ve-toa-nha',
      title: 'Bảo Trì và Bảo Vệ Tòa Nhà Lâu Dài',
      excerpt: 'Hướng dẫn bảo trì và bảo vệ công trình để hạn chế chi phí sửa chữa.',
      author: 'Lê Văn C',
      date: '20 Tháng 1, 2024',
      category: 'Bảo Trì',
      readTime: '6 phút',
    },
  ];

  return (
    <main>
      <section className="page-header">
        <h1>Bài Viết & Tin Tức</h1>
        <p>Cập nhật kiến thức về kiến trúc, xây dựng và thiết kế</p>
      </section>

      <section className="posts-list">
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.slug} className="post-card-item">
              <div className="post-category-tag">{post.category}</div>
              <h3>{post.title}</h3>
              <p className="post-excerpt">{post.excerpt}</p>
              <div className="post-meta">
                <span className="author">👤 {post.author}</span>
                <span className="date">📅 {post.date}</span>
                <span className="read-time">⏱️ {post.readTime}</span>
              </div>
              <Link href={`/posts/${post.slug}`} className="btn btn-small">
                Đọc Tiếp
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
