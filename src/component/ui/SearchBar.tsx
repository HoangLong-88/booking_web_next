'use client'
import React from 'react';
import { useState, useEffect, useRef, ChangeEvent } from "react";
import useDebounce from '@/hook/useDebounce';

const HomeSearchBar: React.FC = () => {
  return (
    <div className="relative left-1/2 -translate-x-1/2 bottom-[40px] z-20 w-[92%] md:w-[85%] max-w-6xl">
      <form className="bg-white rounded-xl shadow-2xl ring-1 ring-black/5 p-3 flex gap-3 items-center border-2 border-orange-300">
        <div className="flex-1 flex items-center gap-3">
          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 w-72 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 11V6a5 5 0 00-10 0v5M7 11h10v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6z" /></svg>
            {/* <input className="w-full text-sm outline-none" placeholder="Where are you going" /> */}
            <SearchBar />
          </div>

          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" /></svg>
            <input className="w-full text-sm outline-none" placeholder="Check in date — Check out date" />
          </div>

          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.81.63 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <input className="w-full text-sm outline-none" placeholder="2 người lớn · 0 trẻ em · 1 phòng" />
          </div>

        </div>

        <button type="submit" className="px-6 py-3 rounded-lg bg-blue-600 text-white text-base shadow-md">
          Tìm
        </button>
      </form>
    </div>
  );
};


const AttractionsSearchBar: React.FC = () => {
  return (
    <div className="relative left-1/2 -translate-x-1/2 bottom-[40px] z-20 w-[92%] md:w-[85%] max-w-6xl">
      <form className="bg-white rounded-xl shadow-2xl ring-1 ring-black/5 p-3 flex gap-3 items-center border-2 border-orange-300">
        <div className="flex-1 flex items-center gap-3">
          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 w-72 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 11V6a5 5 0 00-10 0v5M7 11h10v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6z" /></svg>
            {/* <input className="w-full text-sm outline-none" placeholder="Where are you going" /> */}
            <SearchBar />
          </div>

          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" /></svg>
            <input className="w-full text-sm outline-none" placeholder="Check in date — Check out date" />
          </div>
        </div>
        <button type="submit" className="px-6 py-3 rounded-lg bg-blue-600 text-white text-base shadow-md grow-0">
          Tìm
        </button>
      </form>
    </div>
  );
};


const CarSearchBar: React.FC = () => {
  return (
    <div className="relative left-1/2 -translate-x-1/2 bottom-[40px] z-20 w-[92%] md:w-[85%] max-w-6xl">
      <form className="bg-white rounded-xl shadow-2xl ring-1 ring-black/5 p-3 flex gap-3 items-center border-2 border-orange-300">
        <div className="flex-1 flex items-center gap-3">
          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 w-72 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 11V6a5 5 0 00-10 0v5M7 11h10v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6z" /></svg>
            {/* <input className="w-full text-sm outline-none" placeholder="Where are you going" /> */}
            <SearchBar />
          </div>

          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" /></svg>
            <input className="w-full text-sm outline-none" placeholder="Check in date — Check out date" />
          </div>
        </div>
        <button type="submit" className="px-6 py-3 rounded-lg bg-blue-600 text-white text-base shadow-md grow-0">
          Tìm
        </button>
      </form>
    </div>
  );
};


export default function SearchBar() {
  // State definitions
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]); // Type as array of strings
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedQuery = useDebounce<string>(query, 500);
  const wrapperRef = useRef<HTMLDivElement>(null); // Type the ref as a Div

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${debouncedQuery}`);
        // Ideally, you would define a type for your API response here
        const data: string[] = await res.json();
        setSuggestions(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full h-5">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => { if (suggestions.length > 0) setIsOpen(true); }}
          placeholder="Địa điểm..."
          // className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          className='outline-none text-sm w-full'
        />

        {loading && (
          <div className="absolute right-3 top-1">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-gray-700 transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { HomeSearchBar, AttractionsSearchBar, CarSearchBar };