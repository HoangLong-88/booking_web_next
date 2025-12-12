import { useRef, useState, useEffect } from "react";

export function useHorizontalScroll(scrollAmount = 150) {
  const scrollRef = useRef<HTMLDivElement | null>(null); 
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    const observer = new ResizeObserver(() => updateScrollState());
    observer.observe(el);

    el.addEventListener("scroll", updateScrollState);

    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return { scrollRef, canScrollLeft, canScrollRight, scroll };
}
