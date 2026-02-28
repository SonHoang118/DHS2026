import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";
import ProjectsSection from "@/components/ProjectsSection";
import Slider from "@/components/Slider";
import Image from "next/image";

export default function Home() {
  const stats = [
    { value: "10+", label: "Years of Experience" },
    { value: "1500+", label: "Projects Completed" },
    { value: "4.8/5", label: "Customer Satisfaction Score" },
    { value: "98%", label: "Project Success Rate" },
  ];
  return (
    <main className="min-h-screen text-gray-800">

      <div className="mx-auto mt-10 w-[1200px]" style={{ height: '500px' }}>
        <Slider
          images={[
            'https://miro.medium.com/v2/resize:fit:1400/1*uRC-z-KOuJHgCuruttLw5Q.jpeg',
            'https://www.marinabaysands.com/content/dam/marinabaysands/guides/exceptional-experiences/architecture-of-mbs/masthead-d.jpg',
            'https://media.architecturaldigest.com/photos/6499bd6757eceeca17cb751f/16:9/w_2560%2Cc_limit/GettyImages-1170020493.jpg'
          ]}
        />
      </div>
      <section className="py-14 text-center">

        {/* TITLE */}
        <h1 className="
        text-[32px]
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






      <section className="bg-[#f6f7f8] py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">

            <div className="max-w-2xl">
              <span className="bg-orange-100 text-orange-500 text-sm px-4 py-1 rounded-full">
                "Đôi chút" về chúng tôi
              </span>

              <h2 className="mt-6 text-[30px] leading-snug font-semibold text-[#2b3440]">
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
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-semibold">Oakridge Smart Home</h1>
          <p className="text-sm text-gray-500 max-w-md text-right">
            Oakridge Smart Home in San Diego combines smart and clean technology,
            sustainable materials, and redefining modern living.
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
        <div className="grid grid-cols-4 gap-6 border-b pb-6 mb-8 text-sm">
          <Info label="Service" value="Residential Construction" />
          <Info label="Date" value="June 2025" />
          <Info label="Location" value="San Diego, CA" />
          <Info label="Client" value="Kevin & Marissa Lake" />
        </div>

        {/* Value + About */}
        <div className="grid grid-cols-3 gap-10 mb-10">
          <div>
            <p className="text-gray-500 mb-2">Project Value</p>
            <h2 className="text-3xl font-bold text-orange-500">$1.2 Million</h2>
          </div>

          <div className="col-span-2">
            <h3 className="text-xl font-semibold mb-3">About Project</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              The Oakridge Smart Home project began with a clear client vision:
              a tech-integrated, future-ready home that harmonizes comfort,
              design, and sustainability. Our team worked closely with the Lakes
              to create a custom build featuring solar panels, home automation,
              energy-efficient HVAC, and minimalist interiors. The home includes
              4 bedrooms, 3 bathrooms, a home office, and outdoor living space
              designed for family gatherings and relaxation.
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
          <h3 className="text-2xl font-semibold mb-6">Work Process</h3>

          <ul className="space-y-6 text-sm text-gray-600">
            <li className="flex gap-3">
              <Dot />
              <div>
                <p className="font-medium text-gray-800">
                  Client Consultation & Concept Development
                </p>
                <p>
                  We start by understanding clients' unique needs and preferences,
                  defining goals and technology choices to create a tailored vision.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <Dot />
              <div>
                <p className="font-medium text-gray-800">
                  Architectural Design & Smart Planning
                </p>
                <p>
                  We integrate smart home systems and sustainable features into
                  the design, focusing on energy efficiency, eco-friendliness,
                  and modern aesthetics.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <ProjectsSection />

      <section className="text-center py-24">

        {/* badge */}
        <div className="inline-block px-5 py-1.5 border border-[#ff5a1f] text-[#ff5a1f] rounded-full text-sm">
          Vị trí của chúng tôi
        </div>

        {/* title */}
        <h2 className="mt-6 text-[48px] font-semibold text-[#1f2937]">
          Tìm chúng tôi trên bản đồ
        </h2>
        <div className="flex justify-center my-8">
          <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d52341.83352513132!2d105.86872856610702!3d21.08382458817568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA2JzAyLjciTiAxMDXCsDUzJzAzLjEiRQ!5e0!3m2!1svi!2sus!4v1772254206197!5m2!1svi!2sus" width="1000" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>


      </section>


      <section className="bg-[#f3f4f6] py-20 text-center">
        <h1 className="text-[56px] font-semibold text-[#2c3640]">
            Hãy nói về dự án của bạn nào !
        </h1>

        <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
          Dù bạn đang lên kế hoạch, xây dựng hay cải tạo, chúng tôi luôn sẵn sàng hỗ trợ.
          Hãy liên hệ ngay hôm nay và cùng nhau tạo ra điều gì đó tuyệt vời.
        </p>
      </section>


      {/* CONTACT SECTION */}
      <section className="bg-[#243241] py-24 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT INFO */}
          <div className="text-white">

            <span className="bg-[#ff7a50] text-white text-sm px-4 py-1 rounded-full">
              Hãy liên hệ với chúng tôi
            </span>

            <h2 className="text-5xl font-semibold mt-6">
              Let’s Work Together
            </h2>

            <p className="mt-6 text-gray-300 leading-relaxed max-w-md">
              Whether you have a question, need more details about our
              services, or want to discuss a potential collaboration, we're
              here to help.
            </p>


            {/* INFO GRID */}
            <div className="mt-12 space-y-8 text-gray-300">

              <div className="border-t border-gray-500 pt-6 flex gap-16">
                <div>
                  <p className="text-gray-400">Message Us</p>
                  <p className="mt-2 text-white">contact@bricknetbuilds.com</p>
                </div>

                <div>
                  <p className="text-gray-400">Call Us</p>
                  <p className="mt-2 text-white">(555) 483-2190</p>
                </div>
              </div>


              <div className="border-t border-gray-500 pt-6">
                <p className="text-gray-400">Location</p>
                <p className="mt-2 text-white">
                  82 Westfield Industrial Blvd, San Diego, CA 92101
                </p>
              </div>


              <div className="border-t border-gray-500 pt-6">
                <p className="text-gray-400">Business Hours</p>

                <div className="mt-2 space-y-1 text-white">
                  <p>Monday - Friday, 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

            </div>
          </div>


          {/* FORM CARD */}
          <div className="bg-[#ffffff] p-10 shadow-lg">

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
      <BlogSection />
      <FaqSection />
    </main>
  );
}
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500 mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Dot() {
  return (
    <span className="mt-2 w-2 h-2 bg-gray-800 rounded-full flex-shrink-0" />
  );
}