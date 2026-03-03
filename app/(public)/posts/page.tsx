'use client';

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FaqSection from "@/components/FaqSection";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";

const PER_PAGE = 7;

// fetch posts
async function getPosts(page: number) {
  const skip = (page - 1) * PER_PAGE;
  const res = await fetch(
    `/api/posts?skip=${skip}&limit=${PER_PAGE}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}




export default function Posts() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const page = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(total / PER_PAGE);

  useEffect(() => {
    setLoading(true);
    getPosts(page)
      .then((data) => {
        setPosts(data.items);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const handlePageChange = (p: number) => {
    router.push(`?page=${p}`);
  };

  return (
    <main>
      <section className="bg-[#f3f4f6] py-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="flex justify-between items-start mb-14">
            <h2 className="text-4xl font-semibold text-gray-900">
              Our Recent Post
            </h2>

            <p className="text-sm text-gray-500 max-w-sm text-right">
              From modern city apartments to spacious family homes,
              find the one that feels just right.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-10">Đang tải dữ liệu...</div>
          ) : posts.length > 0 ? (
            <>
              {/* ================= FEATURED POST ================= */}
              {posts.slice(0, 1).map((post: any) => (
                <div
                  key={post._id}
                  className="grid md:grid-cols-2 gap-10 items-center mb-20"
                >
                  <PostCard item={post} featured index={0} />
                </div>
              ))}
              {/* ================= 6 SMALL POSTS ================= */}
              <div className="grid md:grid-cols-3 gap-10">
                {posts.slice(1).map((post: any, i: number) => (
                  <PostCard key={post._id} item={post} index={i} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10">Không có bài viết nào</div>
          )}

          
          {/* PAGINATION */}
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
  
        </div>
      </section>

      <FaqSection/>
    </main>
  );
}
