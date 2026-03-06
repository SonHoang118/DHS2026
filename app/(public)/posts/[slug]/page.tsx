'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function PostDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Dummy post data based on provided structure
  const posts: Record<string, any> = {
    'may-bay-gap-su-co-khi-ha-canh-o-tan-son-nhat-toan-bo-hanh-khach-an-toan': {
      _id: '681dbf4d9ca949b4c15fbb8d',
      imgTitle: 'https://res.cloudinary.com/dcqivfwxv/image/upload/v1746795925/itnvqoxd…',
      title: 'Máy bay gặp sự cố khi hạ cánh ở Tân Sơn Nhất, toàn bộ hành khách an toàn',
      content: {
        blocks: [
          {
            key: '50f80',
            text: '(Dân trí) - Chuyến bay của Vietjet gặp sự cố khi hạ cánh tại sân bay Tân Sơn Nhất. Toàn bộ hành khách đã được sơ tán an toàn.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {}
          },
          {
            key: 'abc123',
            text: 'Chi tiết sự việc',
            type: 'header-two',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {}
          },
          {
            key: 'def456',
            text: 'Theo thông tin ban đầu, máy bay gặp trục trặc kỹ thuật khi tiếp cận đường băng. Phi công đã xử lý khéo léo, đảm bảo an toàn cho tất cả hành khách.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {}
          }
        ]
      },
      decs: 'Chi tiết về sự cố máy bay tại sân bay Tân Sơn Nhất',
      imgsId: [
        { url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' }
      ],
      createdAt: '2025-05-09T08:39:41.418+00:00',
      updatedAt: '2025-05-09T13:23:26.911+00:00',
      __v: 0,
      slugify: 'may-bay-gap-su-co-khi-ha-canh-o-tan-son-nhat-toan-bo-hanh-khach-an-toan'
    },
    'xu-huong-kien-truc-2024': {
      _id: 'sample-id-1',
      imgTitle: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=600&fit=crop',
      title: 'Xu Hướng Kiến Trúc Bền Vững Năm 2024',
      content: {
        blocks: [
          {
            key: 'intro',
            text: 'Năm 2024 sẽ chứng kiến sự thay đổi đáng kể trong lĩnh vực kiến trúc, với sự tập trung vào tính bền vững và kỹ thuật số.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {}
          },
          {
            key: 'header1',
            text: 'Kiến Trúc Xanh và Bền Vững',
            type: 'header-two',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {}
          },
          {
            key: 'para1',
            text: 'Các tòa nhà xanh không chỉ tốt cho môi trường mà còn giúp giảm chi phí vận hành.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {}
          }
        ]
      },
      decs: 'Khám phá xu hướng kiến trúc bền vững mới nhất',
      imgsId: [
        { url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop' }
      ],
      createdAt: '2024-02-15T10:00:00.000+00:00',
      updatedAt: '2024-02-15T10:00:00.000+00:00',
      __v: 0,
      slugify: 'xu-huong-kien-truc-2024'
    }
  };

  const post = posts[slug] || posts['may-bay-gap-su-co-khi-ha-canh-o-tan-son-nhat-toan-bo-hanh-khach-an-toan'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  // Function to render content blocks
  const renderContent = (content: any) => {
    if (!content || !content.blocks) return null;

    return content.blocks.map((block: any) => {
      const { key, text, type } = block;

      switch (type) {
        case 'header-one':
          return <h1 key={key} className="text-3xl font-bold text-gray-800 mb-6">{text}</h1>;
        case 'header-two':
          return <h2 key={key} className="text-2xl font-bold text-gray-800 mb-4">{text}</h2>;
        case 'header-three':
          return <h3 key={key} className="text-xl font-bold text-gray-800 mb-3">{text}</h3>;
        case 'unstyled':
        default:
          return <p key={key} className="text-lg text-gray-700 leading-relaxed mb-4">{text}</p>;
      }
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % post.imgsId.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + post.imgsId.length) % post.imgsId.length);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 scroll-smooth">
      {/* Hero Section */}
      <section className="relative bg-black overflow-hidden">
        <div className="relative aspect-[16/9] bg-black flex items-center justify-center">
          <img
            src={post.imgTitle}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
              {post.decs && (
                <p className="text-xl md:text-2xl opacity-90 mb-6">
                  {post.decs}
                </p>
              )}
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-[#C00707] text-white px-3 py-1">
                  📅 {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                </span>
                <span className="bg-[#FF4400] text-white px-3 py-1">
                  ⏱️ {Math.ceil(post.content?.blocks?.length / 3) || 5} phút đọc
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section
        ref={contentRef}
        className="py-20 px-4 md:px-8 lg:px-16 bg-white opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
      >
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </article>

          {/* Image Gallery */}
          {post.imgsId && post.imgsId.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Hình Ảnh Liên Quan</h3>
              <div className="relative bg-black overflow-hidden mb-8">
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <img
                    src={post.imgsId[currentImageIndex].url}
                    alt={`${post.title} ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {post.imgsId.length > 1 && (
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
                        {post.imgsId.map((_: any, idx: number) => (
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
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {post.imgsId.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative aspect-square overflow-hidden transition-all ${
                      idx === currentImageIndex
                        ? 'ring-4 ring-[#C00707]'
                        : 'hover:opacity-80'
                    }`}
                  >
                    <img src={img.url} alt={`${post.title} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Post Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Đăng ngày {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                {post.updatedAt !== post.createdAt && (
                  <span className="ml-2">
                    • Cập nhật {new Date(post.updatedAt).toLocaleDateString('vi-VN')}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-[#C00707] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-[#C00707] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-[#C00707] via-[#FF4400] to-[#FFB33F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bạn Quan Tâm Đến Dự Án Kiến Trúc?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Hãy liên hệ với DHStudio để được tư vấn miễn phí về các dự án kiến trúc và nội thất
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
