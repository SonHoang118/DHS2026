'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    if (email && password) {
      // For demo, just redirect to dashboard
      window.location.href = '/admin/dashboard';
    } else {
      setError('Vui lòng nhập email và mật khẩu');
    }
  };

  return (
    <main className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🔐 Đăng Nhập Admin</h1>
          <p>Quản Lý Công Ty Thiết Kế & Thi Công Kiến Trúc</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật Khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Đăng Nhập
          </button>
        </form>

        <div className="login-footer">
          <p>Quay lại trang chủ? <Link href="/">Trang Chủ</Link></p>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a73e8 0%, #1565c0 100%);
          padding: var(--spacing-lg);
        }

        .login-box {
          background: white;
          padding: var(--spacing-2xl);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-xl);
          width: 100%;
          max-width: 400px;
        }

        .login-header {
          text-align: center;
          margin-bottom: var(--spacing-2xl);
        }

        .login-header h1 {
          color: var(--color-primary);
          margin-bottom: var(--spacing-md);
        }

        .login-header p {
          color: var(--color-gray);
          font-size: var(--font-size-sm);
        }

        .alert {
          padding: var(--spacing-md);
          border-radius: var(--border-radius);
          margin-bottom: var(--spacing-lg);
        }

        .alert-error {
          background-color: #ffebee;
          color: #d32f2f;
          border-left: 4px solid #d32f2f;
        }

        .login-form {
          display: grid;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
        }

        .login-footer {
          text-align: center;
          border-top: 1px solid var(--color-border);
          padding-top: var(--spacing-lg);
        }

        .login-footer p {
          margin: 0;
          font-size: var(--font-size-sm);
        }

        .login-footer a {
          color: var(--color-primary);
          font-weight: 600;
        }
      `}</style>
    </main>
  );
}
