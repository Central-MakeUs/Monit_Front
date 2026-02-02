'use client';

import React from 'react';
import { useWeeklyCarousel } from './model/useWeeklyCarousel';
import { WeeklyHeader } from './ui/WeeklyHeader';
import { WeeklyCarousel } from './ui/WeeklyCarousel';
import type { CalendarDate } from './lib';

interface WeeklyCalendarGridProps {
  dates: CalendarDate[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export const WeeklyCalendarGrid = ({
  dates,
  selectedDate,
  onDateSelect,
  onSwipeLeft,
  onSwipeRight,
}: WeeklyCalendarGridProps) => {
  const carousel = useWeeklyCarousel({
    dates,
    onSwipeLeft,
    onSwipeRight,
  });

  return (
    <div>
      <WeeklyHeader currentWeek={carousel.currentWeek} selectedDate={selectedDate} />
      <WeeklyCarousel
        prevWeek={carousel.prevWeek}
        currentWeek={carousel.currentWeek}
        nextWeek={carousel.nextWeek}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
        trackRef={carousel.trackRef}
        handlers={carousel.handlers}
        transform={carousel.getTransform()}
        transition={carousel.getTransition()}
        onTransitionEnd={carousel.handleTransitionEnd}
      />
    </div>
  );
};
