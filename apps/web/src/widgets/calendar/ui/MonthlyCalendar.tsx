'use client';

import React from 'react';
import { useMonthlyCalendar } from '../model/useMonthlyCalendar';
import { CalendarHeader, CalendarGrid } from '@/shared/ui/calendar';
import { MonthlyCarousel } from '@/features/calendarCarousel';

interface MonthlyCalendarProps {
  currentDate: Date;
  selectedDate?: Date | null;
  variant: 'modal' | 'home';
  showText: boolean;
  renderDateText?: (date: Date) => string | undefined;
  onDateSelect?: (date: Date | null) => void;
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
    isNextMonthDisabled,
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
          hideNextButton={isNextMonthDisabled}
        />
      )}
      {carousel ? (
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
          containerHeight={carousel.containerHeight}
          shouldTransitionHeight={carousel.shouldTransitionHeight}
        />
      ) : (
        <CalendarGrid
          dates={dates}
          selectedDate={effectiveSelectedDate}
          size={size}
          showText={shouldShowText}
          renderDateText={renderDateText}
          onDateSelect={handleDateSelect}
          hideOutsideMonth={true}
        />
      )}
    </>
  );
};
