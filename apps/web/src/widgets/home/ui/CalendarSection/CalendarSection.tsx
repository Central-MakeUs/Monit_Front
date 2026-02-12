'use client';

import React from 'react';
import { WeeklyCalendar, MonthlyCalendar } from '@/widgets/calendar';
import { useCalendarExpenseData } from '@/features/calendarExpenseData';
import { ViewMode } from '../../model/types';
import * as styles from './CalendarSection.css';

export interface CalendarSectionProps {
  viewMode: ViewMode;
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  onMonthChange: (date: Date) => void;
}

export const CalendarSection = ({
  viewMode,
  currentDate,
  selectedDate,
  onDateSelect,
  onMonthChange,
}: CalendarSectionProps) => {
  // 캘린더 모드일 때만 데이터 페칭
  const { getFormattedAmount } = useCalendarExpenseData(currentDate, viewMode === 'calendar');

  return (
    <div className={styles.container}>
      {viewMode === 'list' ? (
        <WeeklyCalendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          onWeekChange={onMonthChange}
        />
      ) : (
        <MonthlyCalendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          variant='home'
          showText={true}
          renderDateText={getFormattedAmount}
          onDateSelect={onDateSelect}
          onMonthChange={onMonthChange}
        />
      )}
    </div>
  );
};
