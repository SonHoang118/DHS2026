'use client';

export default function AdminContacts() {
  const contacts = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', subject: 'Tư vấn thiết kế', status: 'Chưa trả lời' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', subject: 'Tư vấn thi công', status: 'Đã trả lời' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', subject: 'Liên hệ hợp tác', status: 'Chưa trả lời' },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[#153631]/10 bg-[linear-gradient(125deg,#3d2d51_0%,#4f3f63_100%)] p-6 text-white shadow-[0_18px_40px_rgba(38,28,50,0.22)] sm:p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-[#e7d5c2]">Customer inbox</p>
        <h2 className="mt-3 text-2xl font-semibold">Quan ly lien he</h2>
        <p className="mt-2 max-w-2xl text-sm text-[#e6deef]">Tong hop yeu cau khach hang, theo doi tien do phan hoi va suu tap thong tin lien lac.</p>
      </section>

      <section className="rounded-3xl border border-[#153631]/10 bg-white p-5 shadow-[0_12px_32px_rgba(12,35,30,0.08)] sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-[#13322f]">Hop thu lien he</h3>
            <p className="text-sm text-[#5d756a]">Tong {contacts.length} cuoc trao doi can xu ly.</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#153631]/10">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="bg-[#f5f3f9] text-left text-[#4a3f5c]">
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Ten</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Chu de</th>
                <th className="px-4 py-3 font-semibold">Trang thai</th>
                <th className="px-4 py-3 font-semibold">Hanh dong</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-t border-[#153631]/10 odd:bg-white even:bg-[#fcfbff]">
                  <td className="px-4 py-3 text-[#4f665d]">#{contact.id}</td>
                  <td className="px-4 py-3 font-medium text-[#0f2a27]">{contact.name}</td>
                  <td className="px-4 py-3 text-[#2b4968]">{contact.email}</td>
                  <td className="px-4 py-3 text-[#4f665d]">{contact.subject}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        contact.status === 'Đã trả lời'
                          ? 'bg-[#e7f6ea] text-[#2d6a4f]'
                          : 'bg-[#fff2df] text-[#a15d16]'
                      }`}
                    >
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className="rounded-lg border border-[#4f3f63]/25 px-3 py-1.5 text-xs font-medium text-[#4f3f63] hover:bg-[#f2eef8]">
                        Xem
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
