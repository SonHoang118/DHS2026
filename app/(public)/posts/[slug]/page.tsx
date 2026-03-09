'use client';

import FaqSection from '@/components/FaqSection';
import ProjectsSection from '@/components/ProjectsSection';
import draftToHtml from 'draftjs-to-html';
import { extractImageLinks } from '@/utils/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

type RawDraftEntityRange = {
  offset: number;
  length: number;
  key: number;
};

type RawDraftInlineStyleRange = {
  offset: number;
  length: number;
  style: string;
};

type RawDraftBlock = {
  key: string;
  text: string;
  type: string;
  depth: number;
  inlineStyleRanges: RawDraftInlineStyleRange[];
  entityRanges: RawDraftEntityRange[];
  data: Record<string, any>;
};

type RawDraftContentState = {
  blocks: RawDraftBlock[];
  entityMap: Record<string, any>;
};

type PostDetailData = {
  _id?: string;
  imgTitle?: string;
  title?: string;
  content?: string | RawDraftContentState;
  decs?: string;
  imgsId?: any;
  createdAt?: string;
  updatedAt?: string;
  slugify?: string;
};

type RelatedPost = {
  _id?: string;
  slugify?: string;
  title?: string;
  decs?: string;
  imgTitle?: string;
  createdAt?: string;
};

const parseRawContent = (rawContent: unknown): RawDraftContentState | null => {
  if (!rawContent) return null;

  if (typeof rawContent === 'string') {
    try {
      const parsed = JSON.parse(rawContent);
      if (parsed?.blocks && Array.isArray(parsed.blocks)) {
        return parsed as RawDraftContentState;
      }
      return null;
    } catch {
      return {
        blocks: [
          {
            key: 'plain',
            text: rawContent,
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      };
    }
  }

  if (
    typeof rawContent === 'object' &&
    rawContent !== null &&
    Array.isArray((rawContent as any).blocks)
  ) {
    return rawContent as RawDraftContentState;
  }

  return null;
};

const normalizePostImages = (rawImages: any): string[] => {
  if (!Array.isArray(rawImages)) return [];

  return extractImageLinks(rawImages, {
    includeUrl: true,
    includeSrc: true,
  });
};

export default function PostDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<PostDetailData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const content = useMemo(() => parseRawContent(post?.content), [post?.content]);
  const contentHtml = useMemo(() => {
    if (!content) return '';
    return draftToHtml(content);
  }, [content]);

  const galleryImages = normalizePostImages(post?.imgsId);
  const heroImage = post?.imgTitle || galleryImages[0] || '/images/404img.jpg';

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    fetch(`/api/posts/${encodeURIComponent(slug)}`, { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Post not found');
        }
        return res.json();
      })
      .then((data) => setPost(data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!post?._id) {
      setRelatedPosts([]);
      return;
    }

    fetch('/api/posts?skip=0&limit=6', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data?.items) ? data.items : [];
        const filtered = items
          .filter((item: RelatedPost) => {
            if (!item) return false;
            if (item._id && post._id && item._id === post._id) return false;
            if (item.slugify && slug && item.slugify === slug) return false;
            return true;
          })
          .slice(0, 3);

        setRelatedPosts(filtered);
      })
      .catch(() => setRelatedPosts([]));
  }, [post?._id, slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Đang tải bài viết...
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Không tìm thấy bài viết
      </main>
    );
  }

  const createdDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('vi-VN')
    : '';
  const updatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('vi-VN')
    : '';
  const readingMinutes = Math.max(
    1,
    Math.ceil(
      (content?.blocks || []).reduce((sum: number, block: RawDraftBlock) => sum + (block.text?.length || 0), 0) / 900
    )
  );

  return (
    <main className="min-h-screen bg-linear-to-b from-[#f8fafc] via-white to-[#f9fafb]">

      {/* HERO */}
      <section className="relative h-130 bg-black overflow-hidden">
        <img
          src={heroImage}
          alt={post.title || 'Bai viet'}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/20" />

        <div className="absolute top-8 left-6 md:left-10 z-10">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 text-sm hover:bg-white/30 transition"
          >
            ← Quay lại bài viết
          </Link>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto h-full px-6 md:px-8 flex items-end pb-14 text-white">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-5 text-sm">
              <span className="bg-[#C00707] px-3 py-1 font-medium">Bài viết nổi bật</span>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1">{createdDate}</span>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1">{readingMinutes} phút đọc</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>

            {post.decs && (
              <p className="text-base md:text-xl text-white/90 max-w-3xl leading-relaxed">{post.decs}</p>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className=" max-w-6xl mx-auto px-4 md:px-6 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8">
          <article
            ref={contentRef}
            className="lg:col-span-8 bg-white border border-gray-100 shadow-[0_12px_40px_rgba(15,23,42,0.08)] p-6 md:p-10 rounded-md"
          >
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-blockquote:border-[#C00707]"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {!contentHtml && (
              <p className="text-lg text-gray-600">Nội dung bài viết đang được cập nhật.</p>
            )}

            {galleryImages.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Hình ảnh liên quan</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`${post.title || 'Bai viet'} ${idx + 1}`}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-18 self-start">
            <div className="bg-white border border-gray-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-6 rounded-md">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Thông tin bài viết</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-900">Đăng ngày:</span> {createdDate || 'Đang cập nhật'}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Cập nhật:</span> {updatedDate || createdDate || 'Đang cập nhật'}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Thời gian đọc:</span> {readingMinutes} phút
                </p>
              </div>
            </div>

            <div className="bg-linear-to-br from-[#C00707] to-[#FF4400] text-white p-6 shadow-[0_10px_30px_rgba(192,7,7,0.25)] rounded-md">
              <h4 className="text-lg font-bold mb-3">Bạn cần tư vấn dự án?</h4>
              <p className="text-white/90 mb-5 text-sm">
                Liên hệ DHStudio để được hỗ trợ miễn phí về thiết kế và thi công kiến trúc.
              </p>
              <Link
                href="/contact"
                className="inline-flex bg-white text-[#C00707] px-4 py-2 font-semibold hover:bg-gray-100 transition"
              >
                Liên hệ ngay
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-20">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Bài viết đề xuất</h2>
              <p className="mt-2 text-sm md:text-base text-gray-500">Các nội dung liên quan bạn có thể quan tâm tiếp theo.</p>
            </div>
            <Link
              href="/posts"
              className="inline-flex w-fit items-center gap-2 border border-[#C00707] px-4 py-2 text-sm md:text-base font-semibold text-[#C00707] transition hover:bg-[#C00707] hover:text-white"
            >
              Xem tất cả
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((item) => {
              const href = `/posts/${item.slugify || item._id}`;
              const thumb = item.imgTitle || '/images/404img.jpg';
              const dateText = item.createdAt
                ? new Date(item.createdAt).toLocaleDateString('vi-VN')
                : '';

              return (
                <Link
                  key={item._id || item.slugify}
                  href={href}
                  className="group bg-white border border-gray-100 overflow-hidden shadow-[0_6px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.12)] transition-all rounded-md"
                >
                  <img src={thumb} alt={item.title || 'Bai viet'} className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform" />
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">{dateText}</p>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-[#C00707] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.decs || 'Tiếp tục khám phá nội dung chi tiết của bài viết này.'}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <ProjectsSection />
      <FaqSection />

      {/* CTA Section */}
      <section
        className="px-4 py-20 text-white md:px-8 lg:px-16"
        style={{
          background: 'linear-gradient(90deg, #C00707 0%, #FF4400 52%, #FFB33F 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bạn Có Dự Án Tương Tự?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Hãy liên hệ với DHStudio để được tư vấn miễn phí và thực hiện dự án kiến trúc của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact#contact-form"
              className="bg-white text-[#134E8E] px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-200 transform shadow-lg text-lg"
            >
              Yêu Cầu Tư Vấn
            </a>
            <a
              href="tel:+842838238899"
              className="border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-[#134E8E] transition-all duration-200 transform text-lg"
            >
              Gọi Ngay: +84 28 3823 8899
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}