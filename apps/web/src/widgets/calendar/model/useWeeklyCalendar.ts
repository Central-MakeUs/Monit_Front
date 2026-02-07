'use client';

import { useMemo, useState, useEffect } from 'react';
import { generateWeeklyDates, addDays, subDays, isCurrentWeek } from '@/shared/lib/calendar';
import { useWeeklyCarousel } from '@/features/calendarCarousel';

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

  // currentDate prop이 변경되면 internalCurrentDate 업데이트
  // 월이 변경된 경우 selectedDate가 포함된 주로 이동
  useEffect(() => {
    const currentMonth = internalCurrentDate.getMonth();
    const currentYear = internalCurrentDate.getFullYear();
    const newMonth = currentDate.getMonth();
    const newYear = currentDate.getFullYear();

    // 월이나 연도가 변경된 경우
    if (currentMonth !== newMonth || currentYear !== newYear) {
      // selectedDate가 있으면 그 날짜를 기준으로, 없으면 currentDate를 기준으로 설정
      const baseDate = effectiveSelectedDate || currentDate;
      setInternalCurrentDate(baseDate);
    }
  }, [currentDate, internalCurrentDate, effectiveSelectedDate]);

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
