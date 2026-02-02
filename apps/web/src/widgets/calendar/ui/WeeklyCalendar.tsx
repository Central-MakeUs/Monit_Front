'use client';

import React from 'react';
import { useWeeklyCalendar } from '../model/useWeeklyCalendar';
import { WeeklyHeader } from '@/shared/ui/calendar/ui/WeeklyHeader';
import { WeeklyCarousel } from '@/shared/ui/calendar/ui/WeeklyCarousel';

interface WeeklyCalendarProps {
  currentDate: Date;
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
  onWeekChange?: (newDate: Date) => void;
}

export const WeeklyCalendar = ({
  currentDate,
  selectedDate,
  onDateSelect,
  onWeekChange,
}: WeeklyCalendarProps) => {
  const { effectiveSelectedDate, handleDateSelect, carousel } = useWeeklyCalendar({
    currentDate,
    selectedDate,
    onDateSelect,
    onWeekChange,
  });

  return (
    <div>
      <WeeklyHeader currentWeek={carousel.currentWeek} selectedDate={effectiveSelectedDate} />
      <WeeklyCarousel
        prevWeek={carousel.prevWeek}
        currentWeek={carousel.currentWeek}
        nextWeek={carousel.nextWeek}
        selectedDate={effectiveSelectedDate}
        onDateSelect={handleDateSelect}
        trackRef={carousel.trackRef}
        handlers={carousel.handlers}
        transform={carousel.getTransform()}
        transition={carousel.getTransition()}
        onTransitionEnd={carousel.handleTransitionEnd}
      />
    </div>
  );
};
