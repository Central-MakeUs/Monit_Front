'use client';

import { useMemo, useState } from 'react';
import { generateWeeklyDates, addDays, subDays, isCurrentWeek } from '@/shared/ui/calendar/lib';
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
    // 현재 주에서는 다음 주로 이동 방지
    if (isCurrentWeek(internalCurrentDate)) {
      return;
    }
    const newDate = addDays(internalCurrentDate, 7);
    setInternalCurrentDate(newDate);
    onWeekChange?.(newDate);

    if (effectiveSelectedDate) {
      const newSelectedDate = addDays(effectiveSelectedDate, 7);
      setInternalSelectedDate(newSelectedDate);
      onDateSelect?.(newSelectedDate);
    }
  };

  // 현재 주인지 확인
  const isNextWeekDisabled = isCurrentWeek(internalCurrentDate);

  const carousel = useWeeklyCarousel({
    dates,
    onSwipeLeft: handleNextWeek,
    onSwipeRight: handlePrevWeek,
    disableNext: isNextWeekDisabled,
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
