import useSearchParams  from "@/hook/useSearchParams";
import { DateBarRangePicker } from "../ui/DateBar";
import { KeySearchBar } from "../search/KeySearchBar";
import { CustomButton } from "../ui/Button";
import { useState } from "react";
import type { StaySuggestion } from "@/types/stays";

interface StaySearchBarProps {
  showDatePicker?: boolean
  havingSearchButton?: boolean
  className?: string
  formClassName?: string;
  keySuggestClassName?: string;
  onSelectStay?: (stay: StaySuggestion) => void;
}


export const StaySearchBar: React.FC<StaySearchBarProps> = ({ showDatePicker = true, havingSearchButton = true,
  className = "", formClassName = "", keySuggestClassName = "", onSelectStay }) => {
  const {
    setLocation,
    handleSearch,
    setCheckIn,
    setCheckOut
  } = useSearchParams('stays');
  const handleSelectStay = (item: StaySuggestion) => {
    onSelectStay?.(item); // ⭐ đẩy lên CHA
  };

  return (
    <div className={`relative left-1/2 -translate-x-1/2 bottom-[40px] z-20 w-[92%] md:w-[85%] max-w-6xl ${className}`}>
      <form className={`bg-white rounded-xl shadow-2xl ring-1 ring-black/5 p-3 flex gap-3 items-center border-2 border-orange-300 ${formClassName}`}
        onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>

        <div className="flex-1 flex items-center gap-3">
          <div className={`flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 w-72 bg-white ${formClassName}`}>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 11V6a5 5 0 00-10 0v5M7 11h10v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6z" /></svg>
            <KeySearchBar<StaySuggestion>
              service="stays"
              getValue={(item) => item.stayName}
              keySuggestClassName={keySuggestClassName}
              onChange={setLocation}
              onSelectItem={(item) => {
                handleSelectStay(item);
              }}
              renderItem={(item) => (
                <>
                  <div className="font-semibold">{item.stayName}</div>
                  <div className="text-xs text-gray-500">
                    {item.locationName}, {item.country}
                  </div>
                </>
              )}
            />
          </div>
          {showDatePicker && (
            <div className="flex grow items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 bg-white">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                />
              </svg>

              <DateBarRangePicker
                onCheckInChange={setCheckIn}
                onCheckOutChange={setCheckOut}
              />
            </div>
          )}
        </div>

        {havingSearchButton && (
          <CustomButton
            type="submit"
          >
            Tìm kiếm
          </CustomButton>
        )}
      </form>
    </div>
  );
};