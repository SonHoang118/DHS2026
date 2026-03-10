"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FaqSection from "@/components/FaqSection";
import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/ProjectCard";

const PER_PAGE = 8;


// Fetch projects 
async function getProjects(page: number, q: string) {
  const skip = (page - 1) * PER_PAGE;
  const res = await fetch(
    `/api/projects?skip=${skip}&limit=${PER_PAGE}&q=${encodeURIComponent(q)}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}


function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const page = Number(searchParams.get("page") || 1);
  const q = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(q);
  const totalPages = Math.ceil(total / PER_PAGE);

  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  useEffect(() => {
    setLoading(true);
    getProjects(page, q)
      .then((data) => {
        setProjects(data.items);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [page, q]);

  const handlePageChange = (p: number) => {
    const nextParams = new URLSearchParams();
    nextParams.set("page", String(p));
    if (q) {
      nextParams.set("q", q);
    }
    router.push(`?${nextParams.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextParams = new URLSearchParams();
    if (searchInput.trim()) {
      nextParams.set("q", searchInput.trim());
    }
    nextParams.set("page", "1");
    router.push(`?${nextParams.toString()}`);
  };

  const clearSearch = () => {
    setSearchInput("");
    router.push("?page=1");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Khám phá các dự án nổi bật</h2>
          <p className="text-gray-400 text-sm max-w-md">
            Từ các căn hộ hiện đại trong thành phố đến những ngôi nhà rộng rãi cho gia đình, tìm dự án phù hợp với bạn để tham khảo.
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="w-full md:w-auto flex items-center gap-2">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Tìm theo tên, chủ đầu tư, vị trí..."
            className="w-full md:w-[320px] px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C00707]/30"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#C00707] text-white font-medium hover:opacity-90 transition"
          >
            Tìm
          </button>
          {q && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-3 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
            >
              Xóa
            </button>
          )}
        </form>
      </div>

      {q && (
        <p className="mb-6 text-sm text-gray-500">
          Kết quả cho: <span className="font-semibold text-gray-700">"{q}"</span> ({total} dự án)
        </p>
      )}

      {loading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((item: any, i: number) => (
            <div key={item._id} className={i === 0 ? "md:col-span-2" : ""}>
              <ProjectCard item={item} large={i === 0} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300">
          Không tìm thấy dự án phù hợp.
        </div>
      )}
      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
      <FaqSection/>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="py-10 text-center">Đang tải dữ liệu...</div>}>
      <ProjectsPageContent />
    </Suspense>
  );
}
