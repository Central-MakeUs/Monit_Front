'use client';

import { useMemo, useState } from 'react';
import {
  generateCalendarDates,
  generateWeeklyDates,
  addMonths,
  subMonths,
  addDays,
  subDays,
  formatYearMonth,
} from '@/shared/ui/calendar/lib/calendarUtils';

interface UseCalendarProps {
  /** 초기 표시 날짜. 기본값: 오늘 */
  currentDate?: Date;
  /** 선택된 날짜. 제어 컴포넌트로 사용 시 지정 */
  selectedDate?: Date | null;
  /** 캘린더 뷰 모드. 'monthly': 월간, 'weekly': 주간 */
  viewMode?: 'monthly' | 'weekly';
  /** 날짜 선택 시 호출될 콜백 */
  onDateSelect?: (date: Date) => void;
  /** 주 변경 시 호출될 콜백 (주간 모드) */
  onWeekChange?: (newDate: Date) => void;
  /** 월 변경 시 호출될 콜백 (월간 모드) */
  onMonthChange?: (newDate: Date) => void;
}

/**
 * 캘린더 상태 및 네비게이션을 관리하는 커스텀 훅
 *
 * @description
 * 월간/주간 뷰 모드를 지원하며, 날짜 선택 및 이전/다음 이동 기능을 제공합니다.
 * 제어 컴포넌트와 비제어 컴포넌트 모두 지원합니다.
 *
 * @example
 * ```tsx
 * // 비제어 컴포넌트 (내부 상태 관리)
 * const calendar = useCalendar({
 *   viewMode: 'weekly',
 *   onDateSelect: (date) => console.log(date),
 * });
 *
 * // 제어 컴포넌트 (외부 상태 관리)
 * const [selected, setSelected] = useState(new Date());
 * const calendar = useCalendar({
 *   selectedDate: selected,
 *   onDateSelect: setSelected,
 * });
 * ```
 */

export const useCalendar = ({
  currentDate = new Date(),
  selectedDate,
  viewMode = 'monthly',
  onDateSelect,
  onWeekChange,
  onMonthChange,
}: UseCalendarProps) => {
  const [internalCurrentDate, setInternalCurrentDate] = useState<Date>(currentDate);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(null);

  // 제어 컴포넌트인 경우 외부 상태 사용, 아니면 내부 상태 사용
  const effectiveSelectedDate = selectedDate !== undefined ? selectedDate : internalSelectedDate;

  // viewMode에 따라 적절한 날짜 배열 생성
  const dates = useMemo(() => {
    if (viewMode === 'weekly') {
      return generateWeeklyDates(internalCurrentDate);
    }
    return generateCalendarDates(internalCurrentDate);
  }, [internalCurrentDate, viewMode]);

  const handleDateSelect = (date: Date) => {
    if (
      date.getMonth() !== internalCurrentDate.getMonth() ||
      date.getFullYear() !== internalCurrentDate.getFullYear()
    ) {
      setInternalCurrentDate(date);

      if (viewMode === 'weekly') {
        onWeekChange?.(date);
      } else {
        onMonthChange?.(date);
      }
    }

    setInternalSelectedDate(date);
    onDateSelect?.(date);
  };

  const handlePrevMonth = () => {
    setInternalCurrentDate((prev) => {
      const newDate = subMonths(prev, 1);
      onMonthChange?.(newDate);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setInternalCurrentDate((prev) => {
      const newDate = addMonths(prev, 1);
      onMonthChange?.(newDate);
      return newDate;
    });
  };

  const handlePrevWeek = () => {
    setInternalCurrentDate((prev) => {
      const newDate = subDays(prev, 7);
      onWeekChange?.(newDate);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setInternalCurrentDate((prev) => {
      const newDate = addDays(prev, 7);
      onWeekChange?.(newDate);
      return newDate;
    });
  };

  const formattedMonth = formatYearMonth(internalCurrentDate);

  return {
    /** 현재 표시 중인 날짜 */
    currentDate: internalCurrentDate,
    /** 실제로 선택된 날짜 (제어/비제어 고려) */
    effectiveSelectedDate,
    /** 캘린더에 표시할 날짜 배열 */
    dates,
    /** 포맷된 년월 문자열 (예: "2024년 1월") */
    formattedMonth,
    /** 날짜 선택 핸들러 */
    handleDateSelect,
    /** 이전 달로 이동 (월간 모드) */
    handlePrevMonth,
    /** 다음 달로 이동 (월간 모드) */
    handleNextMonth,
    /** 이전 주로 이동 (주간 모드) */
    handlePrevWeek,
    /** 다음 주로 이동 (주간 모드) */
    handleNextWeek,
  };
};
