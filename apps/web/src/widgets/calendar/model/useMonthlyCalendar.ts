'use client';

import { useMemo, useState } from 'react';
import {
  generateCalendarDates,
  addMonths,
  subMonths,
  formatYearMonth,
} from '@/shared/ui/calendar/lib';

interface UseMonthlyCalendarProps {
  currentDate: Date;
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
  onMonthChange?: (newDate: Date) => void;
}

export const useMonthlyCalendar = ({
  currentDate,
  selectedDate,
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
    setInternalCurrentDate(newDate);
    onMonthChange?.(newDate);
  };

  const formattedMonth = formatYearMonth(internalCurrentDate);

  return {
    currentDate: internalCurrentDate,
    effectiveSelectedDate,
    dates,
    formattedMonth,
    handleDateSelect,
    handlePrevMonth,
    handleNextMonth,
  };
};
