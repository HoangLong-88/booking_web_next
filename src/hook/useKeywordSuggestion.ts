// 'use client';

// import { useEffect, useRef, useState } from "react";
// import useDebounce from "@/hook/useDebounce";
// import { searchService } from "@/services/searchServices";
// import { ServiceType } from "@/types/service";

// interface UseKeywordSuggestionProps {
//   delay?: number;
//   service: ServiceType;
// }

// export function useKeywordSuggestion<T>({ delay = 200, service }: UseKeywordSuggestionProps) {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<T[]>([]);
//   const [isOpen, setIsOpen] = useState(false);

//   const debouncedQuery = useDebounce(query, delay);
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   // Fetch suggestions
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       if (!debouncedQuery) {
//         setSuggestions([]);
//         setIsOpen(false);
//         return;
//       }


//       const data = await searchService.suggest({
//         service,
//         keyword: debouncedQuery,
//         mode: "suggest"
//       })
//       setSuggestions(data);
//       setIsOpen(true);
//     }; 

//     fetchSuggestions();
//   }, [debouncedQuery]);

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const onInputChange = (value: string) => {
//     setQuery(value);
//   };

//   const onSelect = (value: string) => {
//     setQuery(value);
//     setIsOpen(false);
//   };

//   return {
//     query,
//     suggestions,
//     isOpen,
//     wrapperRef,
//     setIsOpen,
//     onInputChange,
//     onSelect
//   };
// }
