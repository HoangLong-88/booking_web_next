export async function POST(req: Request) {
  const { contact } = await req.json();
  const body = await req.json();
  console.log("Next.js API Route hit!", body);
  const laravelRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/otp/send-otp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact })
    }
  );
  const text = await laravelRes.text(); // luôn đọc raw response
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { success: false, message: text || "Empty response from Laravel" };
  }
  // const data = await laravelRes.json();
  console.log("Response from Laravel:", data); // <-- log response
  return Response.json(data, {
    status: laravelRes.status
  });
} 
