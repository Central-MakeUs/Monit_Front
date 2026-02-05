/**
 * @module features/calendar-carousel
 * @description 주간 캘린더 캐러셀 기능
 * FSD: features layer - 스와이프로 주 이동 기능
 */

'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import {
  generateWeeklyDates,
  subDays,
  addDays,
  SWIPE_THRESHOLD_RATIO,
} from '@/shared/lib/calendar';
import type { CalendarDate } from '@/shared/lib/calendar';

interface UseWeeklyCarouselProps {
  dates: CalendarDate[];
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  disableNext?: boolean;
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

export const useWeeklyCarousel = ({
  dates,
  onSwipeLeft,
  onSwipeRight,
  disableNext = false,
}: UseWeeklyCarouselProps): UseWeeklyCarouselReturn => {
  const [currentWeek, setCurrentWeek] = useState(dates);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const pendingActionRef = useRef<'left' | 'right' | null>(null);

  const getContainerWidth = (): number => {
    const container = trackRef.current?.parentElement;
    return container?.offsetWidth ?? 0;
  };

  // 실제 컨테이너 너비를 기준으로 슬라이드 폭을 동기화 (반응형 대응)
  useEffect(() => {
    const container = trackRef.current?.parentElement;
    if (!container) return;

    const update = () => setSlideWidth(container.offsetWidth);
    update();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => update());
      ro.observe(container);
      return () => ro.disconnect();
    }

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

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
        const width = slideWidth || getContainerWidth();
        if (width <= 0) return;

        setIsDragging(true);
        const delta = eventData.deltaX;
        const clampedOffset =
          disableNext && delta < 0 ? 0 : Math.max(-width, Math.min(width, delta));
        setDragOffset(clampedOffset);
      }
    },
    onSwiped: (eventData) => {
      const width = slideWidth || getContainerWidth();
      const delta = eventData.deltaX;
      setIsDragging(false);

      if (width <= 0) {
        setDragOffset(0);
        return;
      }

      const swipeThreshold = width * SWIPE_THRESHOLD_RATIO;

      if (delta < -swipeThreshold && !disableNext) {
        setIsTransitioning(true);
        pendingActionRef.current = 'left';
        setDragOffset(-width);
      } else if (delta > swipeThreshold) {
        setIsTransitioning(true);
        pendingActionRef.current = 'right';
        setDragOffset(width);
      } else {
        setDragOffset(0);
      }
    },
    trackMouse: true,
    trackTouch: true,
    delta: 10,
    preventScrollOnSwipe: true,
  });

  // 가운데(현재 주) 슬라이드를 기준(-100%)으로, 드래그/스와이프는 px 오프셋으로 조절
  const getTransform = () => `translateX(calc(-100% + ${dragOffset}px))`;

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
