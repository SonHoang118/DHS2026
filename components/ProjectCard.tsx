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
				<div className="absolute top-3 left-3 flex gap-2 text-xs">
					<span className="bg-gray-800 text-white px-2 py-1 rounded">Houses</span>
					<span className="bg-gray-600 text-white px-2 py-1 rounded">Sell</span>
				</div>
			</div>
			<h3 className="mt-3 font-semibold text-gray-800">{item.name}</h3>
			<p className="text-sm text-gray-400">{item.investor}</p>
			<p className="mt-2 text-red-500 text-sm font-medium">xem chi tiết →</p>
		</Link>
	);
}
