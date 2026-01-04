import { useState, useEffect, useRef, ChangeEvent, forwardRef } from "react";
import { format } from "date-fns";

interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  selectedDate?: Date | null;
}

export const CustomDateInput = forwardRef<HTMLButtonElement, CustomDateInputProps>(
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