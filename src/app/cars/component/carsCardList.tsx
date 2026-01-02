import { CarCard } from "@/component/ui/Card";
import { CarObject } from "@/types/car";

export function CarsListSearch({
    location,
    checkin,
    checkout,
    results,
    isLoading,
    error
}: {
    location: string | null,
    checkin: string | null,
    checkout: string | null,
    results: CarObject[],
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
                {results.map((item, i) => (
                    // Sử dụng component StayCard đã được định nghĩa
                    <CarCard key={i} car={item} />
                ))}
            </div>
        </div>
    );
}