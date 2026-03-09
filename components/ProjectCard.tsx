import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

type ProjectCardProps = {
	item: any;
	large?: boolean;
	index?: number;
};

export default function ProjectCard({ item, large, index }: ProjectCardProps) {
	const ref = useRef<HTMLAnchorElement>(null);
	const [visible, setVisible] = useState(false);
	const [delay] = useState(() => Math.floor(Math.random() * 400));
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new window.IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	const projectPath = `/projects/${item.slugify || item._id}`;
	const categories = Array.isArray(item?.category)
		? item.category.filter((c: unknown): c is string => typeof c === "string" && c.trim().length > 0)
		: typeof item?.category === "string" && item.category.trim().length > 0
			? item.category
				.split(",")
				.map((c: string) => c.trim())
				.filter(Boolean)
			: [];
	const visibleCategories = categories.slice(0, 3);

	return (
		<Link
			href={projectPath}
			aria-label={`Xem chi tiet du an ${item.name}`}
			ref={ref}
			className={`group block w-full cursor-pointer transition duration-700 ease-out transform ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
			style={{ willChange: "transform, opacity", transitionDelay: `${delay}ms` }}
		>
			<div className="relative overflow-hidden border-2 border-transparent group-hover:border-red-500 transition">
				<Image
					src={item.imgs?.[0]?.link ?? "/images/404img.jpg"}
					alt=""
					width={600}
					height={400}
					className={`w-full object-cover transition duration-500 group-hover:scale-102 ${large ? "h-[320px]" : "h-[220px]"}`}
				/>
				{visibleCategories.length > 0 && (
					<div className="absolute top-3 left-3 flex flex-wrap gap-2 text-xs">
						{visibleCategories.map((category: string, idx: number) => (
							<span
								key={`${projectPath}-category-${idx}-${category}`}
								className={idx % 2 === 0 ? "bg-gray-800 text-white px-2 py-1 rounded" : "bg-gray-600 text-white px-2 py-1 rounded"}
							>
								{category}
							</span>
						))}
					</div>
				)}
			</div>
			<h3 className="mt-3 font-semibold text-gray-800">{item.name}</h3>
			<p className="text-sm text-gray-400">{item.investor}</p>
			<p className="mt-2 text-red-500 text-sm font-medium">xem chi tiết →</p>
		</Link>
	);
}
