import Image from "next/image";
import Link from "next/link";

export default function BlogSection() {
  return (
    <section className="bg-[#f4f5f7] py-12 md:py-16">
      <div className="flex justify-center mb-6">
        <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-500 text-sm">
          Bài viết
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT MAIN POST */}
        <div className="lg:col-span-2 mb-8 lg:mb-0">
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="relative w-full h-64 md:h-[360px]">
              <Image
                src="/images/bg1.jpg"
                alt="post"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                How to Record A Podcast Remotely | 4 Methods to Try
              </h2>
              <p className="text-gray-600 mt-2 md:mt-3 text-sm md:text-[15px] leading-relaxed">
                Learn how to record a podcast remotely with our full step-by-step guide.
                We'll show you 4 top ways to record a long-distance podcast with remote guests!
              </p>
              {/* author */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-4 md:mt-5 text-xs md:text-sm text-gray-500">
                <Image
                  src="/images/bg1.jpg"
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-medium text-gray-700">Stephen Robles</span>
                <span>Video & Podcast Creator</span>
                <span className="text-blue-600">Podcast recording</span>
                <span>October 11, 2024 • 8 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-5 md:space-y-6">
          {/* trending banner */}
          <div className="rounded-xl overflow-hidden relative h-28 md:h-[140px] text-white">
            <Image
              src="/images/bg1.jpg"
              alt="trending"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute left-4 md:left-6 top-4 md:top-6 text-base md:text-lg font-semibold">
              Trending <br /> on Riverside
            </div>
          </div>
          {/* LIST ITEMS */}
          {[
            {
              title: "How to Use iPhone as Webcam on Mac & Windows | Step-by-step",
              date: "Jun 28, 2024",
              tag: "Studio equipment",
              img: "/images/bg1.jpg"
            },
            {
              title: "How to Record a Video Podcast (Remotely) in 5 Steps",
              date: "Mar 21, 2024",
              tag: "Video podcast",
              img: "/images/bg1.jpg"
            },
            {
              title: "How to Improve Zoom Video Quality (Full Video & Audio Guide)",
              date: "Mar 5, 2024",
              tag: "Recording software",
              img: "/images/bg1.jpg"
            }
          ].map((item, i) => (
            <div key={i} className="flex gap-3 md:gap-4 bg-white p-2 md:p-3 rounded-lg shadow-sm">
              <div className="relative w-24 md:w-28 h-16 md:h-20 shrink-0">
                <Image src={item.img} alt="" fill className="object-cover rounded-md" />
              </div>
              <div className="flex flex-col justify-between">
                <h4 className="text-sm md:text-[15px] font-medium text-gray-800 leading-snug">
                  {item.title}
                </h4>
                <div className="text-xs text-gray-500">
                  {item.date} • 14 min
                </div>
                <span className="text-xs text-blue-600">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row max-w-5xl w-full justify-between items-start md:items-center mx-auto mt-12 md:mt-16 gap-6 md:gap-0 px-4">
        <div>
          <h2 className="text-xl md:text-[24px] leading-[1.2] font-semibold text-[#1f2937] mb-2">
            Our Real World
          </h2>
          <p className="text-gray-500 leading-relaxed max-w-xs md:max-w-sm">
            Hãy cùng chiêm ngưỡng một số công trình và dự án cải tạo mà chúng tôi tự hào nhất.
          </p>
        </div>
        <button className="border border-gray-300 px-5 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-3 hover:bg-black hover:text-white transition mt-4 md:mt-20">
          Xem thêm các dự án khác
          <span>→</span>
        </button>
      </div>
    </section>
  );
}