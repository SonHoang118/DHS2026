"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type BlogPost = {
  _id?: string;
  slugify?: string;
  title?: string;
  imgTitle?: string;
  content?: unknown;
  createdAt?: string;
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const normalizeSpaces = (value: string) => value.replace(/\s+/g, " ").trim();

const getPlainContent = (content: unknown): string => {
  if (!content) return "";

  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      if (parsed?.blocks && Array.isArray(parsed.blocks)) {
        const joined = parsed.blocks
          .map((block: { text?: string }) => block?.text || "")
          .join(" ");
        return normalizeSpaces(joined);
      }
    } catch {
      return normalizeSpaces(stripHtml(content));
    }

    return normalizeSpaces(stripHtml(content));
  }

  if (typeof content === "object" && content !== null && Array.isArray((content as { blocks?: unknown[] }).blocks)) {
    const joined = ((content as { blocks: Array<{ text?: string }> }).blocks || [])
      .map((block) => block?.text || "")
      .join(" ");
    return normalizeSpaces(joined);
  }

  return "";
};

const toExcerpt = (content: unknown, maxWords: number = 100) => {
  const plain = getPlainContent(content);
  if (!plain) return "Nội dung bài viết đang được cập nhật.";

  const words = plain.split(" ").filter(Boolean);
  if (words.length <= maxWords) return plain;
  return `${words.slice(0, maxWords).join(" ")}...`;
};

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/posts?skip=0&limit=4", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data?.items) ? data.items : [];
        setPosts(items.slice(0, 4));
      })
      .catch(() => setPosts([]));
  }, []);

  const featured = posts[0];
  const otherPosts = useMemo(() => posts.slice(1, 4), [posts]);

  const getPostHref = (post?: BlogPost) => {
    const id = post?.slugify || post?._id;
    return id ? `/posts/${id}` : "/posts";
  };

  const formatDate = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <section className="bg-[#f4f5f7] py-12 md:py-16">
      <div className="flex justify-center mb-6">
        <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-500 text-sm">
          Các bài viết gần đây
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT MAIN POST */}
        <div className="lg:col-span-2 mb-8 lg:mb-0">
          <Link href={getPostHref(featured)} className="block bg-white rounded-xl overflow-hidden shadow-md">
            <div className="relative w-full h-64 md:h-[360px]">
              <img
                src={featured?.imgTitle || "/images/404img.jpg"}
                alt={featured?.title || "post"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                {featured?.title || "Đang cập nhật bài viết mới"}
              </h2>
              <p className="text-gray-600 mt-2 md:mt-3 text-sm md:text-[15px] leading-relaxed line-clamp-2">
                {toExcerpt(featured?.content, 100)}
              </p>
              <div className="mt-4 md:mt-5 text-xs md:text-sm text-gray-500">
                {formatDate(featured?.createdAt) || "Mới cập nhật"}
              </div>
            </div>
          </Link>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-5 md:space-y-6">
          {/* trending banner */}
          <div className="rounded-xl overflow-hidden relative h-28 md:h-[140px] text-white">
            <img
              src={featured?.imgTitle || "/images/bg1.jpg"}
              alt="trending"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute left-4 md:left-6 top-4 md:top-6 text-base md:text-lg font-semibold">
              Trending <br /> on Riverside
            </div>
          </div>
          {/* LIST ITEMS */}
          {otherPosts.map((item, i) => (
            <Link
              key={item._id || item.slugify || i}
              href={getPostHref(item)}
              className="flex gap-3 md:gap-4 bg-white p-2 md:p-3 rounded-lg shadow-sm"
            >
              <div className="relative w-24 md:w-28 h-16 md:h-20 shrink-0">
                <img src={item.imgTitle || "/images/404img.jpg"} alt={item.title || "post"} className="w-full h-full object-cover rounded-md" />
              </div>
              <div className="flex flex-col justify-between">
                <h4 className="text-sm md:text-[15px] font-medium text-gray-800 leading-snug">
                  {item.title}
                </h4>
                <div className="text-xs text-gray-500">
                  {formatDate(item.createdAt) || "Mới cập nhật"}
                </div>
                <span className="text-xs text-blue-600">
                  Bài viết
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row max-w-5xl w-full justify-between items-start md:items-center mx-auto mt-12 md:mt-16 gap-6 md:gap-0 px-4">
        <div>
          <h2 className="text-xl md:text-[24px] leading-[1.2] font-semibold text-[#1f2937] mb-2">
            Các bài viết và tin tức mới nhất
          </h2>
          <p className="text-gray-500 leading-relaxed max-w-xs md:max-w-sm">
            Cập nhật ngay những tin tức mới từ chúng tôi, có thể giúp ích cho ý tưởng dự án sắp tới của bạn đấy!
          </p>
        </div>
        <Link href="/posts" className="border border-gray-300 px-5 md:px-6 py-2 md:py-3 inline-flex items-center gap-2 md:gap-3 hover:bg-black hover:text-white transition mt-4 md:mt-20">
          Xem thêm các bài viết khác
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}