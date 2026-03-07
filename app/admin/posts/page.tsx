'use client';

export default function AdminPosts() {
  const posts = [
    { id: 1, title: 'Xu Hướng Kiến Trúc Bền Vững Năm 2024', author: 'Nguyễn Văn A', date: '15/02/2024' },
    { id: 2, title: 'Những Tiêu Chuẩn Xây Dựng Mới Năm 2023', author: 'Trần Thị B', date: '10/02/2024' },
    { id: 3, title: 'Năng Lượng Tái Tạo trong Xây Dựng', author: 'Lê Văn C', date: '05/02/2024' },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[#153631]/10 bg-[linear-gradient(120deg,#253f5f_0%,#364f77_100%)] p-6 text-white shadow-[0_18px_40px_rgba(23,43,69,0.22)] sm:p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-[#e6ddbf]">Content desk</p>
        <h2 className="mt-3 text-2xl font-semibold">Quan ly bai viet</h2>
        <p className="mt-2 max-w-2xl text-sm text-[#dfe6f3]">Dieu phoi ke hoach noi dung, theo doi tac gia va lich dang trong mot bang tong hop.</p>
      </section>

      <section className="rounded-3xl border border-[#153631]/10 bg-white p-5 shadow-[0_12px_32px_rgba(12,35,30,0.08)] sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-[#13322f]">Danh sach bai viet</h3>
            <p className="text-sm text-[#5d756a]">Tong {posts.length} bai viet trong kho noi dung.</p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-[#253f5f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1b2f48]"
          >
            + Viet bai moi
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#153631]/10">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="bg-[#f2f5fb] text-left text-[#334560]">
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Tieu de</th>
                <th className="px-4 py-3 font-semibold">Tac gia</th>
                <th className="px-4 py-3 font-semibold">Ngay dang</th>
                <th className="px-4 py-3 font-semibold">Hanh dong</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-[#153631]/10 odd:bg-white even:bg-[#fbfcff]">
                  <td className="px-4 py-3 text-[#4f665d]">#{post.id}</td>
                  <td className="px-4 py-3 font-medium text-[#0f2a27]">{post.title}</td>
                  <td className="px-4 py-3 text-[#3d4f68]">{post.author}</td>
                  <td className="px-4 py-3 text-[#4f665d]">{post.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className="rounded-lg border border-[#253f5f]/30 px-3 py-1.5 text-xs font-medium text-[#253f5f] hover:bg-[#eff4fd]">
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
