"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FaqSection from "@/components/FaqSection";
import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/ProjectCard";

const PER_PAGE = 8;


// Fetch projects 
async function getProjects(page: number) {
  const skip = (page - 1) * PER_PAGE;
  const res = await fetch(
    `/api/projects?skip=${skip}&limit=${PER_PAGE}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}


export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const page = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(total / PER_PAGE);

  useEffect(() => {
    setLoading(true);
    getProjects(page)
      .then((data) => {
        setProjects(data.items);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const handlePageChange = (p: number) => {
    router.push(`?page=${p}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Explore our featured listings</h2>
        <p className="text-gray-400 text-sm max-w-md text-right">From modern city apartments to spacious family homes, find the one that feels just right.</p>
      </div>
      {loading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((item: any, i: number) => (
            <div key={item._id} className={i === 0 ? "md:col-span-2" : ""}>
              <ProjectCard item={item} large={i === 0} index={i} />
            </div>
          ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      <FaqSection/>
    </section>
  );
}
