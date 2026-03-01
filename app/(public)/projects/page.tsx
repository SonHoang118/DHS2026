"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const PER_PAGE = 8;

async function getProjects(page: number) {
  const skip = (page - 1) * PER_PAGE;
  const res = await fetch(
    `/api/projects?skip=${skip}&limit=${PER_PAGE}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

function Card({ item, large }: any) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden border-2 border-transparent group-hover:border-red-500 transition">
        <Image
          src={item.imgs?.[0]?.link ?? "/fallback.jpg"}
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
    </div>
  );
}

function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) {
  return (
    <div className="flex justify-center gap-2 mt-10">
      <button
        className={`px-3 py-1 border rounded ${page === 1 ? "pointer-events-none opacity-40" : ""}`}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-black text-white" : "hover:bg-gray-100"}`}
          onClick={() => onPageChange(i + 1)}
          disabled={page === i + 1}
        >
          {i + 1}
        </button>
      ))}
      <button
        className={`px-3 py-1 border rounded ${page === totalPages ? "pointer-events-none opacity-40" : ""}`}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const page = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(total / PER_PAGE);

  useEffect(() => {
    setLoading(true);
    getProjects(page)
      .then((data) => {
        setProjects(data.items);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const handlePageChange = (p: number) => {
    router.push(`?page=${p}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Explore our featured listings</h2>
        <p className="text-gray-400 text-sm max-w-md text-right">From modern city apartments to spacious family homes, find the one that feels just right.</p>
      </div>
      {loading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((item: any, i: number) => (
            <div key={item._id} className={i === 0 ? "md:col-span-2" : ""}>
              <Card item={item} large={i === 0} />
            </div>
          ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </section>
  );
}

// import Image from "next/image";
// import Link from "next/link";

// const PER_PAGE = 8;

// async function getProjects(page: number) {
//   const skip = (page - 1) * PER_PAGE;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/projects?skip=${skip}&limit=${PER_PAGE}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) throw new Error("Failed to fetch");

//   return res.json();
// }

// function Card({ item, large }: any) {
//   return (
//     <div className="group cursor-pointer">
//       <div className="relative overflow-hidden border-2 border-transparent group-hover:border-red-500 transition">
//         <Image
//           src={item.imgs?.[0]?.link ?? "/fallback.jpg"}
//           alt=""
//           width={600}
//           height={400}
//           className={`w-full object-cover transition duration-500 group-hover:scale-102 ${large ? "h-[320px]" : "h-[220px]"
//             }`}
//         />

//         <div className="absolute top-3 left-3 flex gap-2 text-xs">
//           <span className="bg-gray-800 text-white px-2 py-1 rounded">
//             Houses
//           </span>
//           <span className="bg-gray-600 text-white px-2 py-1 rounded">
//             Sell
//           </span>
//         </div>
//       </div>

//       <h3 className="mt-3 font-semibold text-gray-800">{item.name}</h3>
//       <p className="text-sm text-gray-400">{item.investor}</p>

//       <p className="mt-2 text-red-500 text-sm font-medium">
//         xem chi tiết →
//       </p>
//     </div>
//   );
// }

// export default async function Page({ searchParams }: any) {
//   const page = Number(searchParams.page || 1);

//   const data = await getProjects(page);
//   const projects = data.items;
//   const total = data.total;

//   const totalPages = Math.ceil(total / PER_PAGE);

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-12">
//       {/* header */}
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-2xl font-bold text-gray-800">
//           Explore our featured listings
//         </h2>

//         <p className="text-gray-400 text-sm max-w-md text-right">
//           From modern city apartments to spacious family homes, find the one
//           that feels just right.
//         </p>
//       </div>

//       {/* grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {projects.map((item: any, i: number) => (
//           <div key={item._id} className={i === 0 ? "md:col-span-2" : ""}>
//             <Card item={item} large={i === 0} />
//           </div>
//         ))}
//       </div>

//       {/* pagination */}
//       <div className="flex justify-center gap-2 mt-10">
//         <Link
//           href={`?page=${page - 1}`}
//           className={`px-3 py-1 border rounded ${page === 1 && "pointer-events-none opacity-40"
//             }`}
//         >
//           Prev
//         </Link>

//         {Array.from({ length: totalPages }).map((_, i) => (
//           <Link
//             key={i}
//             href={`?page=${i + 1}`}
//             className={`px-3 py-1 border rounded ${page === i + 1
//                 ? "bg-black text-white"
//                 : "hover:bg-gray-100"
//               }`}
//           >
//             {i + 1}
//           </Link>
//         ))}

//         <Link
//           href={`?page=${page + 1}`}
//           className={`px-3 py-1 border rounded ${page === totalPages && "pointer-events-none opacity-40"
//             }`}
//         >
//           Next
//         </Link>
//       </div>
//     </section>
//   );
// }