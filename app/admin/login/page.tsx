'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui long nhap email va mat khau');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.error ?? 'Dang nhap that bai');
        return;
      }

      const nextPath = searchParams.get('next');
      const redirectPath =
        nextPath && nextPath.startsWith('/admin/') ? nextPath : '/admin/dashboard';

      router.push(redirectPath);
      router.refresh();
    } catch {
      setError('Khong the ket noi toi may chu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-[#173531]/10 bg-white/90 shadow-[0_24px_70px_rgba(18,45,41,0.18)] backdrop-blur">
        <div className="grid md:grid-cols-2">
          <section className="bg-[linear-gradient(150deg,#163934_0%,#29524d_55%,#3a6a62_100%)] p-8 text-white sm:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#e7d4b9]">Welcome back</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight">
              Admin portal
              <br />
              DHS Studio
            </h1>
            <p className="mt-4 max-w-sm text-sm text-[#d9e8e1]">
              Dang nhap de quan ly du an, bai viet va ho tro khach hang tren he thong noi bo.
            </p>

            <div className="mt-8 space-y-3 text-sm text-[#deebe5]">
              <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">Bao mat 2 lop san sang tich hop.</div>
              <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">Du lieu duoc dong bo theo thoi gian thuc.</div>
              <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">Giao dien toi uu desktop va mobile.</div>
            </div>
          </section>

          <section className="p-8 sm:p-10">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#143330]">Dang nhap</h2>
              <p className="mt-2 text-sm text-[#5f766c]">Su dung tai khoan quan tri de tiep tuc.</p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-[#f2b9b4] bg-[#fff3f2] px-4 py-3 text-sm text-[#9a2f24]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#183a36]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full rounded-xl border border-[#173531]/20 bg-[#fafcfb] px-4 py-3 text-sm text-[#13312e] outline-none transition placeholder:text-[#8aa095] focus:border-[#1d4d46] focus:ring-2 focus:ring-[#c9ddd5]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#183a36]">
                  Mat khau
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhap mat khau"
                  required
                  className="w-full rounded-xl border border-[#173531]/20 bg-[#fafcfb] px-4 py-3 text-sm text-[#13312e] outline-none transition placeholder:text-[#8aa095] focus:border-[#1d4d46] focus:ring-2 focus:ring-[#c9ddd5]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#173531] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f2825]"
              >
                {isSubmitting ? 'Dang xu ly...' : 'Dang nhap'}
              </button>
            </form>

            <p className="mt-3 text-xs text-[#6a8076]">
              Tai khoan admin: <span className="font-semibold">admin@dhs.local</span>
            </p>

            <div className="mt-6 border-t border-[#173531]/10 pt-4 text-sm text-[#5f766c]">
              Quay lai trang chu?{' '}
              <Link href="/" className="font-semibold text-[#1a4a44] hover:underline">
                Trang chu
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<div className="py-10 text-center">Dang tai...</div>}>
      <AdminLoginContent />
    </Suspense>
  );
}
