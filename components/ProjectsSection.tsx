"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import RevealOnView from "@/components/RevealOnView";
import TypewriterText from "./TypewriterText";

type ProjectCard = {
    _id?: string;
    slugify?: string;
    name?: string;
    imgs?: Array<{ link?: string; url?: string; src?: string }> | string[];
};

const getProjectThumb = (project: ProjectCard): string => {
    const images = Array.isArray(project.imgs) ? project.imgs : [];
    const first = images[0];

    if (typeof first === "string") {
        return first;
    }

    if (first && typeof first === "object") {
        return first.link || first.url || first.src || "/images/404img.jpg";
    }

    return "/images/404img.jpg";
};

export default function ProjectsSection() {
    const [projects, setProjects] = useState<ProjectCard[]>([]);

    useEffect(() => {
        fetch("/api/projects?skip=0&limit=2", { cache: "no-store" })
            .then((res) => res.json())
            .then((data) => {
                const items = Array.isArray(data?.items) ? data.items : [];
                setProjects(items.slice(0, 2));
            })
            .catch(() => setProjects([]));
    }, []);

    return (
        <section className="py-10 md:py-20 border-b border-gray-200">
            <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-3 gap-16 items-start">

                {/* LEFT TEXT */}
                <div>
                    <span className="px-4 py-1 rounded-full text-sm bg-[#ffe9e3] text-[#ff5a1f]">
                        Dự án gần đây
                    </span>

                    <div className="min-h-[235px]">


                        <TypewriterText
                            onceKey="projects-section-heading"
                            as="h2"
                            delay={300}
                            speed={50}
                            humanize={true}
                            startWhenAncestorVisible={true}
                            className="mt-6 text-[44px] leading-[1.2] font-semibold text-[#1f2937]"
                            text="Các dự án thực tế đã triển khai của chúng tôi"
                        />


                        {/* <h2 className="mt-6 text-[44px] leading-[1.2] font-semibold text-[#1f2937]">
                            Các dự án thực tế đã triển khai của chúng tôi
                            </h2> */}

                        <TypewriterText
                            onceKey="projects-section-description"
                            as="p"
                            delay={1400}
                            speed={50}
                            humanize={true}
                            startWhenAncestorVisible={true}
                            className="mt-5 text-gray-500 leading-relaxed max-w-sm"
                            text="Hãy cùng chiêm ngưỡng một số công trình và dự án cải tạo mà chúng tôi tự hào nhất."
                        />
                        {/* <p className="mt-5 text-gray-500 leading-relaxed max-w-sm">
                            Hãy cùng chiêm ngưỡng một số công trình và dự án cải tạo mà chúng tôi tự hào nhất.
                        </p> */}

                    </div>

                    <Link href="/project" className="mt-10 border border-gray-300 px-6 py-3 inline-flex items-center gap-3 hover:bg-black hover:text-white transition">
                        Xem thêm các dự án khác
                        <span>→</span>
                    </Link>
                </div>

                {/* PROJECT LIST */}
                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-10">
                    {projects.map((p, i) => {
                        const projectId = p.slugify || p._id;
                        const href = projectId ? `/projects/${projectId}` : "/projects";
                        const title = p.name || "Du an";
                        const image = getProjectThumb(p);
                        const delayClass = i === 0 ? "delay-100" : "delay-300";
                        const onceKey = `projects-section-card-${projectId || i}`;

                        return (
                            <RevealOnView
                                key={p._id || p.slugify || i}
                                onceKey={onceKey}
                                threshold={0.2}
                                rootMargin="0px 0px -10% 0px"
                                className={`${delayClass} will-change-transform`}
                            >
                                <Link href={href} className="group block">

                                    {/* IMAGE */}
                                    <div className="overflow-hidden">
                                        <img
                                            src={image}
                                            alt={title}
                                            className="object-cover w-full h-[420px] group-hover:scale-105 transition duration-500"
                                        />
                                    </div>

                                    {/* TITLE */}
                                    <h3 className="mt-5 text-xl font-semibold text-[#1f2937]">
                                        {title}
                                    </h3>

                                    {/* LINK */}
                                    <span className="mt-2 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition">
                                        Xem chi tiết <span>→</span>
                                    </span>

                                </Link>
                            </RevealOnView>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}