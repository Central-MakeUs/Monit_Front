/**
 * @module features/calendar-carousel
 * @description 월간 캘린더 캐러셀 기능
 * FSD: features layer - 스와이프로 월 이동 기능
 */

'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import {
  generateCalendarDates,
  subMonths,
  addMonths,
  SWIPE_THRESHOLD_RATIO,
} from '@/shared/lib/calendar';
import type { CalendarDate } from '@/shared/lib/calendar';

interface UseMonthlyCarouselProps {
  dates: CalendarDate[];
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  disableNext?: boolean;
}

export interface UseMonthlyCarouselReturn {
  currentMonth: CalendarDate[];
  prevMonth: CalendarDate[];
  nextMonth: CalendarDate[];
  dragOffset: number;
  isDragging: boolean;
  isTransitioning: boolean;
  trackRef: React.RefObject<HTMLDivElement | null>;
  handlers: ReturnType<typeof useSwipeable>;
  handleTransitionEnd: () => void;
  getTransform: () => string;
  getTransition: () => string;
  containerHeight: number;
  shouldTransitionHeight: boolean;
}

export const useMonthlyCarousel = ({
  dates,
  onSwipeLeft,
  onSwipeRight,
  disableNext = false,
}: UseMonthlyCarouselProps): UseMonthlyCarouselReturn => {
  const [currentMonth, setCurrentMonth] = useState(dates);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const pendingActionRef = useRef<'left' | 'right' | null>(null);

  // dates(부모의 데이터)가 변경되면 내부 상태 동기화 및 애니메이션 종료 처리
  useEffect(() => {
    // 이전 데이터와 다를 경우에만 처리 (불필요한 리셋 방지)
    if (JSON.stringify(dates) !== JSON.stringify(currentMonth)) {
      setCurrentMonth(dates);

      // 데이터가 변경되었으므로 애니메이션 상태 리셋
      if (isTransitioning) {
        setIsTransitioning(false);
        setDragOffset(0);
        pendingActionRef.current = null;
      }
    }
  }, [dates, currentMonth, isTransitioning]);

  // 안전장치: 애니메이션이 끝났는데 데이터가 너무 오래 안 바뀌면 강제로 리셋 (예: 이동 불가)
  useEffect(() => {
    if (isTransitioning && pendingActionRef.current) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setDragOffset(0);
        pendingActionRef.current = null;
      }, 500); // 300ms (애니메이션) + 200ms (여유)

      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const { prevMonth, nextMonth } = useMemo(() => {
    // currentMonth의 첫 번째 날짜를 기준으로 이전/다음 달 계산
    // currentDate prop에 의존하면 부모 데이터 변경 시 즉시 반영되어
    // 애니메이션 도중에 내용이 바뀌는 깜빡임 현상 발생함
    const baseDate = currentMonth[15]?.date || new Date(); // 중간쯤 날짜를 안전하게 선택

    return {
      prevMonth: generateCalendarDates(subMonths(baseDate, 1)),
      nextMonth: generateCalendarDates(addMonths(baseDate, 1)),
    };
  }, [currentMonth]);

  // 클라이언트에서 실제 너비와 높이 측정
  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current) {
        const containerWidth = trackRef.current.parentElement?.offsetWidth || 0;
        setSlideWidth(containerWidth);

        // 가운데 슬라이드(현재 보이는 슬라이드)의 높이 측정
        const slides = trackRef.current.children;
        if (slides.length >= 2) {
          const currentSlide = slides[1] as HTMLElement; // 가운데 슬라이드 (index 1)
          const slideHeight = currentSlide.offsetHeight;
          setContainerHeight((prevHeight) => {
            if (prevHeight !== slideHeight) {
              return slideHeight;
            }
            return prevHeight;
          });
        }
      }
    };

    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // currentMonth가 변경될 때마다 높이 재측정
  useEffect(() => {
    const updateHeight = () => {
      if (trackRef.current) {
        const slides = trackRef.current.children;
        if (slides.length >= 2) {
          const currentSlide = slides[1] as HTMLElement;
          const slideHeight = currentSlide.offsetHeight;
          // 높이가 실제로 변경된 경우에만 업데이트
          setContainerHeight((prevHeight) => {
            if (prevHeight !== slideHeight) {
              return slideHeight;
            }
            return prevHeight;
          });
        }
      }
    };

    // DOM 업데이트 후 높이 측정을 위해 약간의 지연
    const timeoutId = setTimeout(updateHeight, 0);
    return () => clearTimeout(timeoutId);
  }, [currentMonth]);

  const handleTransitionEnd = () => {
    if (pendingActionRef.current && isTransitioning) {
      const action = pendingActionRef.current;

      // 상태 업데이트를 여기서 즉시 하지 않고 콜백만 호출하여 부모의 데이터 변경을 유도함
      // 실제 상태 리셋은 위의 useEffect([dates])에서 처리됨
      if (action === 'left') {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (!isTransitioning && slideWidth > 0) {
        setIsDragging(true);
        const delta = eventData.deltaX;
        const clampedOffset =
          disableNext && delta < 0
            ? Math.max(0, Math.min(slideWidth, delta))
            : Math.max(-slideWidth, Math.min(slideWidth, delta));
        setDragOffset(clampedOffset);
      }
    },
    onSwiped: (eventData) => {
      // 전환 중이면 새로운 스와이프 무시
      if (isTransitioning) {
        return;
      }

      const delta = eventData.deltaX;
      setIsDragging(false);

      if (slideWidth > 0) {
        const swipeThreshold = slideWidth * SWIPE_THRESHOLD_RATIO;

        if (delta < -swipeThreshold && !disableNext) {
          setIsTransitioning(true);
          pendingActionRef.current = 'left';
          setDragOffset(-slideWidth);
          // 콜백은 handleTransitionEnd에서 호출
        } else if (delta > swipeThreshold) {
          setIsTransitioning(true);
          pendingActionRef.current = 'right';
          setDragOffset(slideWidth);
          // 콜백은 handleTransitionEnd에서 호출
        } else {
          setDragOffset(0);
        }
      } else {
        setDragOffset(0);
      }
    },
    trackMouse: true,
    trackTouch: true,
    delta: 10,
    preventScrollOnSwipe: true,
  });

  const getTransform = () => `translateX(calc(-${slideWidth}px + ${dragOffset}px))`;

  const getTransition = () => {
    const shouldTransition = isTransitioning || (!isDragging && dragOffset !== 0);
    return shouldTransition ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
  };

  return {
    currentMonth,
    prevMonth,
    nextMonth,
    dragOffset,
    isDragging,
    isTransitioning,
    trackRef,
    handlers,
    handleTransitionEnd,
    getTransform,
    getTransition,
    containerHeight,
    shouldTransitionHeight: !isDragging && !isTransitioning,
  };
};
