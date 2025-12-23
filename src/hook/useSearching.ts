import { searchService } from "@/services/searchServices"; // Giả định đường dẫn
import { AttractionObject } from "@/types/attraction";
import { CarObject } from "@/types/car";
import { StayObject } from "@/types/stays";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ObjectResult = StayObject | AttractionObject | CarObject;

export const useSearchingService = (service: string) => {
    const searchParams = useSearchParams();

    const [results, setResults] = useState<ObjectResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const location = searchParams.get('location');  
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const checkdate = searchParams.get('checkdate');

    useEffect(() => {
        const fetchResults = async () => {
            // Reset state mỗi khi params thay đổi để UX mượt hơn
            setError(null);
            
            if (!location) {
                setIsLoading(false);
                setResults([]); // Nên reset results về rỗng nếu không có location
                return;
            }

            setIsLoading(true);

            try {
                const data = await searchService({
                    location,
                    checkIn: checkin ? new Date(checkin) : null,
                    checkOut: checkout ? new Date(checkout) : null,
                    checkDate: checkdate ? new Date(checkdate) : null,
                    service
                });

                // Kiểm tra kỹ cấu trúc trả về
                setResults(data?.results || []); 
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("Lỗi khi tải dữ liệu.");
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [location, checkin, checkout, checkdate, service]); 

    return { results, isLoading, error, location, checkin, checkout, checkdate };
}