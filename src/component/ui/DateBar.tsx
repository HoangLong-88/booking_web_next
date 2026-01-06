'use client'
import DatePicker from "react-datepicker"; 
import { useState } from "react";
import { CustomDateInput } from "./CustomDateInput";
import { useTranslation } from "react-i18next";
import { datePickerLocales } from "@/locales/datePickerLocales";

interface DateRangePickerProps {
  onCheckInChange?: (date: Date | null) => void;
  onCheckOutChange?: (date: Date | null) => void;
}
interface SingleDatePickerProps {
  onCheckDateChange?: (date: Date | null) => void;
}
export function DateBarRangePicker({ onCheckInChange, onCheckOutChange }: DateRangePickerProps) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
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
export function DateBarSinglePicker({ onCheckDateChange }: SingleDatePickerProps) {
  const [checkDate, setCheckDate] = useState<Date | null>(null);
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