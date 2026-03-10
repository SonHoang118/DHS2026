"use client";

import { Suspense, useEffect, useState } from "react";
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


function PostsContent() {
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
      <section className="bg-[#f3f4f6] py-10">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="mb-14 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">Các bài viết mới nhất</h2>

            <p className="text-sm text-gray-500 max-w-sm md:text-right">
              Cập nhật ngay những tin tức mới từ chúng tôi, có thể giúp ích cho ý tưởng dự án sắp tới của bạn đấy!
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

export default function Posts() {
  return (
    <Suspense fallback={<div className="py-10 text-center">Đang tải dữ liệu...</div>}>
      <PostsContent />
    </Suspense>
  );
}
