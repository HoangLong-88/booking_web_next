export const searchStays = async ({
  location,
  checkIn,
  checkOut
}: {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
}) => {

  const params = new URLSearchParams();

  if (location) params.append("location", location);
  if (checkIn) params.append("checkin", checkIn.toISOString().split("T")[0]);
  if (checkOut) params.append("checkout", checkOut.toISOString().split("T")[0]);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stays/search?${params}`);

  return res.json();
};
