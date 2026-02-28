'use client';

import AdminSidebar from '@/components/AdminSidebar';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>📊 Bảng Điều Khiển</h1>
          <p>Chào mừng quay lại bảng quản lý công ty</p>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-icon">🏗️</div>
            <div className="stat-content">
              <h3>Dự Án Hoàn Thành</h3>
              <p className="stat-number">150+</p>
              <p className="stat-label">công trình</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div className="stat-content">
              <h3>Bài Viết Blog</h3>
              <p className="stat-number">42</p>
              <p className="stat-label">bài viết</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📧</div>
            <div className="stat-content">
              <h3>Liên Hệ Mới</h3>
              <p className="stat-number">25</p>
              <p className="stat-label">tin nhắn</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Khách Hàng</h3>
              <p className="stat-number">186</p>
              <p className="stat-label">khách hàng</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Quản Lý Nhanh</h2>
          <div className="quick-actions">
            <Link href="/admin/projects" className="action-card">
              <span className="action-icon">🏗️</span>
              <h3>Quản Lý Dự Án</h3>
              <p>Thêm, sửa, xóa dự án</p>
            </Link>
            <Link href="/admin/posts" className="action-card">
              <span className="action-icon">📝</span>
              <h3>Quản Lý Bài Viết</h3>
              <p>Tạo và chỉnh sửa blog</p>
            </Link>
            <Link href="/admin/contacts" className="action-card">
              <span className="action-icon">📧</span>
              <h3>Quản Lý Liên Hệ</h3>
              <p>Xem tin nhắn từ khách hàng</p>
            </Link>
          </div>
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

          .admin-header p {
            color: rgba(255, 255, 255, 0.9);
          }

          .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-2xl);
          }

          .stat-card {
            background: white;
            padding: var(--spacing-lg);
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-md);
            display: flex;
            gap: var(--spacing-lg);
            align-items: center;
          }

          .stat-icon {
            font-size: var(--font-size-4xl);
            min-width: 60px;
            text-align: center;
          }

          .stat-content h3 {
            font-size: var(--font-size-sm);
            color: var(--color-gray);
            font-weight: 600;
            margin: 0 0 var(--spacing-sm) 0;
          }

          .stat-number {
            font-size: var(--font-size-2xl);
            color: var(--color-primary);
            font-weight: 700;
            margin: 0;
          }

          .stat-label {
            font-size: var(--font-size-sm);
            color: var(--color-gray);
            margin: 0;
          }

          .dashboard-section {
            background: white;
            padding: var(--spacing-2xl);
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-md);
          }

          .dashboard-section h2 {
            margin-bottom: var(--spacing-xl);
            color: var(--color-primary);
          }

          .quick-actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-lg);
          }

          .action-card {
            background-color: var(--color-gray-light);
            padding: var(--spacing-lg);
            border-radius: var(--border-radius-lg);
            text-align: center;
            transition: all 0.3s ease;
            text-decoration: none;
            color: inherit;
          }

          .action-card:hover {
            background-color: var(--color-white);
            box-shadow: var(--shadow-lg);
            transform: translateY(-5px);
          }

          .action-icon {
            font-size: var(--font-size-4xl);
            display: block;
            margin-bottom: var(--spacing-md);
          }

          .action-card h3 {
            color: var(--color-primary);
            margin-bottom: var(--spacing-sm);
            font-size: var(--font-size-lg);
          }

          .action-card p {
            color: var(--color-gray);
            font-size: var(--font-size-sm);
            margin: 0;
          }
        `}</style>
      </main>
    </div>
  );
}
