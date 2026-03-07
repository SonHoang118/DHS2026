'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Du an hoan thanh', value: '150+', hint: 'Cong trinh', tone: 'from-[#17443f] to-[#29695f]' },
    { label: 'Bai viet dang tai', value: '42', hint: 'Bai blog', tone: 'from-[#865323] to-[#b0783b]' },
    { label: 'Lien he moi', value: '25', hint: 'Tin nhan chua doc', tone: 'from-[#1d5e5b] to-[#247774]' },
    { label: 'Khach hang', value: '186', hint: 'Da hop tac', tone: 'from-[#3f5169] to-[#576f90]' },
  ];

  const actions = [
    {
      title: 'Quan ly du an',
      desc: 'Them, sua, cap nhat tien do thi cong.',
      href: '/admin/projects',
      mark: 'DA',
    },
    {
      title: 'Quan ly bai viet',
      desc: 'Dang bai moi va toi uu noi dung website.',
      href: '/admin/posts',
      mark: 'BV',
    },
    {
      title: 'Quan ly lien he',
      desc: 'Theo doi yeu cau va phan hoi khach hang.',
      href: '/admin/contacts',
      mark: 'LH',
    },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-[#13312e]/10 bg-[linear-gradient(140deg,#173f3a_0%,#245852_48%,#356f65_100%)] px-6 py-8 text-white shadow-[0_20px_45px_rgba(14,34,31,0.22)] sm:px-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#f3d7b8]/20 blur-2xl" />
        <p className="text-xs uppercase tracking-[0.2em] text-[#f2dac0]">Tong quan he thong</p>
        <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Bang dieu khien quan tri DHS Studio</h2>
        <p className="mt-3 max-w-2xl text-sm text-[#d9e8e0] sm:text-base">
          Theo doi hieu suat noi dung, du an va phan hoi khach hang trong cung mot khong gian quan ly thong nhat.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-[#153530]/10 bg-white p-4 shadow-[0_8px_30px_rgba(12,35,30,0.08)]"
          >
            <div className={`mb-4 inline-flex rounded-lg bg-linear-to-br ${item.tone} px-3 py-1 text-xs font-semibold text-white`}>
              {item.label}
            </div>
            <p className="text-3xl font-semibold text-[#0e2825]">{item.value}</p>
            <p className="mt-1 text-sm text-[#61766b]">{item.hint}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-[#173531]/10 bg-white p-5 shadow-[0_12px_35px_rgba(13,35,31,0.08)] sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-[#143330] sm:text-xl">Truy cap nhanh</h3>
          <span className="rounded-full bg-[#edf3ef] px-3 py-1 text-xs font-medium text-[#244a45]">3 khu vuc chinh</span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-2xl border border-[#1a3a35]/10 bg-[#f7faf8] p-5 transition hover:-translate-y-0.5 hover:border-[#1f4b44]/30 hover:shadow-[0_14px_30px_rgba(23,53,49,0.12)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#173531] text-sm font-semibold text-white">
                {action.mark}
              </span>
              <h4 className="mt-4 text-base font-semibold text-[#143330]">{action.title}</h4>
              <p className="mt-2 text-sm text-[#60786c]">{action.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-[#173531]/10 bg-white p-5 shadow-[0_12px_35px_rgba(13,35,31,0.08)] sm:p-7">
        <h3 className="text-lg font-semibold text-[#143330] sm:text-xl">Nho viec hom nay</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[#1b3d38]/10 bg-[#fafdfb] p-4 text-sm text-[#33514b]">
            Kiem tra 5 tin nhan lien he moi va gan nguoi phu trach.
          </div>
          <div className="rounded-xl border border-[#1b3d38]/10 bg-[#fafdfb] p-4 text-sm text-[#33514b]">
            Xuat ban 1 bai viet huong dan khach hang chon vat lieu.
          </div>
          <div className="rounded-xl border border-[#1b3d38]/10 bg-[#fafdfb] p-4 text-sm text-[#33514b]">
            Cap nhat anh thumb cho du an biet thu moi nhat.
          </div>
          <div className="rounded-xl border border-[#1b3d38]/10 bg-[#fafdfb] p-4 text-sm text-[#33514b]">
            Ra soat trang thai du an quy 2 truoc buoi hop chieu.
          </div>
        </div>
      </section>
    </div>
  );
}
