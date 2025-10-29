// components/hooks/useModal.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { useLockBodyScroll } from "./Scroll";

function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock scroll when modal is open
  useLockBodyScroll(isOpen);

  // Handle Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  // Optional: click outside to close
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        close();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, close]);

  return { isOpen, open, close, modalRef };
}
export { useModal };