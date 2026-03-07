'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

type AdminShellProps = {
  children: React.ReactNode;
};

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const navItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'DG' },
  { href: '/admin/projects', label: 'Du an', icon: 'DA' },
  { href: '/admin/styles', label: 'Style', icon: 'ST' },
  { href: '/admin/categories', label: 'Category', icon: 'CT' },
  { href: '/admin/posts', label: 'Bai viet', icon: 'BV' },
  { href: '/admin/contacts', label: 'Lien he', icon: 'LH' },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pageTitle = useMemo(() => {
    const matched = navItems.find((item) => isActive(pathname, item.href));
    return matched?.label ?? 'Admin';
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/login', { method: 'DELETE' });
    } finally {
      router.push('/admin/login');
      router.refresh();
    }
  };

  if (pathname === '/admin/login') {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_10%,#d9efe4_0%,#f5f6f2_42%,#ebe9df_100%)]">
        <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-[#183a37]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-6 h-72 w-72 rounded-full bg-[#b57b3e]/15 blur-3xl" />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6f2] text-[#132725]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="sticky top-0 hidden h-screen overflow-y-auto border-r border-[#1e3632]/10 bg-[#16302d] p-6 text-[#ecf3ef] lg:block">
          <div className="mb-8 rounded-2xl border border-[#d3b289]/40 bg-[#ecf3ef]/10 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#d3b289]">DHS Studio</p>
            <h2 className="mt-2 text-xl font-semibold">Admin Center</h2>
            <p className="mt-1 text-sm text-[#cce0d6]">Quan tri noi dung va du an.</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-[#ecf3ef] text-[#0e2321] shadow-[0_8px_20px_rgba(0,0,0,0.18)]'
                      : 'text-[#d4e4dc] hover:bg-[#ecf3ef]/10 hover:text-white'
                  }`}
                >
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                      active ? 'bg-[#173531] text-[#ecf3ef]' : 'bg-[#ecf3ef]/10 text-[#e7d2b5]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-[#ecf3ef]/15 pt-5">
            <Link
              href="/"
              className="mb-3 inline-flex w-full items-center justify-center rounded-xl border border-[#d3b289]/40 bg-[#ecf3ef]/5 px-4 py-3 text-sm font-medium text-[#f0ddc2] transition hover:bg-[#ecf3ef]/10"
            >
              Ve trang chu
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex w-full items-center justify-center rounded-xl border border-[#ecf3ef]/30 px-4 py-3 text-sm font-medium text-[#ecf3ef] transition hover:bg-[#ecf3ef]/10"
            >
              Dang xuat
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-20 border-b border-[#16302d]/10 bg-[#f5f6f2]/90 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-10 lg:py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#6a7f73]">Admin Panel</p>
                <h1 className="text-xl font-semibold text-[#143330] sm:text-2xl">{pageTitle}</h1>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-lg border border-[#173532]/20 bg-white px-3 py-2 text-sm font-medium text-[#173532] shadow-sm"
                >
                  Ve trang chu
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                  className="inline-flex items-center rounded-lg border border-[#173532]/20 bg-white px-3 py-2 text-sm font-medium text-[#173532] shadow-sm lg:hidden"
                  aria-expanded={open}
                >
                  Menu
                </button>
              </div>
            </div>

            {open && (
              <div className="space-y-1 border-t border-[#16302d]/10 bg-white p-3 lg:hidden">
                {navItems.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                        active ? 'bg-[#153430] text-white' : 'text-[#153430] hover:bg-[#e6eee9]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg border border-[#153430]/20 px-3 py-2 text-sm font-medium text-[#153430]"
                >
                  Ve trang chu
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="mt-1 block w-full rounded-lg border border-[#153430]/20 px-3 py-2 text-left text-sm font-medium text-[#153430]"
                >
                  Dang xuat
                </button>
              </div>
            )}
          </header>

          <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
