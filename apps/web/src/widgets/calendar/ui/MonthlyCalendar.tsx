'use client';

import React from 'react';
import { useMonthlyCalendar } from '../model/useMonthlyCalendar';
import { CalendarHeader } from '@/shared/ui/calendar/CalendarHeader';
import { CalendarGrid } from '@/shared/ui/calendar/CalendarGrid';
import { MonthlyCarousel } from '@/shared/ui/calendar/ui/MonthlyCarousel';

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
    carousel,
  } = useMonthlyCalendar({
    currentDate,
    selectedDate,
    variant,
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
      {variant === 'home' && carousel ? (
        <MonthlyCarousel
          prevMonth={carousel.prevMonth}
          currentMonth={carousel.currentMonth}
          nextMonth={carousel.nextMonth}
          selectedDate={effectiveSelectedDate}
          size={size}
          showText={shouldShowText}
          renderDateText={renderDateText}
          onDateSelect={handleDateSelect}
          trackRef={carousel.trackRef}
          handlers={carousel.handlers}
          transform={carousel.getTransform()}
          transition={carousel.getTransition()}
          onTransitionEnd={carousel.handleTransitionEnd}
        />
      ) : (
        <CalendarGrid
          dates={dates}
          selectedDate={effectiveSelectedDate}
          size={size}
          showText={shouldShowText}
          renderDateText={renderDateText}
          onDateSelect={handleDateSelect}
        />
      )}
    </>
  );
};
