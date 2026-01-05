import { searchService } from "@/services/searchServices"; 
import { AttractionObject } from "@/types/attraction";
import { CarObject } from "@/types/car";
import { StayObject } from "@/types/stays";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ServiceType } from "@/types/service";

type ObjectResult = StayObject | AttractionObject | CarObject;

export const useSearchingService = (service: ServiceType) => {
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
            setError(null);
            
            if (!location) {
                setIsLoading(false);
                setResults([]);
                return;
            }

            setIsLoading(true);

            try {
                const data = await searchService.search({
                    location,
                    checkIn: checkin ? new Date(checkin) : null,
                    checkOut: checkout ? new Date(checkout) : null,
                    checkDate: checkdate ? new Date(checkdate) : null,
                    service,
                    mode: "search"
                });

                setResults(data?.results || []); 
            } catch (err) {
                console.error("Fetch Error:", err);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [location, checkin, checkout, checkdate, service]); 

    return { results, isLoading, error, location, checkin, checkout, checkdate };
}