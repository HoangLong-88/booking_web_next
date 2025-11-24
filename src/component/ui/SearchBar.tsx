'use client'
import React from 'react';
import { useState, useEffect, useRef, ChangeEvent, forwardRef } from "react";
import useDebounce from '@/hook/useDebounce';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

// 1. Định nghĩa interface cho props
interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  selectedDate?: Date | null; // thêm prop mới
}

const CustomDateInput = forwardRef<HTMLButtonElement, CustomDateInputProps>(
  ({ selectedDate, onClick, placeholder }, ref) => (
    <button
      type='button'
      className="text-sm text-stone-400"
      onClick={onClick}
      ref={ref}
    >
      {selectedDate ? format(selectedDate, "dd/MM/yyyy") : placeholder}
    </button>
  )
);

const HomeSearchBar: React.FC = () => {
  return (
    <div className="relative left-1/2 -translate-x-1/2 bottom-[40px] z-20 w-[92%] md:w-[85%] max-w-6xl">
      <form className="bg-white rounded-xl shadow-2xl ring-1 ring-black/5 p-3 flex gap-3 items-center border-2 border-orange-300">
        <div className="flex-1 flex items-center gap-3">
          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 w-72 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 11V6a5 5 0 00-10 0v5M7 11h10v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6z" /></svg>
            <KeySearchBar />
          </div>

          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" /></svg>
            <DateBar />
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
            <KeySearchBar />
          </div>

          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" /></svg>
            <DateBar />
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
            <KeySearchBar />
          </div>

          <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 bg-white">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" /></svg>
            <DateBar />
          </div>
        </div>
        <button type="submit" className="px-6 py-3 rounded-lg bg-blue-600 text-white text-base shadow-md grow-0">
          Tìm
        </button>
      </form>
    </div>
  );
};


export function KeySearchBar() {
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
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => { if (suggestions.length > 0) setIsOpen(true); }}
          placeholder="Địa điểm..."
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
};

export function DateBar() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  return (
    <>
      <DatePicker
        selected={checkIn}
        onChange={setCheckIn}
        placeholderText='Ngày nhận'
        className='outline-none'
        dateFormat='dd/MM/yyyy'
        selectsStart
        customInput={<CustomDateInput placeholder='Ngày nhận' selectedDate={checkIn} />}
      />
      —
      <DatePicker
        selected={checkOut}
        onChange={setCheckOut}
        placeholderText='Ngày trả'
        dateFormat='dd/MM/yyyy'
        className='outline-none'
        selectsEnd
        customInput={<CustomDateInput placeholder='Ngày trả' selectedDate={checkOut} />}
      />
    </>
  )
}

export { HomeSearchBar, AttractionsSearchBar, CarSearchBar };