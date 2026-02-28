import Image from "next/image";
import Link from "next/link";

export default function BlogSection() {
  return (
    <section className="bg-[#f4f5f7] py-16">
        <span className=" px-4 py-1 rounded-full bg-orange-100 text-orange-500 text-sm">
          Bài viết
        </span>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">

        {/* LEFT MAIN POST */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">

            <div className="relative w-full h-[360px]">
              <Image
                src="/images/post-main.jpg"
                alt="post"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">

              <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
                How to Record A Podcast Remotely | 4 Methods to Try
              </h2>

              <p className="text-gray-600 mt-3 text-[15px] leading-relaxed">
                Learn how to record a podcast remotely with our full step-by-step guide.
                We'll show you 4 top ways to record a long-distance podcast with remote guests!
              </p>

              {/* author */}
              <div className="flex items-center gap-3 mt-5 text-sm text-gray-500">

                <Image
                  src="/images/avatar.jpg"
                  alt="avatar"
                  width={36}
                  height={36}
                  className="rounded-full"
                />

                <span className="font-medium text-gray-700">
                  Stephen Robles
                </span>

                <span>Video & Podcast Creator</span>

                <span className="text-blue-600">Podcast recording</span>

                <span>October 11, 2024 • 8 min</span>

              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* trending banner */}
          <div className="rounded-xl overflow-hidden relative h-[140px] text-white">

            <Image
              src="/images/trending.jpg"
              alt="trending"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

            <div className="absolute left-6 top-6 text-lg font-semibold">
              Trending <br /> on Riverside
            </div>

          </div>


          {/* LIST ITEMS */}
          {[
            {
              title: "How to Use iPhone as Webcam on Mac & Windows | Step-by-step",
              date: "Jun 28, 2024",
              tag: "Studio equipment",
              img: "/images/post1.jpg"
            },
            {
              title: "How to Record a Video Podcast (Remotely) in 5 Steps",
              date: "Mar 21, 2024",
              tag: "Video podcast",
              img: "/images/post2.jpg"
            },
            {
              title: "How to Improve Zoom Video Quality (Full Video & Audio Guide)",
              date: "Mar 5, 2024",
              tag: "Recording software",
              img: "/images/post3.jpg"
            }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 bg-white p-3 rounded-lg shadow-sm">

              <div className="relative w-28 h-20 shrink-0">
                <Image src={item.img} alt="" fill className="object-cover rounded-md" />
              </div>

              <div className="flex flex-col justify-between">

                <h4 className="text-[15px] font-medium text-gray-800 leading-snug">
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
    </section>
  );
}