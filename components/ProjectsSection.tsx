import Image from "next/image";

const projects = [
    {
        title: "Skyline Residence",
        img: "/images/bg1.jpg",
    },
    {
        title: "StoneCore Office Park",
        img: "/images/bg1.jpg",
    },
];

export default function ProjectsSection() {
    return (
        <section className="py-24 border-b border-gray-200">
            <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-3 gap-16 items-start">

                {/* LEFT TEXT */}
                <div>
                    <span className="px-4 py-1 rounded-full text-sm bg-[#ffe9e3] text-[#ff5a1f]">
                        Dự án gần đây
                    </span>

                    <h2 className="mt-6 text-[44px] leading-[1.2] font-semibold text-[#1f2937]">
                        Our Real World <br /> Work in Action
                    </h2>

                    <p className="mt-5 text-gray-500 leading-relaxed max-w-sm">
                        Browse through some of our proudest builds and transformations
                    </p>

                    <button className="mt-10 border border-gray-300 px-6 py-3 flex items-center gap-3 hover:bg-black hover:text-white transition">
                        Xem thêm các dự án khác
                        <span>→</span>
                    </button>
                </div>

                {/* PROJECT LIST */}
                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-10">
                    {projects.map((p, i) => (
                        <div key={i} className="group">

                            {/* IMAGE */}
                            <div className="overflow-hidden">
                                <Image
                                    src={p.img}
                                    alt={p.title}
                                    width={500}
                                    height={600}
                                    className="object-cover w-full h-[420px] group-hover:scale-105 transition duration-500"
                                />
                            </div>

                            {/* TITLE */}
                            <h3 className="mt-5 text-xl font-semibold text-[#1f2937]">
                                {p.title}
                            </h3>

                            {/* LINK */}
                            <button className="mt-2 flex items-center gap-2 text-sm text-gray-500 hover:text-black transition">
                                Xem chi tiết <span>→</span>
                            </button>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}