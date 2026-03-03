export default function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) {
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
