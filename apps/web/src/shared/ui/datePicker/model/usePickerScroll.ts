import { useRef, useEffect } from 'react';

interface UsePickerScrollProps {
  selectedIndex: number;
  itemHeightRem?: number;
  onChange: (index: number) => void;
  itemsCount: number;
  isIndexDisabled?: (index: number) => boolean;
}

export function usePickerScroll({
  selectedIndex,
  itemHeightRem = 4,
  onChange,
  itemsCount,
  isIndexDisabled,
}: UsePickerScrollProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const isInternalScroll = useRef(false);
  const itemHeightPx = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(false);

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
      // 첫 렌더링 시에는 애니메이션 없이, 이후에는 smooth 애니메이션
      const behavior = isMounted.current ? 'smooth' : 'auto';
      listRef.current.scrollTo({ top: targetScrollTop, behavior: behavior as ScrollBehavior });
      isMounted.current = true;
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

      // 가장 가까운 아이템으로 스냅
      const targetScrollTop = index * itemHeightPx.current;
      if (Math.abs(scrollTop - targetScrollTop) > 1) {
        listRef.current!.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
      }

      // 범위 체크
      if (index < 0 || index >= itemsCount) return;

      // disabled 체크
      if (isIndexDisabled && isIndexDisabled(index)) {
        return;
      }

      if (index !== selectedIndex) {
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
