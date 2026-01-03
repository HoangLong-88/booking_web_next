// import { buildSearchParams } from "@/utils/searchParams";
// import { SearchParams, SuggestParams } from "@/types/search";

import { toLocalDateString } from "@/utils/date";

// const fetcher = async (url: string) => {
//   const res = await fetch(url, {
//     method: "GET",
//     cache: "no-store",
//     next: { revalidate: 0 }
//   });

//   if (!res.ok) {
//     throw new Error(`HTTP error: ${res.status}`);
//   }


export const searchServices = {
  LocationAndDuelDates: async ({
    location,
    checkIn,
    checkOut,
    service
  }: {
    location: string;
    checkIn: Date | null;
    checkOut: Date | null;
    service: string;
  }) => {

    const params = new URLSearchParams();

    if (location) params.append("q", location);
    if (checkIn) params.append("checkin", toLocalDateString(checkIn));
    if (checkOut) params.append("checkout", toLocalDateString(checkOut));

    const res = await fetch(
      `/api/${service}/search?${params.toString()}`,
      {
        method: 'GET',
        cache: 'no-store',
        next: { revalidate: 0 }
      } // tránh lỗi cache
    );
    return res.json();
  },

  LocationAndSingleDate: async ({
    location,
    checkDate,
    service
  }: {
    location: string;
    checkDate: Date | null;
    service: string;
  }) => {

    const params = new URLSearchParams();

    if (location) params.append("loc", location);
    if (checkDate) params.append("checkdate", checkDate.toISOString().split("T")[0]);

    const res = await fetch(
      `/api/${service}/search?${params.toString()}`,
      {
        method: 'GET',
        cache: 'no-store',
        next: { revalidate: 0 }
      } // tránh lỗi cache
    );
    return res.json();
  },
}

// export const searchService = {
//   search: async (params: SearchParams) => {
//     const query = buildSearchParams(params);
//     return fetcher(`/api/${params.service}/search?${query.toString()}`);
//   },

//   suggest: async (params: SuggestParams) => {
//     const query = buildSearchParams(params);
//     return fetcher(`/api/${params.service}/suggest?${query.toString()}`);
//   }
// };
