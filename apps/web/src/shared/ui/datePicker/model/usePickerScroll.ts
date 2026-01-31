import { useRef, useEffect } from 'react';

interface UsePickerScrollProps {
  selectedIndex: number;
  itemHeightRem?: number;
  onChange: (index: number) => void;
  itemsCount: number;
}

export function usePickerScroll({
  selectedIndex,
  itemHeightRem = 4,
  onChange,
  itemsCount,
}: UsePickerScrollProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const isInternalScroll = useRef(false);
  const itemHeightPx = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      itemHeightPx.current = fontSize * itemHeightRem;
    }
  }, [itemHeightRem]);

  useEffect(() => {
    if (listRef.current && itemHeightPx.current > 0) {
      if (isInternalScroll.current) {
        isInternalScroll.current = false;
        return;
      }
      const targetScrollTop = selectedIndex * itemHeightPx.current;
      listRef.current.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const handleScroll = () => {
    if (!listRef.current || itemHeightPx.current === 0) return;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // 민감도 조절: 스크롤이 멈춘 후(100ms)에만 변경 사항을 반영
    scrollTimeout.current = setTimeout(() => {
      const scrollTop = listRef.current!.scrollTop;
      const index = Math.round(scrollTop / itemHeightPx.current);

      if (index !== selectedIndex && index >= 0 && index < itemsCount) {
        isInternalScroll.current = true;
        onChange(index);
      }
    }, 100);
  };

  const handleClick = (index: number) => {
    if (listRef.current && itemHeightPx.current > 0) {
      const targetScrollTop = index * itemHeightPx.current;
      listRef.current.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    }
  };

  return {
    listRef,
    handleScroll,
    handleClick,
  };
}
