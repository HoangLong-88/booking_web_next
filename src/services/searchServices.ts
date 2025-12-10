const searchStays = async ({
  location,
  checkIn,
  checkOut,
}: {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
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


const searchAttractions = async ({
  location,
  checkDate,
}: {
  location: string;
  checkDate: Date | null;
}) => {

  const params = new URLSearchParams();

  if (location) params.append("location", location);
  if (checkDate) params.append("checkdate", checkDate.toISOString().split("T")[0]);

  const res = await fetch(
    `/api/attractions/search?${params.toString()}`,
    {
      method: 'GET',
      cache: 'no-store',
      next: { revalidate: 0 }
    } // tránh lỗi cache
  );
  return res.json();
}


const searchCars = async ({
  location,
  checkIn,
  checkOut,
}: {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
}) => {

  const params = new URLSearchParams();

  if (location) params.append("location", location);
  if (checkIn) params.append("checkin", checkIn.toISOString().split("T")[0]);
  if (checkOut) params.append("checkout", checkOut.toISOString().split("T")[0]);

  const res = await fetch(
    `/api/cars/search?${params.toString()}`,
    {
      method: 'GET',
      cache: 'no-store',
      next: { revalidate: 0 }
    } // tránh lỗi cache
  );
  return res.json();
};

export { searchStays, searchCars, searchAttractions };
