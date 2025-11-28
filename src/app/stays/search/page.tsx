'use client'
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";


// export default function SearchResult(){
//     const params = useSearchParams();
//     const router = useRouter();

//     const [results, setResults] = useState([]);
//     const location = params.get('location');
//     const checkin = params.get('checkin');
//     const checkout = params.get('checkout');

//     useEffect(() => {
//     fetch(
//       `http://your-backend.com/api/hotels/search?location=${location}&checkin=${checkin}&checkout=${checkout}`
//     )
//       .then((res) => res.json())
//       .then((data) => setResults(data.data));
//   }, []);

//   return (
//     <div className="p-6 space-y-6">
//       {results.map((item) => (
//         <div key={item.id} className="flex gap-4 border p-4 rounded-lg shadow">
//           <img src={item.image} className="w-64 h-48 rounded object-cover" />

//           <div className="flex-1 space-y-2">
//             <h2 className="text-2xl font-semibold">{item.name}</h2>
//             <p className="text-gray-600">{item.location}</p>
//             <p className="text-blue-600 text-xl font-bold">
//               {item.price.toLocaleString()} đ / đêm
//             </p>

//             <button
//               onClick={() => router.push(`/booking?id=${item.id}&checkin=${checkin}&checkout=${checkout}&guest=${guest}`)}
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Đặt ngay
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

export default function searchStaysPage(){
    return(
        <p className="mt-50">Hello</p>
    );
}