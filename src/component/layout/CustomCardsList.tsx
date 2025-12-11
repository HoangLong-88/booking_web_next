'use client'
import { useEffect, useState } from "react";
import { AttractionCard, CarCard, StayCard } from "../ui/Card";
import { useSearchParams } from "next/navigation";
import { StayObject } from "@/types/stays";
import { AttractionObject } from "@/types/attraction";
import Link from "next/link";
import { CarObject } from "@/types/car";


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
    const searchParams = useSearchParams();

    // 2. Khởi tạo State
    const [results, setResults] = useState<StayObject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Lấy các tham số (chuỗi)
    const location = searchParams.get('location');
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');

    // 3. Effect để gọi API
    useEffect(() => {
        const fetchResults = async () => {
            // Chỉ tìm kiếm khi có ít nhất location
            if (!location) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            // Xây dựng URL cho API Route của Next.js
            // Tham số đã được lấy trực tiếp từ useSearchParams
            const params = searchParams.toString();

            try {
                // Gọi API Route (route.ts) của Next.js
                // Sử dụng `cache: 'no-store'` để tránh cache lặp lại 
                const res = await fetch(`/api/stays/search?${params}`, {
                    cache: 'no-store'
                });

                if (!res.ok) {
                    throw new Error(`Lỗi HTTP: ${res.status}`);
                }

                const data = await res.json();

                // Giả sử API Laravel trả về { data: [...] }
                setResults(data.results || []);
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("Lỗi khi tải dữ liệu. Vui lòng thử lại.");
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
        // Re-run effect khi chuỗi searchParams thay đổi
        // Bằng cách sử dụng searchParams.toString() thay vì từng biến riêng lẻ
    }, [searchParams.toString()]);

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

function AttractionSearchList() {
    const searchParams = useSearchParams();

    // 2. Khởi tạo State
    const [results, setResults] = useState<AttractionObject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Lấy các tham số (chuỗi)
    const location = searchParams.get('location');
    const checkdate = searchParams.get('checkdate');

    // 3. Effect để gọi API
    useEffect(() => {
        const fetchResults = async () => {
            // Chỉ tìm kiếm khi có ít nhất location
            if (!location) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            // Xây dựng URL cho API Route của Next.js
            // Tham số đã được lấy trực tiếp từ useSearchParams
            const params = searchParams.toString();

            try {
                const res = await fetch(`/api/attractions/search?${params}`, {
                    cache: 'no-store'
                });

                if (!res.ok) {
                    throw new Error(`Lỗi HTTP: ${res.status}`);
                }

                const data = await res.json();

                // Giả sử API Laravel trả về { data: [...] }
                setResults(data.results || []);
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("Lỗi khi tải dữ liệu. Vui lòng thử lại.");
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
        // Re-run effect khi chuỗi searchParams thay đổi
        // Bằng cách sử dụng searchParams.toString() thay vì từng biến riêng lẻ
    }, [searchParams.toString()]);

    return (
        <div className="px-6 max-w-7xl mx-auto">
            <h1 className="text-xl font-bold mb-2 text-orange-300">
                Kết Quả Tìm Kiếm Điểm Tham Quan 
            </h1>

            <p className="mb-4 text-gray-700 flex gap-x-1">
                <Link href='/' className="text-blue-500 hover:underline">Trang chủ</Link>
                <img src="/icon/arrow-icon.png" alt=">" className="w-5 h-5"/>
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

function CarsListSearch() {
    const searchParams = useSearchParams();

    // 2. Khởi tạo State
    const [results, setResults] = useState<CarObject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Lấy các tham số (chuỗi)
    const location = searchParams.get('location');
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');

    // 3. Effect để gọi API
    useEffect(() => {
        const fetchResults = async () => {
            // Chỉ tìm kiếm khi có ít nhất location
            if (!location) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            // Xây dựng URL cho API Route của Next.js
            // Tham số đã được lấy trực tiếp từ useSearchParams
            const params = searchParams.toString();

            try {
                // Gọi API Route (route.ts) của Next.js
                // Sử dụng `cache: 'no-store'` để tránh cache lặp lại 
                const res = await fetch(`/api/cars/search?${params}`, {
                    cache: 'no-store'
                });

                if (!res.ok) {
                    throw new Error(`Lỗi HTTP: ${res.status}`);
                }

                const data = await res.json();

                // Giả sử API Laravel trả về { data: [...] }
                setResults(data.results || []);
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("Lỗi khi tải dữ liệu. Vui lòng thử lại.");
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
        // Re-run effect khi chuỗi searchParams thay đổi
        // Bằng cách sử dụng searchParams.toString() thay vì từng biến riêng lẻ
    }, [searchParams.toString()]);

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

export { StaysList, StayListSearch, AttractionSearchList, CarsListSearch };