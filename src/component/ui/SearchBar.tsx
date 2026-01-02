'use client'
import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { getLocationInput } from '@/hook/customUI/useLocationInput';

interface KeySearchProp {
  onChange?: (value: string) => void;
}

export function KeySearchBar({ onChange }: KeySearchProp) {
  const { query, isOpen, suggestions, wrapperRef, setIsOpen, handleInputChange, handleSelect } = getLocationInput(onChange);
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



