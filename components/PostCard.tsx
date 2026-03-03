import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { formatDate } from "@/lib/date";

type PostCardProps = {
	item: any;
	featured?: boolean;
	index?: number;
};

export default function PostCard({ item, featured = false, index }: PostCardProps) {
	const ref = useRef<HTMLDivElement>(null);
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

	if (featured) {
		return (
			<>
				{/* Image */}
				<div
					ref={ref}
					className={`group transition cursor-pointer duration-700 ease-out transform ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
					style={{ willChange: "transform, opacity", transitionDelay: `${delay}ms` }}
				>
					<div className="relative h-[380px] rounded-md overflow-hidden">
						<Image
							src={item.imgTitle}
							alt={item.title}
							fill
							className={`w-full object-cover transition duration-500 group-hover:scale-102`}
						/>
					</div>
				</div>

				{/* Content */}
				<div className="transition duration-700 ease-out">
					<p className="text-xs tracking-widest text-gray-500 mb-3">
						Chính trị &nbsp; {formatDate(item.createdAt)}
					</p>

					<h3 className="text-3xl font-semibold text-gray-900 leading-snug mb-4">
						{item.title}
					</h3>

					<p className="text-gray-600 mb-6 leading-relaxed">
						{item.content.slice(0, 200)}...
					</p>

					<button className="px-6 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition">
						Read More
					</button>
				</div>
			</>
		);
	}

	// Default (small card)
	return (
		<div
			ref={ref}
			className={`group cursor-pointer transition duration-700 ease-out transform ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
			style={{ willChange: "transform, opacity", transitionDelay: `${delay}ms` }}
		>
			<div className="relative h-[240px] rounded-md overflow-hidden mb-4">
				<Image
					src={item.imgTitle}
					alt={item.title}
					fill
					className={`w-full object-cover transition duration-500 group-hover:scale-102`}
				/>
			</div>
			<p className="text-xs text-gray-500 mb-2">
				Chính trị &nbsp; {formatDate(item.createdAt)}
			</p>
			<h4 className="font-semibold text-lg text-gray-900 mb-2">
				{item.title}
			</h4>
			<p className="text-sm text-gray-600 mb-3">
				{item.content.slice(0, 200)}...
			</p>
			<button className="text-purple-600 text-sm font-medium hover:underline">
				Read More...
			</button>
		</div>
	);
}
