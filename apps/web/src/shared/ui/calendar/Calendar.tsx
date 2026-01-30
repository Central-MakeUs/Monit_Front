'use client';

import React from 'react';
import { container } from '@/shared/ui/calendar/styles/Calendar.css';
import { CalendarHeader } from '@/shared/ui/calendar/CalendarHeader';
import { CalendarGrid } from '@/shared/ui/calendar/CalendarGrid';
import { WeeklyCalendarGrid } from '@/shared/ui/calendar/WeeklyCalendarGrid';
import { useCalendar } from '@/shared/ui/calendar/model/useCalendar';

export interface CalendarProps {
  currentDate?: Date;
  selectedDate?: Date | null;
  variant?: 'modal' | 'home';
  viewMode?: 'monthly' | 'weekly';
  showText?: boolean;
  renderDateText?: (date: Date) => string | undefined;
  onDateSelect?: (date: Date) => void;
  onWeekChange?: (newDate: Date) => void;
  onMonthChange?: (newDate: Date) => void;
}

export const Calendar = ({
  currentDate = new Date(),
  selectedDate,
  variant = 'home',
  viewMode = 'monthly',
  showText = false,
  renderDateText,
  onDateSelect,
  onWeekChange,
  onMonthChange,
}: CalendarProps) => {
  const {
    formattedMonth,
    dates,
    effectiveSelectedDate,
    handlePrevMonth,
    handleNextMonth,
    handlePrevWeek,
    handleNextWeek,
    handleDateSelect,
  } = useCalendar({
    currentDate,
    selectedDate,
    viewMode,
    onDateSelect,
    onWeekChange,
    onMonthChange,
  });

  const size = variant === 'home' ? 'lg' : 'md';
  const shouldShowText = variant === 'home' && showText;

  // 주간 모드
  if (viewMode === 'weekly') {
    return (
      <div className={container}>
        <WeeklyCalendarGrid
          dates={dates}
          selectedDate={effectiveSelectedDate}
          onDateSelect={handleDateSelect}
          onSwipeLeft={handleNextWeek}
          onSwipeRight={handlePrevWeek}
        />
      </div>
    );
  }

  // 월간 모드
  return (
    <div className={container}>
      {variant === 'modal' && (
        <CalendarHeader
          formattedMonth={formattedMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      )}
      <CalendarGrid
        dates={dates}
        selectedDate={effectiveSelectedDate}
        size={size}
        showText={shouldShowText}
        renderDateText={renderDateText}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};
