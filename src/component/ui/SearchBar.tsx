'use client'
import React from 'react';
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { getLocationInput } from '@/hook/customUI/useLocationInput';
import { getDateInput } from '@/hook/customUI/useDateInput';

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


interface DateBarProps {
  onCheckInChange?: (date: Date | null) => void;
  onCheckOutChange?: (date: Date | null) => void;
}

function DateBar({ onCheckInChange, onCheckOutChange }: DateBarProps) {
  const { checkIn, checkOut, setCheckIn, setCheckOut } = getDateInput();
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

interface DateBar2Props {
  onCheckDateChange?: (date: Date | null) => void;
}

function DateBar2({ onCheckDateChange }: DateBar2Props) {
  const { checkDate, setCheckDate } = getDateInput();
  return (
    <>
      <DatePicker
        selected={checkDate}
        onChange={(date) => {
          setCheckDate(date);
          onCheckDateChange?.(date);
        }}
        placeholderText='Ngày tham gia'
        className='outline-none'
        dateFormat='dd/MM/yyyy'
        customInput={<CustomDateInput placeholder='Ngày tham gia' selectedDate={checkDate} />}
      />
    </>
  )
}

export { KeySearchBar, DateBar, DateBar2 }