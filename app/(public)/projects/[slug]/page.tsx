'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Dummy projects - in real app, fetch from database
  const projects: Record<string, any> = {
    'thiet-ke-thi-cong-noi-that-tu-bep-nha-chi-minh': {
      name: 'Thiết kế thi công nội thất tủ bếp nhà chị Minh',
      investor: 'Mr. Minh',
      location: 'Đằng Hải',
      date: '2023-09-05',
      decs: 'Dù xa hay gần. Khách hàng cần là chúng tôi có mặt. Thiết kế nội thất tủ bếp hiện đại với chất lượng cao, công nghệ mới nhất. Dự án được thực hiện trong 2 tháng với sự hài lòng hoàn toàn từ khách hàng.',
      nFloors: 2,
      style: ['Modern', 'Minimalist'],
      area: '120m²',
      totalCost: '50,000,000 VNĐ',
      imgs: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop&crop=top',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop&crop=top',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop&crop=top',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop&crop=top',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop&crop=top',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop&crop=top',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop&crop=top',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop&crop=top',
      ],
    },
    'toa-nha-thuong-mai-trung-tam': {
      name: 'Tòa Nhà Thương Mại Trung Tâm',
      investor: 'Công ty Bất Động Sản ABC',
      location: 'Quận 1, TP.HCM',
      date: '2022-06-15',
      decs: 'Tòa nhà 15 tầng với diện tích 5000m² bao gồm văn phòng, không gian bán lẻ và nhà hàng. Công trình được thiết kế theo tiêu chuẩn LEED Silver với các tính năng tiết kiệm năng lượng và thân thiện môi trường.',
      nFloors: 15,
      style: ['Commercial', 'Modern'],
      area: '5000m²',
      totalCost: '15,000,000 USD',
      imgs: [
        'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=600&fit=crop',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
      ],
    },
  };

  const project = projects[slug] || projects['thiet-ke-thi-cong-noi-that-tu-bep-nha-chi-minh'];

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
    setCurrentImageIndex((prev) => (prev + 1) % project.imgs.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.imgs.length) % project.imgs.length);
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

    const seed = createSeedFromText(`${slug}-${project.imgs.length}`);
    const rand = createPrng(seed);

    const result: { img: string; colSpan: number; idx: number }[] = [];
    let currentRowSum = 0;

    project.imgs.forEach((img: string, idx: number) => {
      const remaining = 4 - currentRowSum;
      const isLastImage = idx === project.imgs.length - 1;

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
  }, [project.imgs, slug]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 scroll-smooth">
      {/* Image Gallery Hero */}
      <section className="relative bg-black overflow-hidden">
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <img
            src={project.imgs[currentImageIndex]}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          {project.imgs.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 transition-all z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 transition-all z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {project.imgs.map((_: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 transition-all ${
                      idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Project Info Section */}
      <section
        ref={detailsRef}
        className="py-20 px-4 md:px-8 lg:px-16 bg-white opacity-100 transform translate-y-0 transition-all duration-1000 ease-out"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                {project.name}
              </h1>
              <div className="flex flex-wrap gap-3 mb-8">
                {project.style?.map((s: string) => (
                  <span
                    key={s}
                    className="bg-[#C00707] text-white px-4 py-2 text-sm font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {project.decs}
              </p>

              {/* Key Stats */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-[#C00707]/10 to-[#FF4400]/10 p-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Diện Tích</h4>
                  <p className="text-2xl font-bold text-[#C00707]">{project.area}</p>
                </div>
                <div className="bg-gradient-to-br from-[#FF4400]/10 to-[#FFB33F]/10 p-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Số Tầng</h4>
                  <p className="text-2xl font-bold text-[#FF4400]">{project.nFloors}</p>
                </div>
                <div className="bg-gradient-to-br from-[#FFB33F]/10 to-[#134E8E]/10 p-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Giá Trị Dự Án</h4>
                  <p className="text-2xl font-bold text-[#FFB33F]">{project.totalCost || 'Thương lượng'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#134E8E]/10 to-[#C00707]/10 p-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Thời Gian</h4>
                  <p className="text-2xl font-bold text-[#134E8E]">
                    {new Date(project.date).getFullYear()}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#C00707]/10 to-[#FF4400]/10 p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📍 Vị Trí</h3>
                <p className="text-gray-700 mb-2">{project.location}</p>
                <p className="text-sm text-gray-500">
                  {new Date(project.date).toLocaleDateString('vi-VN')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#FF4400]/10 to-[#FFB33F]/10 p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">👤 Chủ Đầu Tư</h3>
                <p className="text-gray-700">{project.investor}</p>
              </div>

              {project.style && project.style.length > 0 && (
                <div className="bg-gradient-to-br from-[#134E8E]/10 to-[#C00707]/10 p-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🎨 Phong Cách</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.style.map((s: string) => (
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
          {project.imgs.length > 1 && (
            <div className="border-t pt-8">
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
                    <img src={img} alt={`${project.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

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
