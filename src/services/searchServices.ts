export const searchStays = async ({
  location,
  checkIn,
  checkOut,
  router
}: {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  router: any;
}) => {

  const params = new URLSearchParams();

  if (location) params.append("location", location);
  if (checkIn) params.append("checkin", checkIn.toISOString().split("T")[0]);
  if (checkOut) params.append("checkout", checkOut.toISOString().split("T")[0]);

  const res = await fetch(
    `/api/stays/search?${params.toString()}`,
    { 
      method: 'GET',
      cache: 'no-store',
      next: { revalidate: 0 }
    } // tránh lỗi cache
);
  return res.json();
};
