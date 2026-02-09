'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  generateCalendarDates,
  addMonths,
  subMonths,
  formatYearMonth,
  isAfterCurrentMonth,
  isAfterToday,
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

  // 공통 함수: 미래 날짜면 오늘로 강제 변경
  const ensureNotFutureDate = (date: Date): Date => {
    if (isAfterToday(date)) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }
    return date;
  };

  // currentDate prop이 변경되면 internalCurrentDate 업데이트
  useEffect(() => {
    setInternalCurrentDate(currentDate);
  }, [currentDate]);

  const effectiveSelectedDate = selectedDate !== undefined ? selectedDate : internalSelectedDate;

  const dates = useMemo(() => {
    return generateCalendarDates(internalCurrentDate);
  }, [internalCurrentDate]);

  const handleDateSelect = (date: Date) => {
    // 미래 날짜면 오늘로 강제 변경
    const validDate = ensureNotFutureDate(date);

    if (
      validDate.getMonth() !== internalCurrentDate.getMonth() ||
      validDate.getFullYear() !== internalCurrentDate.getFullYear()
    ) {
      setInternalCurrentDate(validDate);
      onMonthChange?.(validDate);
    }

    setInternalSelectedDate(validDate);
    onDateSelect?.(validDate);
  };

  const handlePrevMonth = () => {
    const newDate = subMonths(internalCurrentDate, 1);
    setInternalCurrentDate(newDate);
    onMonthChange?.(newDate);

    // 선택된 날짜가 미래라면 오늘로 재설정
    if (effectiveSelectedDate) {
      const validDate = ensureNotFutureDate(effectiveSelectedDate);
      setInternalSelectedDate(validDate);
      onDateSelect?.(validDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = addMonths(internalCurrentDate, 1);
    // 미래 월로 이동 방지
    if (isAfterCurrentMonth(newDate)) {
      return;
    }
    setInternalCurrentDate(newDate);
    onMonthChange?.(newDate);

    // 선택된 날짜가 미래라면 오늘로 재설정
    if (effectiveSelectedDate) {
      const validDate = ensureNotFutureDate(effectiveSelectedDate);
      setInternalSelectedDate(validDate);
      onDateSelect?.(validDate);
    }
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
