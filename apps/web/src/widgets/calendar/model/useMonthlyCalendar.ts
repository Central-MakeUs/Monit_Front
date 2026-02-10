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
  onDateSelect?: (date: Date | null) => void;
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

    // 선택된 날짜가 있다면 동일한 일자로 유지 (예: 2월 1일 -> 1월 1일)
    if (effectiveSelectedDate) {
      // 스와이프 시작 시 즉시 선택 상태 초기화 (깜빡임 방지)
      setInternalSelectedDate(null);
      onDateSelect?.(null); // 선택 해제

      // 애니메이션이 완전히 끝난 후 새로운 날짜 선택
      setTimeout(() => {
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const day = effectiveSelectedDate.getDate();

        // 해당 월의 마지막 날짜를 확인하여 유효한 날짜 생성
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const validDay = Math.min(day, lastDayOfMonth);
        const targetDate = new Date(year, month, validDay);

        const validDate = ensureNotFutureDate(targetDate);
        setInternalSelectedDate(validDate);
        onDateSelect?.(validDate);
      }, 400); // 애니메이션 시간(300ms) + 여유(100ms)
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

    // 선택된 날짜가 있다면 동일한 일자로 유지 (예: 1월 1일 -> 2월 1일)
    if (effectiveSelectedDate) {
      // 스와이프 시작 시 즉시 선택 상태 초기화 (깜빡임 방지)
      setInternalSelectedDate(null);
      onDateSelect?.(null); // 선택 해제

      // 애니메이션이 완전히 끝난 후 새로운 날짜 선택
      setTimeout(() => {
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const day = effectiveSelectedDate.getDate();

        // 해당 월의 마지막 날짜를 확인하여 유효한 날짜 생성
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const validDay = Math.min(day, lastDayOfMonth);
        const targetDate = new Date(year, month, validDay);

        const validDate = ensureNotFutureDate(targetDate);
        setInternalSelectedDate(validDate);
        onDateSelect?.(validDate);
      }, 400); // 애니메이션 시간(300ms) + 여유(100ms)
    }
  };

  const formattedMonth = formatYearMonth(internalCurrentDate);

  // 다음 달이 미래인지 확인
  const isNextMonthDisabled = isAfterCurrentMonth(addMonths(internalCurrentDate, 1));

  const carousel = useMonthlyCarousel({
    dates,
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
