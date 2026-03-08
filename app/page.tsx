"use client";

import BlogSection from "@/components/BlogSection";
import ContactForm from "@/components/ContactForm";
import FaqSection from "@/components/FaqSection";
import ProjectsSection from "@/components/ProjectsSection";
import RevealOnView from "@/components/RevealOnView";
import Slider from "@/components/Slider";
import TypewriterText from "@/components/TypewriterText";
import Image from "next/image";

export default function Home() {
  const stats = [
    { value: "10+", label: "Năm kinh nghiệm" },
    { value: "1500+", label: "Dự án hoàn thành" },
    { value: "4.8/5", label: "Đánh giá của khách hàng" },
    { value: "98%", label: "Tỷ lệ thành công dự án" },
  ];
  return (
    <main className="min-h-screen text-gray-800">

      <RevealOnView onceKey="home-slider" threshold={0.05} rootMargin="0px 0px -10% 0px" className="will-change-transform">
        <div className="mx-auto mt-10 w-full max-w-6xl" style={{ height: 'clamp(220px, 55vw, 500px)' }}>
          <Slider
            images={[
              'https://res.cloudinary.com/dw3hx3utn/image/upload/v1772855393/lerp8gxlqzpn7ialu3g6.webp',
              'https://res.cloudinary.com/dw3hx3utn/image/upload/v1772853976/nknz748p8v2lsawzxopi.png',
              'https://res.cloudinary.com/dw3hx3utn/image/upload/v1772855146/adwxrzaa09e9pm4uqwaz.png',
              'https://res.cloudinary.com/dw3hx3utn/image/upload/v1772856818/eozbvoc5dhaxuxlx0pzv.webp'
            ]}
          />
        </div>
      </RevealOnView>


      {/* Heading Xin chào */}
      <RevealOnView onceKey="home-heading" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-75 will-change-transform">
        <section className="py-14 text-center min-h-[265px]">

          {/* TITLE */}
          <TypewriterText
            onceKey="home-heading-title"
            as="h1"
            speed={30}
            humanize={true}
            className="text-[24px]
        sm:text-[32px]
        md:text-[46px]
        font-light
        text-[#1f2937]"
            text="DHS - Thiết kế và thi công kiến trúc"
          />
          {/* SUBTITLE */}
          <TypewriterText
            onceKey="home-heading-subtitle"
            as="p"
            delay={1500}
            speed={7}
            humanize={true}
            className="mt-10
        text-4xl
        font-bold
        text-black"
            text="Xin chào"
          />
        </section>
      </RevealOnView>


      {/* Đôi chút về chúng tôi */}
      <RevealOnView onceKey="home-about" threshold={0.5} rootMargin="0px 0px -12% 0px" className="will-change-transform">
        <section className="bg-[#f6f7f8] md:py-20 py-10 px-6">
          <div className="max-w-6xl mx-auto">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">

              <div className="max-w-2xl">
                <span className="bg-orange-100 text-orange-500 text-sm px-4 py-1 rounded-full">
                  "Đôi chút" về chúng tôi
                </span>
                <div className="min-h-[137.5px] md:min-h-41.25">
                  <TypewriterText
                    onceKey="home-about-title"
                    as="h2"
                    delay={100}
                    speed={40}
                    humanize={true}
                    startWhenAncestorVisible={true}
                    className="mt-6 text-[20px] md:text-[30px] leading-snug font-semibold text-[#2b3440]"
                    text="Với kinh nghiệm hàng chục năm, chúng tôi chuyên biến những ý tưởng thành những công trình được thiết kế tốt, trường tồn theo thời gian."
                  />
                </div>
              </div>

              <button className="border border-gray-300 px-6 py-3 rounded-md text-[#2b3440] hover:bg-white transition flex items-center gap-2">
                Biết thêm về chúng tôi
                <span>→</span>
              </button>
            </div>


            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-20">

              {stats.map((item, i) => (
                <div key={i}>

                  <div className="border-t border-gray-300 mb-6"></div>

                  <div className="text-4xl font-semibold text-[#2b3440] text-center">
                    {item.value}
                  </div>

                  <p className="text-gray-500 mt-2 text-sm text-center">
                    {item.label}
                  </p>

                </div>
              ))}

            </div>
          </div>
        </section>
      </RevealOnView>


      {/* Dự án mới đây */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <RevealOnView onceKey="home-featured-header" threshold={1} rootMargin="0px 0px -10% 0px" className="will-change-transform">

            {/* Header */}
            <div className="min-h-[108px] md:min-h-10 mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <TypewriterText
                onceKey="home-featured-title"
                as="h1"
                delay={100}
                speed={40}
                humanize={true}
                startWhenAncestorVisible={true}
                className="text-2xl md:text-3xl font-semibold"
                text="BIỆT THỰ SONG LẬP ID JUNCTION"
              />
              {/* <h1 className="text-2xl md:text-3xl font-semibold">BIỆT THỰ SONG LẬP ID JUNCTION</h1> */}

              <TypewriterText
                onceKey="home-featured-subtitle"
                as="p"
                delay={1000}
                speed={50}
                humanize={true}
                startWhenAncestorVisible={true}
                className="max-w-md text-xs md:text-sm text-gray-500 md:text-right"
                text="Một chút 𝒇𝒂𝒓𝒎𝒉𝒐𝒖𝒔𝒆 nhẹ nhàng cho căn biệt thự song lập 𝐈𝐃 𝐉𝐔𝐍𝐂𝐓𝐈𝐎𝐍 (Nhơn Trạch, Long Thành)."
              />
              {/* <p className="max-w-md text-xs md:text-sm text-gray-500 md:text-right">
              Một chút 𝒇𝒂𝒓𝒎𝒉𝒐𝒖𝒔𝒆 nhẹ nhàng cho căn biệt thự song lập 𝐈𝐃 𝐉𝐔𝐍𝐂𝐓𝐈𝐎𝐍 (Nhơn Trạch, Long Thành).
              </p> */}
            </div>
          </RevealOnView>
          {/* Hero Image */}
          <RevealOnView onceKey="home-featured-hero-image" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-75 will-change-transform">
            <div className="w-full h-[320px] relative rounded-md overflow-hidden mb-8">
              <Image
                src="/images/hero.jpg"
                alt="Phoi canh tong the du an biet thu song lap ID Junction"
                fill
                className="object-cover"
              />
            </div>
          </RevealOnView>

          {/* Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-6 mb-8 text-sm">
            <RevealOnView onceKey="home-featured-info-service" threshold={0.5} rootMargin="0px 0px -12% 0px" className="delay-75 will-change-transform">
              <Info label="Dịch vụ" value="Xây dựng nhà ở" />
            </RevealOnView>
            <RevealOnView onceKey="home-featured-info-date" threshold={0.5} rootMargin="0px 0px -12% 0px" className="delay-150 will-change-transform">
              <Info label="Ngày" value="Tháng 6, 2025" />
            </RevealOnView>
            <RevealOnView onceKey="home-featured-info-location" threshold={0.5} rootMargin="0px 0px -12% 0px" className="delay-200 will-change-transform">
              <Info label="Địa điểm" value="Nhơn Trạch, Long Thành" />
            </RevealOnView>
            <RevealOnView onceKey="home-featured-info-client" threshold={0.5} rootMargin="0px 0px -12% 0px" className="delay-300 will-change-transform">
              <Info label="Khách hàng" value="Mr Hoàng Sơn" />
            </RevealOnView>
          </div>

          {/* Value + About */}
          <RevealOnView onceKey="home-featured-value-about" threshold={0.2} rootMargin="0px 0px -12% 0px" className="delay-150 will-change-transform">
            <div className="grid grid-cols-3 gap-10 mb-10">
              <div>
                <p className="text-gray-500 mb-2">Vốn đầu tư</p>
                <h2 className="text-3xl font-bold text-orange-500">1.2 tỷ VND</h2>
              </div>

              <div className="col-span-2">
                <h3 className="text-xl font-semibold mb-3">Thông tin về dự án</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Mandala Kim Bôi Hòa Bình – biệt thự trên không nơi mang đến phong cách sống nghỉ dưỡng xa hoa, đẳng cấp giữa không trung. Một siêu phẩm đỉnh cao từ tập đoàn Apec Group.
                  Với nhiều năm kinh nghiệm trong tư vấn thiết kế ứng dụng tiến trình BIM cho các dự án nghỉ dưỡng thấp tầng và cao tầng Point Group tự hào khi là đơn vị tổng thầu thiết kế của dự án.
                </p>
              </div>
            </div>
          </RevealOnView>

          {/* Image */}
          <RevealOnView onceKey="home-featured-interior-image" threshold={0.2} rootMargin="0px 0px -10% 0px" className="delay-200 will-change-transform">
            <div className="w-full h-[260px] relative rounded-md overflow-hidden mb-12">
              <Image
                src="/images/interior.jpeg"
                alt="Khong gian noi that cua du an biet thu song lap"
                fill
                className="object-cover"
              />
            </div>
          </RevealOnView>

          {/* Work Process */}
          <RevealOnView onceKey="home-featured-process" threshold={0.25} rootMargin="0px 0px -12% 0px" className="delay-300 will-change-transform">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Quy trình làm việc</h3>

              <ul className="space-y-6 text-sm text-gray-600">
                <RevealOnView onceKey="home-featured-process-step-1" threshold={0.5} rootMargin="0px 0px -12% 0px" className="delay-100 will-change-transform">
                  <li className="flex gap-3">
                    <Dot />
                    <div>
                      <p className="font-medium text-gray-800">
                        Tư vấn khách hàng & Phát triển ý tưởng
                      </p>
                      <p>
                        Dự án Mandala Kim Bôi Hòa Bình được tư vấn thiết kế và triển khai hoàn toàn theo tiến trình BIM với cả 3 bộ môn Kiến trúc, kết cấu và cơ điện.Áp dụng nền tảng BIM cloud BIM360
                      </p>
                    </div>
                  </li>
                </RevealOnView>

                <RevealOnView onceKey="home-featured-process-step-2" threshold={0.5} rootMargin="0px 0px -12% 0px" className="delay-250 will-change-transform">
                  <li className="flex gap-3">
                    <Dot />
                    <div>
                      <p className="font-medium text-gray-800">
                        Thiết kế kiến trúc & Lập kế hoạch thông minh
                      </p>
                      <p>
                        Mô hình BIM kết cấu được xây dựng trên phần mềm BIM Tool (Revit)  triển khai toàn bộ các cấu kiện và hồ sơ bản vẽ xuất ra từ mô hình duy nhất theo tiến trình BIM giúp tăng Khả năng phân tích và giải lập lường trước các giải pháp trên mô hình dẫn đến có được những thiết kế hợp lý hơn
                      </p>
                    </div>
                  </li>
                </RevealOnView>
              </ul>
            </div>
          </RevealOnView>
        </div>
      </section>



      {/* Một vài dự án khác */}
      <RevealOnView onceKey="home-projects-section" threshold={0.15} rootMargin="0px 0px -8% 0px" className="will-change-transform">
        <ProjectsSection />
      </RevealOnView>



      {/* Vị trí của chúng tôi */}
      <RevealOnView onceKey="home-map-section" threshold={0.2} rootMargin="0px 0px -10% 0px" className="will-change-transform">
        <section className="text-center py-10 md:py-20">

          {/* badge */}
          <RevealOnView onceKey="home-map-badge" threshold={0.5} rootMargin="0px 0px -12% 0px" className="delay-75 will-change-transform">
            <div className="inline-block px-5 py-1.5 border border-[#ff5a1f] text-[#ff5a1f] rounded-full text-sm">
              Vị trí của chúng tôi
            </div>
          </RevealOnView>

          {/* title */}
          <div className="min-h-[37.5px] md:min-h-[72px]">
            <TypewriterText
              onceKey="home-map-title"
              as="h2"
              delay={300}
              speed={30}
              humanize={true}
              startWhenAncestorVisible={true}
              className="mt-6 text-[25px] md:text-[48px] font-semibold text-[#1f2937]"
              text="Tìm chúng tôi trên bản đồ"
            />
          </div>
          <div className="flex justify-center my-8">
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d52341.83352513132!2d105.86872856610702!3d21.08382458817568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA2JzAyLjciTiAxMDXCsDUzJzAzLjEiRQ!5e0!3m2!1svi!2sus!4v1772254206197!5m2!1svi!2sus" width="1000" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </section>
      </RevealOnView>


      {/* Hãy nói về dự án của bạn nào ! */}
      <RevealOnView onceKey="home-cta-section" threshold={0.2} rootMargin="0px 0px -10% 0px" className="will-change-transform">
        <section className="bg-[#f3f4f6] py-10 md:py-20 text-center min-h-[204.5px] md:min-h-[312px]">
          <RevealOnView onceKey="home-cta-title-block" threshold={0.35} rootMargin="0px 0px -10% 0px" className="delay-75 will-change-transform">
            <div className="min-h-[37.5px] md:min-h-[72px]">
              <TypewriterText
                onceKey="home-cta-title"
                as="h1"
                delay={200}
                speed={35}
                humanize={true}
                startWhenAncestorVisible={true}
                className="text-[25px] md:text-[48px] font-semibold text-[#2c3640]"
                text="Hãy nói về dự án của bạn nào !"
              />
            </div>
          </RevealOnView>

          <RevealOnView onceKey="home-cta-description-block" threshold={0.35} rootMargin="0px 0px -10% 0px" className="delay-200 will-change-transform">
            <TypewriterText
              onceKey="home-cta-description"
              as="p"
              delay={900}
              speed={45}
              humanize={true}
              startWhenAncestorVisible={true}
              className="mt-6 text-gray-500 max-w-2xl mx-auto text-[14px] md:text-lg"
              text="Dù bạn đang lên kế hoạch, xây dựng hay cải tạo, chúng tôi luôn sẵn sàng hỗ trợ. Hãy liên hệ ngay hôm nay và cùng nhau tạo ra điều gì đó tuyệt vời."
            />
          </RevealOnView>
        </section>
      </RevealOnView>


      {/* CONTACT SECTION */}
      <section className="bg-[#243241] py-10 md:py-24 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT INFO */}
          <RevealOnView onceKey="home-contact-left-column" threshold={0.2} rootMargin="0px 0px -8% 0px" className="will-change-transform">
            <div className="text-white">

              <RevealOnView onceKey="home-contact-badge" threshold={0.35} rootMargin="0px 0px -10% 0px" className="delay-75 will-change-transform">
                <span className="bg-[#ff7a50] text-white text-sm px-4 py-1 rounded-full">
                  Hãy liên hệ với chúng tôi
                </span>
              </RevealOnView>

              <RevealOnView onceKey="home-contact-title-block" threshold={0.35} rootMargin="0px 0px -10% 0px" className="delay-150 will-change-transform">
                <div className="min-h-[48px]">

                <TypewriterText
                  onceKey="home-contact-title"
                  as="h2"
                  delay={250}
                  speed={35}
                  humanize={true}
                  startWhenAncestorVisible={true}
                  className="text-5xl font-semibold mt-6"
                  text="Hãy cùng nhau hợp tác!"
                  />
                  </div>
              </RevealOnView>

              <RevealOnView onceKey="home-contact-intro-block" threshold={0.35} rootMargin="0px 0px -10% 0px" className="delay-200 will-change-transform">
                <div className="min-h-[78px] md:min-h-[80px]">
                  <TypewriterText
                    onceKey="home-contact-intro"
                    as="p"
                    delay={900}
                    speed={45}
                    humanize={true}
                    startWhenAncestorVisible={true}
                    className="mt-6 text-gray-300 leading-relaxed max-w-md"
                    text="Dù bạn có câu hỏi, cần thêm thông tin về dịch vụ của chúng tôi, hay muốn thảo luận về một hợp tác tiềm năng, chúng tôi luôn sẵn sàng hỗ trợ."
                  />
                </div>
              </RevealOnView>


              {/* INFO GRID */}
              <div className="mt-12 space-y-8 text-gray-300">

                <RevealOnView onceKey="home-contact-info-grid-message" threshold={0.2} rootMargin="0px 0px -8% 0px" className="delay-100 will-change-transform">
                  <div className="border-t border-gray-500 pt-6 flex flex-col gap-6 md:flex-row md:gap-16">
                    <div>
                      <p className="text-gray-400">Gửi tin nhắn</p>
                      <p className="mt-2 text-white">dhs.studio.arch@gmail.com</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Gọi cho chúng tôi</p>
                      <p className="mt-2 text-white">+84 983 239 596</p>
                    </div>
                  </div>
                </RevealOnView>

                <RevealOnView onceKey="home-contact-info-grid-address" threshold={0.2} rootMargin="0px 0px -8% 0px" className="delay-200 will-change-transform">
                  <div className="border-t border-gray-500 pt-6">
                    <p className="text-gray-400">Đại chỉ</p>
                    <p className="mt-2 text-white">
                      7 Đông Hội, Thôn Trung Thôn, Đông Anh, Hà Nội, Việt Nam
                    </p>
                  </div>
                </RevealOnView>

                <RevealOnView onceKey="home-contact-info-grid-hours" threshold={0.2} rootMargin="0px 0px -8% 0px" className="delay-300 will-change-transform">
                  <div className="border-t border-gray-500 pt-6">
                    <p className="text-gray-400">Giờ làm việc</p>

                    <div className="mt-2 space-y-1 text-white">
                      <p>Thứ Hai - Thứ Sáu, 7:00  - 17:00 </p>
                      <p>Thứ Bảy: 9:00 - 14:00</p>
                      <p>Chủ Nhật: Đóng cửa</p>
                    </div>
                  </div>
                </RevealOnView>

              </div>
            </div>
          </RevealOnView>


          {/* FORM CARD */}
          <RevealOnView onceKey="home-contact-form-card" threshold={0.2} rootMargin="0px 0px -8% 0px" className="delay-200 will-change-transform">
            <div className="bg-[#ffffff] p-5 md:p-10 shadow-lg">

              <div className="min-h-[32px] md:min-h-[36px]">
                <TypewriterText
                  onceKey="home-contact-form-title"
                  as="h3"
                  delay={350}
                  speed={40}
                  humanize={true}
                  startWhenAncestorVisible={true}
                  className="text-2xl font-semibold text-[#2c3640] mb-8"
                  text="Đăng ký tư vấn miễn phí"
                />
              </div>

              <ContactForm />
            </div>
          </RevealOnView>

        </div>
      </section>



      {/* Một vài bài viết khác */}
      <RevealOnView onceKey="home-blog-section" threshold={0.2} rootMargin="0px 0px -10% 0px" className="will-change-transform">
        <BlogSection />
      </RevealOnView>

      {/* Câu hỏi thường gặp */}
      <RevealOnView onceKey="home-faq-section" threshold={0.2} rootMargin="0px 0px -10% 0px" className="will-change-transform">
        <FaqSection />
      </RevealOnView>
    </main>
  );
}










function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 md:block">
      <p className="text-gray-500 md:mb-1">{label}</p>
      <p className="font-medium text-right md:text-left">{value}</p>
    </div>
  );
}

function Dot() {
  return (
    <span className="mt-2 w-2 h-2 bg-gray-800 rounded-full flex-shrink-0" />
  );
}