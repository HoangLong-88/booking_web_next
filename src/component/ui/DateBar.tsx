import DatePicker from "react-datepicker"; 
import { forwardRef, useState } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { datePickerLocales } from "@/locales/datePickerLocales";
import { getDateInput } from "@/hook/customUI/useDateInput";

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


interface DateBarRangeProps {
  onCheckInChange?: (date: Date | null) => void;
  onCheckOutChange?: (date: Date | null) => void;
}

export function DateBarRangePicker({ onCheckInChange, onCheckOutChange }: DateBarRangeProps) {
  const { checkIn, checkOut, setCheckIn, setCheckOut } = getDateInput();
  const { i18n } = useTranslation();
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
        locale={datePickerLocales[i18n.language] ? i18n.language : "en"}
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
        locale={datePickerLocales[i18n.language] ? i18n.language : "en"}
      />
    </>
  )
}

interface DateBarSingleProps {
  onCheckDateChange?: (date: Date | null) => void;
}

export function DateBarSinglePicker({ onCheckDateChange }: DateBarSingleProps) {
  const { checkDate, setCheckDate } = getDateInput();
  const { i18n } = useTranslation();
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
        locale={datePickerLocales[i18n.language] ? i18n.language : "en"}
      />
    </>
  )
}
