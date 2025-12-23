const formatDate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
};

const searchService = async ({
    location, checkIn, checkOut, checkDate, service
}: {
    location: string;
    checkIn: Date | null;
    checkOut: Date | null;
    checkDate: Date | null;
    service: string;
}) => {
    const params = new URLSearchParams();

    // Logic chung: Luôn cần location
    if (location) params.append("location", location);

    // Logic riêng cho từng loại service
    if (service === 'stays' || service === 'cars') {
        if (checkIn) params.append("checkin", formatDate(checkIn));
        if (checkOut) params.append("checkout", formatDate(checkOut));
    } else if (service === 'attractions') {
        // Attractions dùng checkDate nhưng map vào query 'checkin' (theo code cũ của bạn)
        if (checkDate) params.append("checkin", formatDate(checkDate));
    } else {
        // Bảo vệ trường hợp service không hợp lệ
        return { results: [] };
    }

    // Gọi fetch (Code chung cho cả 2 trường hợp -> Đỡ lặp code)
    const res = await fetch(
        `/api/${service}/search?${params.toString()}`,
        {
            method: 'GET',
            cache: 'no-store',
            next: { revalidate: 0 }
        }
    );

    if (!res.ok) {
        throw new Error(`HTTP status error: ${res.status}`);
    }

    return res.json();
};

// const searchAttractions = async ({
//   location,
//   checkDate,
// }: {
//   location: string;
//   checkDate: Date | null;
// }) => {

//   const params = new URLSearchParams();

//   if (location) params.append("location", location);
//   if (checkDate) params.append("checkdate", checkDate.toISOString().split("T")[0]);

//   const res = await fetch(
//     `/api/attractions/search?${params.toString()}`,
//     {
//       method: 'GET',
//       cache: 'no-store',
//       next: { revalidate: 0 }
//     } // tránh lỗi cache
//   );
//   return res.json();
// }


// const searchCars = async ({
//   location,
//   checkIn,
//   checkOut,
// }: {
//   location: string;
//   checkIn: Date | null;
//   checkOut: Date | null;
// }) => {

//   const params = new URLSearchParams();

//   if (location) params.append("location", location);
//   if (checkIn) params.append("checkin", checkIn.toISOString().split("T")[0]);
//   if (checkOut) params.append("checkout", checkOut.toISOString().split("T")[0]);

//   const res = await fetch(
//     `/api/cars/search?${params.toString()}`,
//     {
//       method: 'GET',
//       cache: 'no-store',
//       next: { revalidate: 0 }
//     } // tránh lỗi cache
//   );
//   return res.json();
// };

export { searchService };