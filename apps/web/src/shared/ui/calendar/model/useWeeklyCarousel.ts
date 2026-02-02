'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { generateWeeklyDates, subDays, addDays } from '../lib';
import type { CalendarDate } from '../lib';

interface UseWeeklyCarouselProps {
  dates: CalendarDate[];
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export interface UseWeeklyCarouselReturn {
  currentWeek: CalendarDate[];
  prevWeek: CalendarDate[];
  nextWeek: CalendarDate[];
  dragOffset: number;
  isDragging: boolean;
  isTransitioning: boolean;
  trackRef: React.RefObject<HTMLDivElement | null>;
  handlers: ReturnType<typeof useSwipeable>;
  handleTransitionEnd: () => void;
  getTransform: () => string;
  getTransition: () => string;
}

const SLIDE_WIDTH_REM = 39;
const SWIPE_THRESHOLD_RATIO = 0.25;

export const useWeeklyCarousel = ({
  dates,
  onSwipeLeft,
  onSwipeRight,
}: UseWeeklyCarouselProps): UseWeeklyCarouselReturn => {
  const [currentWeek, setCurrentWeek] = useState(dates);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const pendingActionRef = useRef<'left' | 'right' | null>(null);

  const getSlideWidth = (): number => {
    if (typeof window === 'undefined') return 624;
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return SLIDE_WIDTH_REM * rootFontSize;
  };

  const SLIDE_WIDTH = getSlideWidth();
  const SWIPE_THRESHOLD = SLIDE_WIDTH * SWIPE_THRESHOLD_RATIO;

  useEffect(() => {
    if (!isTransitioning && !isDragging) {
      setCurrentWeek(dates);
    }
  }, [dates, isTransitioning, isDragging]);

  const { prevWeek, nextWeek } = useMemo(() => {
    const baseDate = currentWeek[0]?.date || new Date();
    return {
      prevWeek: generateWeeklyDates(subDays(baseDate, 7)),
      nextWeek: generateWeeklyDates(addDays(baseDate, 7)),
    };
  }, [currentWeek]);

  const handleTransitionEnd = () => {
    if (pendingActionRef.current && isTransitioning) {
      setIsTransitioning(false);

      if (pendingActionRef.current === 'left') {
        setCurrentWeek(nextWeek);
        onSwipeLeft?.();
      } else {
        setCurrentWeek(prevWeek);
        onSwipeRight?.();
      }

      setDragOffset(0);
      pendingActionRef.current = null;
    }
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (!isTransitioning) {
        setIsDragging(true);
        const clampedOffset = Math.max(-SLIDE_WIDTH, Math.min(SLIDE_WIDTH, eventData.deltaX));
        setDragOffset(clampedOffset);
      }
    },
    onSwiped: (eventData) => {
      const delta = eventData.deltaX;
      setIsDragging(false);

      if (delta < -SWIPE_THRESHOLD) {
        setIsTransitioning(true);
        pendingActionRef.current = 'left';
        setDragOffset(-SLIDE_WIDTH);
      } else if (delta > SWIPE_THRESHOLD) {
        setIsTransitioning(true);
        pendingActionRef.current = 'right';
        setDragOffset(SLIDE_WIDTH);
      } else {
        setDragOffset(0);
      }
    },
    trackMouse: true,
    trackTouch: true,
    delta: 10,
    preventScrollOnSwipe: true,
  });

  const getTransform = () => `translateX(calc(-${SLIDE_WIDTH}px + ${dragOffset}px))`;

  const getTransition = () => {
    const shouldTransition = isTransitioning || (!isDragging && dragOffset !== 0);
    return shouldTransition ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
  };

  return {
    currentWeek,
    prevWeek,
    nextWeek,
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
