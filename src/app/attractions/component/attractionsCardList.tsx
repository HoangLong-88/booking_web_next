import { AttractionCard } from "@/component/ui/Card";
import { AttractionObject } from "@/types/attraction";
import Link from "next/link";

export function AttractionSearchList({
    location,
    checkdate,
    isLoading,
    results,
    error,
}: {
    location: string | null,
    checkdate: string | null,
    results: AttractionObject[],
    isLoading: boolean | null,
    error: string | null
}) {
    return (
        <div className="px-6 max-w-7xl mx-auto">
            <h1 className="text-xl font-bold mb-2 text-orange-300">
                Kết Quả Tìm Kiếm Điểm Tham Quan
            </h1>

            <p className="mb-4 text-gray-700 flex gap-x-1">
                <Link href='/' className="text-blue-500 hover:underline">Trang chủ</Link>
                <img src="/icon/arrow-icon.png" alt=">" className="w-5 h-5" />
                {location || 'Tất cả địa điểm'}
                {typeof window !== "undefined" && (
                    <>
                        {checkdate && ` từ ${new Date(checkdate).toLocaleDateString('vi-VN')}`}
                    </>
                )}
            </p>

            {isLoading && <p className="text-center text-blue-600 text-xl">Đang tải kết quả...</p>}

            {error && <p className="text-center text-red-600 text-xl">{error}</p>}

            {!isLoading && results.length === 0 && !error && (
                <p className="text-center text-xl text-gray-500 border p-4 rounded-lg">
                    Không tìm thấy chỗ ở nào phù hợp với tiêu chí của bạn.
                </p>
            )}

            <div className="space-y-5">
                {results.map((attraction, i) => (
                    <AttractionCard key={i} attraction={attraction} />
                ))}
            </div>
        </div>
    );
}