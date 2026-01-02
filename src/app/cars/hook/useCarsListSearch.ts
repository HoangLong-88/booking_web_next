import { CarObject } from "@/types/car";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function getCarsFromSearching() {
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

    return ({ location, checkin, checkout, isLoading, results, error })
}
