'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { generateCalendarDates, subMonths, addMonths } from '../lib';
import type { CalendarDate } from '../lib';

interface UseMonthlyCarouselProps {
  dates: CalendarDate[];
  currentDate: Date;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
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
}

const SWIPE_THRESHOLD_RATIO = 0.25;

export const useMonthlyCarousel = ({
  dates,
  currentDate,
  onSwipeLeft,
  onSwipeRight,
}: UseMonthlyCarouselProps): UseMonthlyCarouselReturn => {
  const [currentMonth, setCurrentMonth] = useState(dates);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const pendingActionRef = useRef<'left' | 'right' | null>(null);

  useEffect(() => {
    if (!isTransitioning && !isDragging) {
      setCurrentMonth(dates);
    }
  }, [dates, isTransitioning, isDragging]);

  const { prevMonth, nextMonth } = useMemo(() => {
    return {
      prevMonth: generateCalendarDates(subMonths(currentDate, 1)),
      nextMonth: generateCalendarDates(addMonths(currentDate, 1)),
    };
  }, [currentDate]);

  // 클라이언트에서 실제 너비 측정
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        const containerWidth = trackRef.current.parentElement?.offsetWidth || 0;
        setSlideWidth(containerWidth);
      }
    };

    // 초기 측정
    updateWidth();

    // resize 이벤트 리스너
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleTransitionEnd = () => {
    if (pendingActionRef.current && isTransitioning) {
      setIsTransitioning(false);

      if (pendingActionRef.current === 'left') {
        setCurrentMonth(nextMonth);
        onSwipeLeft?.();
      } else {
        setCurrentMonth(prevMonth);
        onSwipeRight?.();
      }

      setDragOffset(0);
      pendingActionRef.current = null;
    }
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (!isTransitioning && slideWidth > 0) {
        setIsDragging(true);
        const clampedOffset = Math.max(-slideWidth, Math.min(slideWidth, eventData.deltaX));
        setDragOffset(clampedOffset);
      }
    },
    onSwiped: (eventData) => {
      const delta = eventData.deltaX;
      setIsDragging(false);

      if (slideWidth > 0) {
        const swipeThreshold = slideWidth * SWIPE_THRESHOLD_RATIO;

        if (delta < -swipeThreshold) {
          setIsTransitioning(true);
          pendingActionRef.current = 'left';
          setDragOffset(-slideWidth);
        } else if (delta > swipeThreshold) {
          setIsTransitioning(true);
          pendingActionRef.current = 'right';
          setDragOffset(slideWidth);
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
  };
};
