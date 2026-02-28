'use client';

import AdminSidebar from '@/components/AdminSidebar';

export default function AdminProjects() {
  const projects = [
    { id: 1, title: 'Tòa Nhà Thương Mại Trung Tâm', status: 'Hoàn Thành', year: 2022 },
    { id: 2, title: 'Khu Biệt Thự Cao Cấp', status: 'Hoàn Thành', year: 2021 },
    { id: 3, title: 'Trung Tâm Trình Diễn Nghệ Thuật', status: 'Hoàn Thành', year: 2023 },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>🏗️ Quản Lý Dự Án</h1>
          <p>Quản lý tất cả các dự án của công ty</p>
        </div>

        <div className="admin-actions">
          <button className="btn btn-primary">+ Thêm Dự Án Mới</button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Dự Án</th>
                <th>Trạng Thái</th>
                <th>Năm</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>#{project.id}</td>
                  <td>{project.title}</td>
                  <td><span className="badge-success">{project.status}</span></td>
                  <td>{project.year}</td>
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

          .badge-success {
            display: inline-block;
            background-color: #c8e6c9;
            color: #2e7d32;
            padding: var(--spacing-xs) var(--spacing-md);
            border-radius: var(--border-radius);
            font-size: var(--font-size-sm);
            font-weight: 600;
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
