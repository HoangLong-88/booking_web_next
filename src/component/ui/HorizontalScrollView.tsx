import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface HorizontalScrollViewProps {
  children: React.ReactNode;
  // Accept nullable ref (matches useRef<HTMLDivElement | null>(null))
  scrollRef: React.RefObject<HTMLDivElement | null>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scroll: (direction: "left" | "right") => void;
  className?: string;
}

export function HorizontalScrollView({
  children,
  scrollRef,
  canScrollLeft,
  canScrollRight,
  scroll,
  className = "",
}: HorizontalScrollViewProps) {
  return (
    <div className={`relative w-full ${className}`}>
      
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 rounded-full shadow"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      <div
        ref={scrollRef}
        className="overflow-x-auto no-scrollbar w-full"
      >
        {/* Track */}
        <div className="flex w-max gap-4 whitespace-nowrap py-2">
          {children}
        </div>
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 rounded-full shadow"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
