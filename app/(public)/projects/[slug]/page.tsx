'use client';

import Link from 'next/link';
import Slider from '@/components/Slider';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import FaqSection from '@/components/FaqSection';
import BlogSection from '@/components/BlogSection';

type ProjectDetailData = {
  _id?: string;
  name?: string;
  investor?: string;
  location?: string;
  date?: string;
  decs?: string;
  nFloors?: number;
  style?: string[] | string;
  category?: string[] | string;
  area?: string;
  totalCost?: string;
  imgs?: any;
  slugify?: string;
};

const normalizeImageList = (rawImages: any): string[] => {
  if (!Array.isArray(rawImages)) {
    return [];
  }

  return rawImages
    .map((img) => {
      if (typeof img === 'string') {
        return img;
      }
      if (img && typeof img === 'object') {
        return img.link || img.url || img.src || '';
      }
      return '';
    })
    .filter((url: string) => Boolean(url));
};

const normalizeStyleList = (rawStyle: any): string[] => {
  if (Array.isArray(rawStyle)) {
    return rawStyle.filter(Boolean);
  }
  if (typeof rawStyle === 'string' && rawStyle.trim()) {
    return rawStyle
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);
  }
  return [];
};

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<ProjectDetailData | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<ProjectDetailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const detailsRef = useRef<HTMLDivElement>(null);

  const projectImages = useMemo(() => normalizeImageList(project?.imgs), [project?.imgs]);
  const projectStyles = useMemo(() => normalizeStyleList(project?.style), [project?.style]);
  const projectCategory = useMemo(() => normalizeStyleList(project?.category), [project?.category]);

  useEffect(() => {
    if (!slug) {
      return;
    }

    setLoading(true);
    setCurrentImageIndex(0);

    fetch(`/api/projects/${encodeURIComponent(slug)}`, { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Project not found');
        }
        return res.json();
      })
      .then((data) => {
        setProject(data);
      })
      .catch(() => {
        setProject(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (!project?._id) {
      setRelatedProjects([]);
      return;
    }

    fetch('/api/projects?skip=0&limit=8', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data?.items) ? data.items : [];
        const filtered = items
          .filter((item: ProjectDetailData) => {
            if (!item) return false;
            if (item._id && project._id && item._id === project._id) return false;
            if (item.slugify && slug && item.slugify === slug) return false;
            return true;
          })
          .slice(0, 3);

        setRelatedProjects(filtered);
      })
      .catch(() => {
        setRelatedProjects([]);
      });
  }, [project?._id, slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.5 }
    );

    if (detailsRef.current) observer.observe(detailsRef.current);

    return () => observer.disconnect();
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  const imagesWithColumns = useMemo(() => {
    const createSeedFromText = (text: string) => {
      let hash = 2166136261;
      for (let i = 0; i < text.length; i += 1) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
      }
      return hash >>> 0;
    };

    const createPrng = (seed: number) => {
      let t = seed;
      return () => {
        t += 0x6d2b79f5;
        let r = Math.imul(t ^ (t >>> 15), t | 1);
        r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
      };
    };

    const seed = createSeedFromText(`${slug}-${projectImages.length}`);
    const rand = createPrng(seed);

    const result: { img: string; colSpan: number; idx: number }[] = [];
    let currentRowSum = 0;

    projectImages.forEach((img: string, idx: number) => {
      const remaining = 4 - currentRowSum;
      const isLastImage = idx === projectImages.length - 1;

      let colSpan: number;

      if (isLastImage) {
        colSpan = remaining;
      } else {
        const maxSpan = Math.min(3, remaining);
        colSpan = Math.floor(rand() * maxSpan) + 1;
      }

      result.push({ img, colSpan, idx });
      currentRowSum += colSpan;

      if (currentRowSum === 4) {
        currentRowSum = 0;
      }
    });

    return result;
  }, [projectImages, slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
        Đang tải dự án...
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy dự án</h1>
          <p className="text-gray-500">Dự án bạn chọn không tồn tại hoặc đã bị xóa.</p>
        </div>
      </main>
    );
  }

  const displayDate = project.date ? new Date(project.date) : null;
  const projectTitle = project.name || 'Dự án';

  const getProjectThumb = (item: ProjectDetailData) => {
    const images = normalizeImageList(item.imgs);
    return images[0] || '/images/404img.jpg';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 scroll-smooth">
      {/* Image Gallery Hero */}
      <div className="mx-auto mt-10 w-full max-w-6xl" style={{ height: 'clamp(220px, 55vw, 500px)' }}>
        <Slider
          images={projectImages.length > 0 ? projectImages : ['/images/404img.jpg']}
        />
      </div>

      {/* Project Info Section */}
      <section
        ref={detailsRef}
        className="py-10 px-4 md:px-8 lg:px-16 bg-white opacity-100 transform translate-y-0 transition-all duration-1000 ease-out"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                {projectTitle}
              </h1>
              <div className="flex flex-wrap gap-3 mb-8">
                {projectCategory.map((s: string) => (
                  <span
                    key={s}
                    className="bg-[#C00707] text-white px-4 py-2 text-sm font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {project.decs && <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {project.decs || 'Đang cập nhật mô tả dự án.'}
              </p>}

              {/* Key Stats */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {project.area && <div className="bg-gradient-to-br from-[#C00707]/10 to-[#FF4400]/10 p-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Diện Tích</h4>
                  <p className="text-2xl font-bold text-[#C00707]">{project.area || 'Đang cập nhật'}</p>
                </div>}
                {project.nFloors && <div className="bg-gradient-to-br from-[#FF4400]/10 to-[#FFB33F]/10 p-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Số Tầng</h4>
                  <p className="text-2xl font-bold text-[#FF4400]">{project.nFloors ?? 'Đang cập nhật'}</p>
                </div>}
                {project.totalCost && <div className="bg-gradient-to-br from-[#FFB33F]/10 to-[#134E8E]/10 p-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Giá Trị Dự Án</h4>
                  <p className="text-2xl font-bold text-[#FFB33F]">{project.totalCost || 'Thương lượng'}</p>
                </div>}
                {project.date && <div className="bg-gradient-to-br from-[#134E8E]/10 to-[#C00707]/10 p-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Thời Gian</h4>
                  <p className="text-2xl font-bold text-[#134E8E]">
                    {displayDate ? displayDate.getFullYear() : 'Đang cập nhật'}
                  </p>
                </div>}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {project.location && <div className="bg-gradient-to-br from-[#C00707]/10 to-[#FF4400]/10 p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📍 Vị Trí</h3>
                <p className="text-gray-700 mb-2">{project.location || 'Đang cập nhật'}</p>
                <p className="text-sm text-gray-500">
                  {displayDate ? displayDate.toLocaleDateString('vi-VN') : 'Đang cập nhật'}
                </p>
              </div>}

              {project.investor && <div className="bg-gradient-to-br from-[#FF4400]/10 to-[#FFB33F]/10 p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">👤 Chủ Đầu Tư</h3>
                <p className="text-gray-700">{project.investor || 'Đang cập nhật'}</p>
              </div>}

              {projectStyles.length > 0 && (
                <div className="bg-gradient-to-br from-[#134E8E]/10 to-[#C00707]/10 p-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🎨 Phong Cách</h3>
                  <div className="flex flex-wrap gap-2">
                    {projectStyles.map((s: string) => (
                      <span
                        key={s}
                        className="bg-white px-3 py-1 text-sm border border-[#134E8E] text-[#134E8E]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {projectImages.length > 1 && (
            <div className="border-t pt-8 border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Hình Ảnh Dự Án</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {imagesWithColumns.map(({ img, colSpan, idx }) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative overflow-hidden transition-all ${
                      colSpan === 1
                        ? 'md:col-span-1'
                        : colSpan === 2
                          ? 'md:col-span-2'
                          : colSpan === 3
                            ? 'md:col-span-3'
                            : 'md:col-span-4'
                    } ${
                      idx === currentImageIndex
                        ? 'ring-4 ring-[#C00707]'
                        : 'hover:opacity-80'
                    }`}
                    style={{
                      aspectRatio: colSpan === 1 ? '1' : colSpan === 2 ? '2' : colSpan === 3 ? '1.5' : '4'
                    }}
                  >
                    <img src={img} alt={`${projectTitle} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Các dự án khác</h2>
                <p className="mt-2 text-sm md:text-base text-gray-500">Khám phá thêm các dự án kiến trúc tương tự của DHStudio.</p>
              </div>
              <Link
                href="/projects"
                className="inline-flex w-fit items-center gap-2 border border-[#C00707] px-4 py-2 text-sm md:text-base font-semibold text-[#C00707] transition hover:bg-[#C00707] hover:text-white"
              >
                Xem tất cả
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((item) => {
                const href = `/projects/${item.slugify || item._id}`;
                const thumb = getProjectThumb(item);
                const itemStyles = normalizeStyleList(item.style);
                const itemYear = item.date ? new Date(item.date).getFullYear() : null;

                return (
                  <Link
                    key={item._id || item.slugify}
                    href={href}
                    className="group bg-white border border-gray-100 overflow-hidden shadow-[0_6px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.12)] transition-all"
                  >
                    <img src={thumb} alt={item.name || 'Du an'} className="w-full h-52 object-cover group-hover:scale-[1.02] transition-transform" />
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2 mb-3 text-xs">
                        {itemStyles.slice(0, 2).map((s) => (
                          <span key={s} className="bg-[#C00707]/10 text-[#C00707] px-2 py-1 font-medium">
                            {s}
                          </span>
                        ))}
                        {itemYear && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 font-medium">
                            {itemYear}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-[#C00707] transition-colors">
                        {item.name || 'Dự án'}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {item.decs || 'Tiếp tục khám phá chi tiết về dự án này.'}
                      </p>
                      <p className="text-sm text-[#C00707] font-semibold">Xem chi tiết →</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <BlogSection />
      <FaqSection />

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-[#C00707] via-[#FF4400] to-[#FFB33F] text-white">
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
              href="tel:+84983239596"
              className="border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-[#134E8E] transition-all duration-200 transform text-lg"
            >
              Gọi Ngay: +84 983 239 596
            </a>
          </div>
        </div>
      </section>
      
    </main>
  );
}
