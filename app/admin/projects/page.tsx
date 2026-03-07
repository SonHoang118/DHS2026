'use client';

export default function AdminProjects() {
  const projects = [
    { id: 1, title: 'Tòa Nhà Thương Mại Trung Tâm', status: 'Hoàn Thành', year: 2022 },
    { id: 2, title: 'Khu Biệt Thự Cao Cấp', status: 'Hoàn Thành', year: 2021 },
    { id: 3, title: 'Trung Tâm Trình Diễn Nghệ Thuật', status: 'Hoàn Thành', year: 2023 },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[#153631]/10 bg-[linear-gradient(120deg,#173f3a_0%,#27554e_100%)] p-6 text-white shadow-[0_18px_40px_rgba(14,35,31,0.2)] sm:p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-[#e8d0b2]">Project management</p>
        <h2 className="mt-3 text-2xl font-semibold">Quan ly du an</h2>
        <p className="mt-2 max-w-2xl text-sm text-[#d9e6df]">Theo doi danh sach du an va cap nhat trang thai nhanh trong mot bang du lieu thong nhat.</p>
      </section>

      <section className="rounded-3xl border border-[#153631]/10 bg-white p-5 shadow-[0_12px_32px_rgba(12,35,30,0.08)] sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-[#13322f]">Danh sach du an</h3>
            <p className="text-sm text-[#5d756a]">Tong {projects.length} du an trong he thong.</p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-[#173531] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0f2926]"
          >
            + Them du an moi
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#153631]/10">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="bg-[#f1f6f3] text-left text-[#36544d]">
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Ten du an</th>
                <th className="px-4 py-3 font-semibold">Trang thai</th>
                <th className="px-4 py-3 font-semibold">Nam</th>
                <th className="px-4 py-3 font-semibold">Hanh dong</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-[#153631]/10 odd:bg-white even:bg-[#fbfdfc]">
                  <td className="px-4 py-3 text-[#4f665d]">#{project.id}</td>
                  <td className="px-4 py-3 font-medium text-[#0f2a27]">{project.title}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#e6f4ec] px-3 py-1 text-xs font-semibold text-[#2d6a4f]">{project.status}</span>
                  </td>
                  <td className="px-4 py-3 text-[#4f665d]">{project.year}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className="rounded-lg border border-[#153631]/20 px-3 py-1.5 text-xs font-medium text-[#173531] hover:bg-[#eff6f2]">
                        Sua
                      </button>
                      <button type="button" className="rounded-lg border border-[#9a433d]/30 px-3 py-1.5 text-xs font-medium text-[#9a433d] hover:bg-[#fff1f0]">
                        Xoa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
