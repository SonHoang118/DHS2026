import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";
import ProjectsSection from "@/components/ProjectsSection";
import Slider from "@/components/Slider";
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


      {/* Heading Xin chào */}
      <section className="py-14 text-center">

        {/* TITLE */}
        <h1 className="
        text-[24px]
        sm:text-[32px]
        md:text-[46px]
        font-light
        text-[#1f2937]
      ">
          DHS - Thiết kế và thi công kiến trúc
        </h1>

        {/* SUBTITLE */}
        <p className="
        mt-10
        text-4xl
        font-bold
        text-black
      ">
          Xin chào
        </p>

      </section>


      {/* Đôi chút về chúng tôi */}
      <section className="bg-[#f6f7f8] md:py-20 py-10 px-6">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">

            <div className="max-w-2xl">
              <span className="bg-orange-100 text-orange-500 text-sm px-4 py-1 rounded-full">
                "Đôi chút" về chúng tôi
              </span>

              <h2 className="mt-6 text-[20px] md:text-[30px] leading-snug font-semibold text-[#2b3440]">
                Với kinh nghiệm hàng chục năm, chúng tôi chuyên biến những{" "}
                <span className="text-orange-500">
                  ý tưởng
                </span>{" "}
                thành những công trình được thiết kế tốt, trường tồn theo thời gian.
              </h2>
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


      {/* Dự án mới đây */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-24">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <h1 className="text-2xl md:text-3xl font-semibold">BIỆT THỰ SONG LẬP ID JUNCTION</h1>
            <p className="max-w-md text-xs md:text-sm text-gray-500 md:text-right">
              Một chút 𝒇𝒂𝒓𝒎𝒉𝒐𝒖𝒔𝒆 nhẹ nhàng cho căn biệt thự song lập 𝐈𝐃 𝐉𝐔𝐍𝐂𝐓𝐈𝐎𝐍 (Nhơn Trạch, Long Thành).
            </p>
          </div>

          {/* Hero Image */}
          <div className="w-full h-[320px] relative rounded-md overflow-hidden mb-8">
            <Image
              src="/images/hero.jpg"
              alt="hero"
              fill
              className="object-cover"
            />
          </div>

          {/* Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-6 mb-8 text-sm">
            <Info label="Dịch vụ" value="Xây dựng nhà ở" />
            <Info label="Ngày" value="Tháng 6, 2025" />
            <Info label="Địa điểm" value="Nhơn Trạch, Long Thành" />
            <Info label="Khách hàng" value="Mr Hoàng Sơn" />
          </div>

          {/* Value + About */}
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

          {/* Image */}
          <div className="w-full h-[260px] relative rounded-md overflow-hidden mb-12">
            <Image
              src="/images/interior.jpeg"
              alt="interior"
              fill
              className="object-cover"
            />
          </div>

          {/* Work Process */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Quy trình làm việc</h3>

            <ul className="space-y-6 text-sm text-gray-600">
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
            </ul>
          </div>
        </div>
      </section>



      {/* Một vài dự án khác */}
      <ProjectsSection />



      {/* Vị trí của chúng tôi */}
      <section className="text-center py-10 md:py-20">

        {/* badge */}
        <div className="inline-block px-5 py-1.5 border border-[#ff5a1f] text-[#ff5a1f] rounded-full text-sm">
          Vị trí của chúng tôi
        </div>

        {/* title */}
        <h2 className="mt-6 text-[25px] md:text-[48px] font-semibold text-[#1f2937]">
          Tìm chúng tôi trên bản đồ
        </h2>
        <div className="flex justify-center my-8">
          <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d52341.83352513132!2d105.86872856610702!3d21.08382458817568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA2JzAyLjciTiAxMDXCsDUzJzAzLjEiRQ!5e0!3m2!1svi!2sus!4v1772254206197!5m2!1svi!2sus" width="1000" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>


      {/* Hãy nói về dự án của bạn nào ! */}
      <section className="bg-[#f3f4f6] py-10 md:py-20 text-center">
        <h1 className="text-[25px] md:text-[48px] font-semibold text-[#2c3640]">
          Hãy nói về dự án của bạn nào !
        </h1>

        <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-[14px] md:text-lg">
          Dù bạn đang lên kế hoạch, xây dựng hay cải tạo, chúng tôi luôn sẵn sàng hỗ trợ.
          Hãy liên hệ ngay hôm nay và cùng nhau tạo ra điều gì đó tuyệt vời.
        </p>
      </section>


      {/* CONTACT SECTION */}
      <section className="bg-[#243241] py-10 md:py-24 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT INFO */}
          <div className="text-white">

            <span className="bg-[#ff7a50] text-white text-sm px-4 py-1 rounded-full">
              Hãy liên hệ với chúng tôi
            </span>

            <h2 className="text-5xl font-semibold mt-6">
              Hãy cùng nhau hợp tác!
            </h2>

            <p className="mt-6 text-gray-300 leading-relaxed max-w-md">
              Dù bạn có câu hỏi, cần thêm thông tin về dịch vụ của chúng tôi, hay muốn thảo luận về một hợp tác tiềm năng, chúng tôi luôn sẵn sàng hỗ trợ.
            </p>


            {/* INFO GRID */}
            <div className="mt-12 space-y-8 text-gray-300">

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


              <div className="border-t border-gray-500 pt-6">
                <p className="text-gray-400">Đại chỉ</p>
                <p className="mt-2 text-white">
                  7 Đông Hội, Thôn Trung Thôn, Đông Anh, Hà Nội, Việt Nam
                </p>
              </div>


              <div className="border-t border-gray-500 pt-6">
                <p className="text-gray-400">Giờ làm việc</p>

                <div className="mt-2 space-y-1 text-white">
                  <p>Thứ Hai - Thứ Sáu, 7:00  - 17:00 </p>
                  <p>Thứ Bảy: 9:00 - 14:00</p>
                  <p>Chủ Nhật: Đóng cửa</p>
                </div>
              </div>

            </div>
          </div>


          {/* FORM CARD */}
          <div className="bg-[#ffffff] p-5 md:p-10 shadow-lg">

            <h3 className="text-2xl font-semibold text-[#2c3640] mb-8">
              Đăng ký tư vấn miễn phí
            </h3>

            <form className="space-y-5">

              <div>
                <label className="text-sm text-gray-700">Họ và tên*</label>
                <input
                  className="w-full mt-2 px-4 py-3 border border-gray-300 bg-transparent outline-none"
                  placeholder="Họ và tên của bạn"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Địa chỉ Email*</label>
                <input
                  className="w-full mt-2 px-4 py-3 border border-gray-300 bg-transparent outline-none"
                  placeholder="Địa chỉ Email của bạn"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700">Số điện thoại*</label>
                  <input
                    className="w-full mt-2 px-4 py-3 border border-gray-300 bg-transparent outline-none"
                    placeholder="Số điện thoại của bạn"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Loại dự án*</label>
                  <select className="w-full mt-2 px-4 py-3 border border-gray-300 bg-transparent outline-none">
                    <option>Chọn loại dự án</option>
                    <option>Xây dựng</option>
                    <option>Cải tạo</option>
                    <option>Tư vấn</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Tin nhắn*</label>
                <textarea
                  rows={5}
                  className="w-full mt-2 px-4 py-3 border border-gray-300 bg-transparent outline-none resize-none"
                  placeholder="Hãy cho chúng tôi biết về dự án của bạn..."
                />
              </div>

              <button
                type="submit"
                className="bg-[#ff4d2d] text-white px-8 py-3 mt-4 hover:opacity-90 transition flex items-center gap-2"
              >
                Gửi yêu cầu →
              </button>

            </form>
          </div>

        </div>
      </section>

      

      {/* Một vài bài viết khác */}
      <BlogSection />

      {/* Câu hỏi thường gặp */}
      <FaqSection />
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