'use client';

import React from 'react';
import { WeeklyCalendar, MonthlyCalendar } from '@/widgets/calendar';
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
          showText={false}
          onDateSelect={onDateSelect}
          onMonthChange={onMonthChange}
        />
      )}
    </div>
  );
};
