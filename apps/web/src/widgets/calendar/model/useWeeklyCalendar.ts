'use client';

import { useMemo, useState } from 'react';
import { generateWeeklyDates, addDays, subDays } from '@/shared/ui/calendar/lib';
import { useWeeklyCarousel } from '@/shared/ui/calendar/model';

interface UseWeeklyCalendarProps {
  currentDate: Date;
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
  onWeekChange?: (newDate: Date) => void;
}

export const useWeeklyCalendar = ({
  currentDate,
  selectedDate,
  onDateSelect,
  onWeekChange,
}: UseWeeklyCalendarProps) => {
  const [internalCurrentDate, setInternalCurrentDate] = useState<Date>(currentDate);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(null);

  const effectiveSelectedDate = selectedDate !== undefined ? selectedDate : internalSelectedDate;

  const dates = useMemo(() => {
    return generateWeeklyDates(internalCurrentDate);
  }, [internalCurrentDate]);

  const handleDateSelect = (date: Date) => {
    setInternalSelectedDate(date);
    onDateSelect?.(date);
  };

  const handlePrevWeek = () => {
    const newDate = subDays(internalCurrentDate, 7);
    setInternalCurrentDate(newDate);
    onWeekChange?.(newDate);

    if (effectiveSelectedDate) {
      const newSelectedDate = subDays(effectiveSelectedDate, 7);
      setInternalSelectedDate(newSelectedDate);
      onDateSelect?.(newSelectedDate);
    }
  };

  const handleNextWeek = () => {
    const newDate = addDays(internalCurrentDate, 7);
    setInternalCurrentDate(newDate);
    onWeekChange?.(newDate);

    if (effectiveSelectedDate) {
      const newSelectedDate = addDays(effectiveSelectedDate, 7);
      setInternalSelectedDate(newSelectedDate);
      onDateSelect?.(newSelectedDate);
    }
  };

  const carousel = useWeeklyCarousel({
    dates,
    onSwipeLeft: handleNextWeek,
    onSwipeRight: handlePrevWeek,
  });

  return {
    currentDate: internalCurrentDate,
    effectiveSelectedDate,
    dates,
    handleDateSelect,
    handlePrevWeek,
    handleNextWeek,
    carousel,
  };
};
