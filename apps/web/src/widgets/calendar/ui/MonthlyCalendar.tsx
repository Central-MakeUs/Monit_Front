'use client';

import React from 'react';
import { useMonthlyCalendar } from '../model/useMonthlyCalendar';
import { CalendarHeader } from '@/shared/ui/calendar/CalendarHeader';
import { CalendarGrid } from '@/shared/ui/calendar/CalendarGrid';

interface MonthlyCalendarProps {
  currentDate: Date;
  selectedDate?: Date | null;
  variant: 'modal' | 'home';
  showText: boolean;
  renderDateText?: (date: Date) => string | undefined;
  onDateSelect?: (date: Date) => void;
  onMonthChange?: (newDate: Date) => void;
}

export const MonthlyCalendar = ({
  currentDate,
  selectedDate,
  variant,
  showText,
  renderDateText,
  onDateSelect,
  onMonthChange,
}: MonthlyCalendarProps) => {
  const {
    formattedMonth,
    dates,
    effectiveSelectedDate,
    handlePrevMonth,
    handleNextMonth,
    handleDateSelect,
  } = useMonthlyCalendar({
    currentDate,
    selectedDate,
    onDateSelect,
    onMonthChange,
  });

  const size = variant === 'home' ? 'lg' : 'md';
  const shouldShowText = variant === 'home' && showText;

  return (
    <>
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
    </>
  );
};
