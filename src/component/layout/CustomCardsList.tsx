'use client'
import { useEffect, useState } from "react";
import { AttractionCard, CarCard, StayCard } from "../ui/Card";
import { useSearchParams } from "next/navigation";
import { StayObject } from "@/types/stays";
import { AttractionObject } from "@/types/attraction";
import Link from "next/link";
import { CarObject } from "@/types/car";
import { useSearchingService } from "@/hook/useSearching";


function StaysList() {
    const [stays, setStays] = useState([]);

    useEffect(() => {
        const fetchStays = async () => {
            const res = await fetch('/api/stays/all');
            const json = await res.json();
            setStays(json)
        };
        fetchStays();
    }, []);
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


function StayListSearch() {
    const { results, isLoading, error, location, checkin, checkout } = useSearchingService('stays');

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
                    <StayCard key={i} stay={stay as StayObject} />
                ))}
            </div>
        </div>
    );
}

function AttractionSearchList() {
    const { results, isLoading, error, location, checkdate } = useSearchingService('attractions');

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
                    <AttractionCard key={i} attraction={attraction as AttractionObject} />
                ))}
            </div>
        </div>
    );
}

function CarsListSearch() {
    const { results, isLoading, error, location, checkin, checkout } = useSearchingService('cars');

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
                    Không tìm thấy xe nào phù hợp với tiêu chí của bạn.
                </p>
            )}

            <div className="space-y-5">
                {results.map((item, i) => (
                    // Sử dụng component StayCard đã được định nghĩa
                    <CarCard key={i} car={item as CarObject} />
                ))}
            </div>
        </div>
    );
}

export { StaysList, StayListSearch, AttractionSearchList, CarsListSearch };