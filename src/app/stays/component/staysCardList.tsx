import { StayCard } from "@/component/ui/Card";
import { StayObject } from "@/types/stays";

export function StaysList({stays}:{stays: StayObject[]}) {
    return (
        <div className="space-y-5">
            <p className="text-xl underline">
                <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
                Các nơi ở tìm được:
            </p>
            {stays.map((stay, i) => (
                <StayCard key={i} stay={stay} />
            ))}
        </div>
    );
}

export function StayListSearch({
    location,
    checkin, 
    checkout,
    results,
    isLoading,
    error
}:{
    location: string | null,
    checkin: string | null,
    checkout: string | null,
    results: StayObject[],
    isLoading: boolean | null,
    error: string | null
}) {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-xl font-bold mb-6">
                Kết Quả Tìm Kiếm Chỗ Ở
            </h1>

            <p className="mb-4 text-gray-700">
                Tìm kiếm tại **{location || 'Tất cả địa điểm'}**
                {typeof window !== "undefined" && (
                    <>
                        {checkin && ` từ ${new Date(checkin).toLocaleDateString('vi-VN')}`}
                        {checkout && ` đến ${new Date(checkout).toLocaleDateString('vi-VN')}`}
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
                {results.map((stay, i) => (
                    // Sử dụng component StayCard đã được định nghĩa
                    <StayCard key={i} stay={stay} />
                ))}
            </div>
        </div>
    );
}