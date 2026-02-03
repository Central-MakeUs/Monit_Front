'use client';

import { useMemo, useState } from 'react';
import {
  generateCalendarDates,
  addMonths,
  subMonths,
  formatYearMonth,
  isAfterCurrentMonth,
} from '@/shared/lib/calendar';
import { useMonthlyCarousel } from '@/features/calendarCarousel';

interface UseMonthlyCalendarProps {
  currentDate: Date;
  selectedDate?: Date | null;
  variant: 'modal' | 'home';
  onDateSelect?: (date: Date) => void;
  onMonthChange?: (newDate: Date) => void;
}

export const useMonthlyCalendar = ({
  currentDate,
  selectedDate,
  variant,
  onDateSelect,
  onMonthChange,
}: UseMonthlyCalendarProps) => {
  const [internalCurrentDate, setInternalCurrentDate] = useState<Date>(currentDate);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(null);

  const effectiveSelectedDate = selectedDate !== undefined ? selectedDate : internalSelectedDate;

  const dates = useMemo(() => {
    return generateCalendarDates(internalCurrentDate);
  }, [internalCurrentDate]);

  const handleDateSelect = (date: Date) => {
    if (
      date.getMonth() !== internalCurrentDate.getMonth() ||
      date.getFullYear() !== internalCurrentDate.getFullYear()
    ) {
      setInternalCurrentDate(date);
      onMonthChange?.(date);
    }

    setInternalSelectedDate(date);
    onDateSelect?.(date);
  };

  const handlePrevMonth = () => {
    const newDate = subMonths(internalCurrentDate, 1);
    setInternalCurrentDate(newDate);
    onMonthChange?.(newDate);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(internalCurrentDate, 1);
    // 미래 월로 이동 방지
    if (isAfterCurrentMonth(newDate)) {
      return;
    }
    setInternalCurrentDate(newDate);
    onMonthChange?.(newDate);
  };

  const formattedMonth = formatYearMonth(internalCurrentDate);

  // 다음 달이 미래인지 확인
  const isNextMonthDisabled = isAfterCurrentMonth(addMonths(internalCurrentDate, 1));

  const carousel = useMonthlyCarousel({
    dates,
    currentDate: internalCurrentDate,
    onSwipeLeft: handleNextMonth,
    onSwipeRight: handlePrevMonth,
    disableNext: isNextMonthDisabled,
  });

  return {
    currentDate: internalCurrentDate,
    effectiveSelectedDate,
    dates,
    formattedMonth,
    handleDateSelect,
    handlePrevMonth,
    handleNextMonth,
    isNextMonthDisabled,
    carousel: variant === 'home' ? carousel : null,
  };
};
