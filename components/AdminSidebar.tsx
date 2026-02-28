import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>📊 Bảng Điều Khiển</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link href="/admin/dashboard" className="nav-link">
              <span className="icon">📈</span> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/projects" className="nav-link">
              <span className="icon">🏗️</span> Quản Lý Dự Án
            </Link>
          </li>
          <li>
            <Link href="/admin/posts" className="nav-link">
              <span className="icon">📝</span> Quản Lý Bài Viết
            </Link>
          </li>
          <li>
            <Link href="/admin/contacts" className="nav-link">
              <span className="icon">📧</span> Quản Lý Liên Hệ
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link href="/admin/login" className="nav-link logout">
              <span className="icon">🚪</span> Đăng Xuất
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
