'use client';

import React from 'react';
import { container } from './Calendar.css';
import { MonthlyCalendar } from './MonthlyCalendar';
import { WeeklyCalendar } from './WeeklyCalendar';

export interface CalendarProps {
  currentDate?: Date;
  selectedDate?: Date | null;
  variant?: 'modal' | 'home';
  viewMode?: 'monthly' | 'weekly';
  showText?: boolean;
  renderDateText?: (date: Date) => string | undefined;
  onDateSelect?: (date: Date | null) => void;
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
  if (viewMode === 'weekly') {
    return (
      <div className={container}>
        <WeeklyCalendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          onWeekChange={onWeekChange}
        />
      </div>
    );
  }

  return (
    <div className={container}>
      <MonthlyCalendar
        currentDate={currentDate}
        selectedDate={selectedDate}
        variant={variant}
        showText={showText}
        renderDateText={renderDateText}
        onDateSelect={onDateSelect}
        onMonthChange={onMonthChange}
      />
    </div>
  );
};
