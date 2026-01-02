// 'use client';

// import React from "react";
// import { useKeywordSuggestion } from "@/hook/useKeywordSuggestion";
// import { ServiceType } from "@/types/service";

// interface KeySearchProp<T> {
//   onChange?: (value: string) => void;
//   service: ServiceType;

//   getValue: (item: T) => string;
//   renderItem: (item: T) => React.ReactNode;
// }

// export function KeySearchBar<T>({ onChange, service, getValue, renderItem }: KeySearchProp<T>) {
//   const {
//     query,
//     suggestions,
//     isOpen,
//     wrapperRef,
//     setIsOpen,
//     onInputChange,
//     onSelect
//   } = useKeywordSuggestion<T>({service});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onInputChange(e.target.value);
//     onChange?.(e.target.value);
//   };

  
//   const handleSelect = (item: T) => {
//     const value = getValue(item);
//     onSelect(value);
//     onChange?.(value);
//   };

//   return (
//     <div ref={wrapperRef} className="relative w-full">
//       <input
//         type="text"
//         value={query}
//         onChange={handleChange}
//         onFocus={() => suggestions.length > 0 && setIsOpen(true)}
//         placeholder="Địa điểm..."
//         className="outline-none text-sm w-full"
//       />

//       {isOpen && suggestions.length > 0 && (
//         <ul className="
//           absolute z-10 bg-white shadow-xl rounded
//           min-w-[120%] left-1/2 -translate-x-1/2
//           mt-1 max-h-60 overflow-auto
//         ">
//           {suggestions.map((item, index) => (
//             <li
//               key={index}
//               onClick={() => handleSelect(item)}
//               className="px-4 py-2 cursor-pointer hover:bg-blue-50"
//             >
//               {renderItem(item)}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
