'use client'
import React from 'react';
import { useState, useEffect, useRef, ChangeEvent, forwardRef } from "react";
import useDebounce from '@/hook/useDebounce';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

// . Định nghĩa interface cho props
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

CustomDateInput.displayName = 'CustomDateInput';

interface KeySearchProp {
  onChange?: (value: string) => void;
}

function KeySearchBar({ onChange }: KeySearchProp) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 500);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions
  useEffect(() => {
    const getSuggest = async () => {
      if (!debouncedQuery) {
        setSuggestions([]);
        return;
      }

      const res = await fetch(`/api/stays/keysearch?q=${encodeURIComponent(debouncedQuery)}`);
      const data: string[] = await res.json();
      setSuggestions(data);
      setIsOpen(true);
    };

    getSuggest();
  }, [debouncedQuery]);

  useEffect(() => {
    console.log('suggestion:', suggestions);
  }, [suggestions]);

  useEffect(() => {
    console.log('isOpen:', isOpen);
  }, [isOpen]);

  // Close outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onChange?.(e.target.value);
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    setIsOpen(false);
    onChange?.(value);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        placeholder="Địa điểm..."
        className="outline-none text-sm w-full"
      />

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white shadow-xl rounded w-full mt-1 max-h-60 overflow-auto">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-50"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


interface DateBarProps {
  onCheckInChange?: (date: Date | null) => void;
  onCheckOutChange?: (date: Date | null) => void;
}

function DateBar({ onCheckInChange, onCheckOutChange }: DateBarProps) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  return (
    <>
      <DatePicker
        selected={checkIn}
        onChange={(date) => {
          setCheckIn(date);
          onCheckInChange?.(date);
        }}
        placeholderText='Ngày nhận'
        className='outline-none'
        dateFormat='dd/MM/yyyy'
        selectsStart
        customInput={<CustomDateInput placeholder='Ngày nhận' selectedDate={checkIn} />}
      />
      —
      <DatePicker
        selected={checkOut}
        onChange={(date) => {
          setCheckOut(date);
          onCheckOutChange?.(date);
        }}
        placeholderText='Ngày trả'
        dateFormat='dd/MM/yyyy'
        className='outline-none'
        selectsEnd
        customInput={<CustomDateInput placeholder='Ngày trả' selectedDate={checkOut} />}
      />
    </>
  )
}

export { KeySearchBar, DateBar }