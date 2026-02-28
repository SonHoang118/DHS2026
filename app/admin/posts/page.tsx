'use client';

import AdminSidebar from '@/components/AdminSidebar';

export default function AdminPosts() {
  const posts = [
    { id: 1, title: 'Xu Hướng Kiến Trúc Bền Vững Năm 2024', author: 'Nguyễn Văn A', date: '15/02/2024' },
    { id: 2, title: 'Những Tiêu Chuẩn Xây Dựng Mới Năm 2023', author: 'Trần Thị B', date: '10/02/2024' },
    { id: 3, title: 'Năng Lượng Tái Tạo trong Xây Dựng', author: 'Lê Văn C', date: '05/02/2024' },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>📝 Quản Lý Bài Viết</h1>
          <p>Quản lý tất cả bài viết blog của công ty</p>
        </div>

        <div className="admin-actions">
          <button className="btn btn-primary">+ Viết Bài Mới</button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tiêu Đề</th>
                <th>Tác Giả</th>
                <th>Ngày Đăng</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>#{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                  <td>
                    <button className="btn-small">Sửa</button>
                    <button className="btn-small btn-danger">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <style jsx>{`
          .admin-layout {
            display: flex;
            min-height: 100vh;
            background-color: var(--color-gray-light);
          }

          .admin-main {
            flex: 1;
            padding: var(--spacing-2xl);
          }

          .admin-header {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
            color: white;
            padding: var(--spacing-2xl);
            border-radius: var(--border-radius-lg);
            margin-bottom: var(--spacing-2xl);
          }

          .admin-header h1 {
            color: white;
            margin-bottom: var(--spacing-md);
          }

          .admin-actions {
            margin-bottom: var(--spacing-xl);
            display: flex;
            gap: var(--spacing-md);
          }

          .admin-table-container {
            background: white;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-md);
            overflow: auto;
          }

          .admin-table {
            width: 100%;
            border-collapse: collapse;
          }

          .admin-table th,
          .admin-table td {
            padding: var(--spacing-md);
            text-align: left;
            border-bottom: 1px solid var(--color-border);
          }

          .admin-table th {
            background-color: var(--color-gray-light);
            font-weight: 600;
            color: var(--color-gray-dark);
          }

          .admin-table tr:hover {
            background-color: var(--color-gray-light);
          }

          .btn-small {
            padding: var(--spacing-xs) var(--spacing-md);
            font-size: var(--font-size-sm);
            margin-right: var(--spacing-sm);
            background-color: var(--color-primary);
            color: white;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .btn-small:hover {
            background-color: var(--color-primary-dark);
          }

          .btn-danger:hover {
            background-color: var(--color-danger);
          }

          .btn-danger {
            background-color: #ef9a9a;
          }
        `}</style>
      </main>
    </div>
  );
}
