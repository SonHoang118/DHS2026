'use client';

"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FaqSection from "@/components/FaqSection";

const PER_PAGE = 7;

async function getPosts(page: number) {
  const skip = (page - 1) * PER_PAGE;
  const res = await fetch(
    `/api/posts?skip=${skip}&limit=${PER_PAGE}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}


function CardFeaturedPost({ item, large, index }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [delay] = useState(() => Math.floor(Math.random() * 400));
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Image */}
      <div
        ref={ref}
        className={`group transition cursor-pointer duration-700 ease-out transform ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
        style={{ willChange: "transform, opacity", transitionDelay: `${delay}ms` }}
      >
        <div className="relative h-[380px] rounded-md overflow-hidden">
          <Image
            src={item.imgTitle}
            alt={item.title}
            fill
            className={`w-full object-cover transition duration-500 group-hover:scale-102`}
          />
        </div>
      </div>

      {/* Content */}
      <div className="transition duration-700 ease-out">
        <p className="text-xs tracking-widest text-gray-500 mb-3">
          Chính trị &nbsp; {formatDate(item.createdAt)}
        </p>

        <h3 className="text-3xl font-semibold text-gray-900 leading-snug mb-4">
          {item.title}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {item.content.slice(0, 200)}...
        </p>

        <button className="px-6 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition">
          Read More
        </button>
      </div>
    </>
  );
}








function CardPost({ item, large, index }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [delay] = useState(() => Math.floor(Math.random() * 400));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group cursor-pointer transition duration-700 ease-out transform ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
      style={{ willChange: "transform, opacity", transitionDelay: `${delay}ms` }}
    >
      <div className="relative h-[240px] rounded-md overflow-hidden mb-4">
        <Image
          src={item.imgTitle}
          alt={item.title}
          fill
          className={`w-full object-cover transition duration-500 group-hover:scale-102`}
        />
      </div>
      <p className="text-xs text-gray-500 mb-2">
        Chính trị &nbsp; {formatDate(item.createdAt)}
      </p>
      <h4 className="font-semibold text-lg text-gray-900 mb-2">
        {item.title}
      </h4>
      <p className="text-sm text-gray-600 mb-3">
        {item.content.slice(0, 200)}...
      </p>
      <button className="text-purple-600 text-sm font-medium hover:underline">
        Read More...
      </button>
    </div>
  );
}

function formatDate(dateString: string) {
  const d = new Date(dateString);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}




function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) {
  return (
    <div className="flex justify-center gap-2 mt-10">
      <button
        className={`px-3 py-1 border rounded ${page === 1 ? "pointer-events-none opacity-40" : ""}`}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-black text-white" : "hover:bg-gray-100"}`}
          onClick={() => onPageChange(i + 1)}
          disabled={page === i + 1}
        >
          {i + 1}
        </button>
      ))}
      <button
        className={`px-3 py-1 border rounded ${page === totalPages ? "pointer-events-none opacity-40" : ""}`}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
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
                  <CardFeaturedPost item={post} large={true} index={0} />
                </div>
              ))}
              {/* ================= 6 SMALL POSTS ================= */}
              <div className="grid md:grid-cols-3 gap-10">
                {posts.slice(1).map((post: any, i: number) => (
                  <CardPost key={post._id} item={post} large={i === 0} index={i} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10">Không có bài viết nào</div>
          )}
          {/* PAGINATION */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
      <FaqSection/>
    </main>
  );
}
