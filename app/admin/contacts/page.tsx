'use client';

import AdminSidebar from '@/components/AdminSidebar';

export default function AdminContacts() {
  const contacts = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', subject: 'Tư vấn thiết kế', status: 'Chưa trả lời' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', subject: 'Tư vấn thi công', status: 'Đã trả lời' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', subject: 'Liên hệ hợp tác', status: 'Chưa trả lời' },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h1>📧 Quản Lý Liên Hệ</h1>
          <p>Quản lý các tin nhắn từ khách hàng</p>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Chủ Đề</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>#{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.subject}</td>
                  <td>
                    <span className={`badge ${contact.status === 'Đã trả lời' ? 'badge-success' : 'badge-warning'}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-small">Xem</button>
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

          .badge {
            display: inline-block;
            padding: var(--spacing-xs) var(--spacing-md);
            border-radius: var(--border-radius);
            font-size: var(--font-size-sm);
            font-weight: 600;
          }

          .badge-success {
            background-color: #c8e6c9;
            color: #2e7d32;
          }

          .badge-warning {
            background-color: #ffe0b2;
            color: #ef6c00;
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
