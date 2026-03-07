'use client';

import FaqSection from '@/components/FaqSection';
import { useRef, useEffect } from 'react';

export default function About() {
  const overviewRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    if (overviewRef.current) observer.observe(overviewRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (teamRef.current) observer.observe(teamRef.current);
    if (valuesRef.current) observer.observe(valuesRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 scroll-smooth">
      {/* Hero Section */}
      <section className="relative md:h-[90vh] h-[82vh] flex items-center justify-center bg-gradient-to-r from-[#243241] via-[#134E8E] to-[#375f8b] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            Về DHStudio
          </h1>
          <p className="text-[15px] md:text-2xl opacity-90 animation-delay-300 mb-8">
            Công ty Tư Vấn & Thiết Kế Kiến Trúc Hàng Đầu
          </p>
          <div className="">
            <p className="text-lg mb-8 opacity-80">
              Chúng tôi mang lại những giải pháp kiến trúc sáng tạo, bền vững và tạo nên sự thay đổi cho cộng đồng
            </p>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#C00707] mb-3">10+</div>
              <p className="text-gray-600 text-lg font-semibold">Năm Kinh Nghiệm</p>
              <p className="text-gray-500">Phục vụ uy tín</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#FF4400] mb-3">150+</div>
              <p className="text-gray-600 text-lg font-semibold">Dự Án Hoàn Thành</p>
              <p className="text-gray-500">Chất lượng đảm bảo</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#FFB33F] mb-3">50+</div>
              <p className="text-gray-600 text-lg font-semibold">Nhân Viên Chuyên Gia</p>
              <p className="text-gray-500">Đội ngũ hàng đầu</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#134E8E] mb-3">100%</div>
              <p className="text-gray-600 text-lg font-semibold">Khách Hàng Hài Lòng</p>
              <p className="text-gray-500">Cam kết dịch vụ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section
        ref={overviewRef}
        className="py-20 px-4 md:px-8 lg:px-16 bg-white opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
              Câu Chuyện Của DHStudio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Từ một nhóm kiến trúc sư có đam mê, DHStudio đã phát triển thành một công ty kiến trúc hàng đầu, 
              được tin tưởng bởi hàng ngàn khách hàng trên toàn quốc.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Sứ Mệnh</h3>
                <p className="text-gray-600 text-lg">
                  Tạo ra những không gian kiến trúc sáng tạo, bền vững và nâng cao chất lượng sống của con người. 
                  Chúng tôi tin rằng kiến trúc tốt có khả năng thay đổi cộng đồng và bảo vệ môi trường.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Tầm Nhìn</h3>
                <p className="text-gray-600 text-lg">
                  Trở thành công ty kiến trúc hàng đầu khu vực, được công nhận vì các dự án sáng tạo, 
                  bền vững và tạo tác động tích cực đến xã hội.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#C00707]/10 to-[#FF4400]/10 p-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Giá Trị Cốt Lõi</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-[#C00707] font-bold text-xl">✓</span>
                  <span className="text-gray-700"><strong>Chất Lượng:</strong> Xuất sắc trong mọi chi tiết</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#FF4400] font-bold text-xl">✓</span>
                  <span className="text-gray-700"><strong>Sáng Tạo:</strong> Đổi mới không ngừng</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#FFB33F] font-bold text-xl">✓</span>
                  <span className="text-gray-700"><strong>Trách Nhiệm:</strong> Với khách hàng và xã hội</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#134E8E] font-bold text-xl">✓</span>
                  <span className="text-gray-700"><strong>Bền Vững:</strong> Thân thiện với môi trường</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Specialization Section */}
      <section
        ref={servicesRef}
        className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Lĩnh Vực Chuyên Môn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cung cấp các dịch vụ kiến trúc toàn diện từ khái niệm đến bàn giao
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-lg">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Kiến Trúc Văn Phòng</h3>
              <p className="text-gray-600">
                Thiết kế không gian làm việc hiện đại, tối ưu năng suất và tạo môi trường làm việc thoải mái.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>✓ Văn phòng hạng A</li>
                <li>✓ Co-working spaces</li>
                <li>✓ Showroom & bộ phận bán hàng</li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Nhà Ở & Biệt Thự</h3>
              <p className="text-gray-600">
                Tạo ra những căn hộ và biệt thự phản ánh cá nhân chủ nhân, kết hợp thẩm mỹ và tính năng.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>✓ Biệt thự hiện đại</li>
                <li>✓ Căn hộ cao cấp</li>
                <li>✓ Nhà phố kết hợp</li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Thương Mại & Giải Trí</h3>
              <p className="text-gray-600">
                Thiết kế các không gian bán lẻ, nhà hàng, khách sạn và công trình giải trí đẳng cấp.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>✓ Nhà hàng & quán cà phê</li>
                <li>✓ Khách sạn & resort</li>
                <li>✓ Trung tâm thương mại</li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Giáo Dục & Y Tế</h3>
              <p className="text-gray-600">
                Thiết kế cơ sở hạ tầng giáo dục và y tế theo tiêu chuẩn quốc tế, ưu tiên an toàn.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>✓ Trường học & đại học</li>
                <li>✓ Bệnh viện & phòng khám</li>
                <li>✓ Trung tâm đào tạo</li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Công Trình Công Cộng</h3>
              <p className="text-gray-600">
                Tư vấn và thiết kế công trình công cộng phục vụ cộng đồng, nâng cao chất lượng đô thị.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>✓ Công viên & khu vui chơi</li>
                <li>✓ Trung tâm cộng đồng</li>
                <li>✓ Công trình hạ tầng</li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Thiết Kế Nội Thất</h3>
              <p className="text-gray-600">
                Thiết kế nội thất sáng tạo, gợi ý lựa chọn vật liệu và hệ thống từng chi tiết.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>✓ Thiết kế conceptual</li>
                <li>✓ Chi tiết nội thất</li>
                <li>✓ Quản lý dự án</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={teamRef}
        className="py-20 px-4 md:px-8 lg:px-16 bg-white opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Đội Ngũ Chuyên Gia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những chuyên gia tài năng với kinh nghiệm hơn 10 năm trong lĩnh vực kiến trúc
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-40 h-40 bg-gradient-to-br from-[#C00707]/20 to-[#FF4400]/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-6xl">👨‍✈️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Nguyễn Văn A</h3>
              <p className="text-[#C00707] font-semibold mb-2">Tổng Giám Đốc</p>
              <p className="text-gray-600 text-sm">Kiến trúc sư trưởng với 12 năm kinh nghiệm quốc tế</p>
            </div>

            <div className="text-center">
              <div className="w-40 h-40 bg-gradient-to-br from-[#FF4400]/20 to-[#FFB33F]/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-6xl">👩‍🏫</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Trần Thị B</h3>
              <p className="text-[#FF4400] font-semibold mb-2">Giám Đốc Thiết Kế</p>
              <p className="text-gray-600 text-sm">Chuyên gia thiết kế kiến trúc, giáng viên đại học</p>
            </div>

            <div className="text-center">
              <div className="w-40 h-40 bg-gradient-to-br from-[#FFB33F]/20 to-[#134E8E]/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-6xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Lê Văn C</h3>
              <p className="text-[#FFB33F] font-semibold mb-2">Giám Đốc Dự Án</p>
              <p className="text-gray-600 text-sm">Kỹ sư xây dựng, chuyên gia quản lý dự án</p>
            </div>

            <div className="text-center">
              <div className="w-40 h-40 bg-gradient-to-br from-[#134E8E]/20 to-[#C00707]/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-6xl">👩‍🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Phạm Thị D</h3>
              <p className="text-[#134E8E] font-semibold mb-2">Lead Designer</p>
              <p className="text-gray-600 text-sm">Chuyên gia thiết kế nội thất, color specialist</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesRef}
        className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-[#C00707]/10 to-[#FF4400]/10 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Tại Sao Chọn DHStudio?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-lg">
              <div className="w-16 h-16 bg-[#C00707]/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#C00707]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Kinh Nghiệm Chuyên Sâu</h3>
              <p className="text-gray-600">
                Hơn 10 năm tư vấn và thiết kế với 150+ dự án thành công, từ nhỏ đến lớn
              </p>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <div className="w-16 h-16 bg-[#FF4400]/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#FF4400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Sáng Tạo & Đổi Mới</h3>
              <p className="text-gray-600">
                Luôn tìm tòi những ý tưởng mới mẻ, công nghệ hiện đại và xu hướng toàn cầu
              </p>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <div className="w-16 h-16 bg-[#134E8E]/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#134E8E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Giá Trị Tối Đa</h3>
              <p className="text-gray-600">
                Báo giá minh bạch, hợp lý và luôn mục đích tối đa hóa giá trị dự án
              </p>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <div className="w-16 h-16 bg-[#FFB33F]/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#FFB33F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Bền Vững & Xanh</h3>
              <p className="text-gray-600">
                Ưu tiên công trình bền vững, thân thiện môi trường và nâng cao chất lượng sống
              </p>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <div className="w-16 h-16 bg-[#C00707]/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#C00707]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Hỗ Trợ Toàn Diện</h3>
              <p className="text-gray-600">
                Tư vấn từ đầu đến cuối, giải đáp mọi thắc mắc 24/7 và hỗ trợ sau dự án
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-8 md:mt-0">
        <FaqSection />
      </div>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-[#C00707] via-[#FF4400] to-[#FFB33F] text-white opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sẵn Sàng Hợp Tác Với DHStudio?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Hãy liên hệ ngay hôm nay để tư vấn miễn phí về dự án kiến trúc của bạn và khám phá cách 
            chúng tôi có thể tạo nên sự khác biệt
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
          <p className="text-sm opacity-75 mt-6">
            Tư vấn miễn phí • Bảo mật thông tin • Hỗ trợ chuyên gia
          </p>
        </div>
      </section>
      
    </main>
  );
}
