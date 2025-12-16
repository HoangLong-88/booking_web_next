import { HorizontalScrollView } from "./HorizontalScrollView";
import { useHorizontalScroll } from "@/utils/dom/useHorizontalScroll";

interface TagsArrowScrollProps {
  children: React.ReactNode;
  scrollAmount?: number;
}

export default function TagsArrowScroll({
  children,
  scrollAmount,
}: TagsArrowScrollProps) {
  const { scrollRef, canScrollLeft, canScrollRight, scroll } =
    useHorizontalScroll(scrollAmount);

  return (
    <HorizontalScrollView
      scrollRef={scrollRef}
      canScrollLeft={canScrollLeft}
      canScrollRight={canScrollRight}
      scroll={scroll}
    >
      {children}
    </HorizontalScrollView>
  );
}
