'use client';

import React from 'react';
import { useCalendarExpenseData } from '@/features/calendarExpenseData';
import type {
  ViewMode,
  WeeklyCalendarSlotProps,
  MonthlyCalendarSlotProps,
} from '../../model/types';
import * as styles from './CalendarSection.css';

export interface CalendarSectionProps {
  viewMode: ViewMode;
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  onMonthChange: (date: Date) => void;
  /** 주간 캘린더 렌더 슬롯 (Widget 간 직접 import 방지를 위한 DI 패턴) */
  renderWeeklyCalendar: (props: WeeklyCalendarSlotProps) => React.ReactNode;
  /** 월간 캘린더 렌더 슬롯 (Widget 간 직접 import 방지를 위한 DI 패턴) */
  renderMonthlyCalendar: (props: MonthlyCalendarSlotProps) => React.ReactNode;
}

export const CalendarSection = ({
  viewMode,
  currentDate,
  selectedDate,
  onDateSelect,
  onMonthChange,
  renderWeeklyCalendar,
  renderMonthlyCalendar,
}: CalendarSectionProps) => {
  // 캘린더 모드일 때만 데이터 페칭
  const { getFormattedAmount } = useCalendarExpenseData(currentDate, viewMode === 'calendar');

  return (
    <div className={styles.container}>
      {viewMode === 'list'
        ? renderWeeklyCalendar({
            currentDate,
            selectedDate,
            onDateSelect,
            onWeekChange: onMonthChange,
          })
        : renderMonthlyCalendar({
            currentDate,
            selectedDate,
            renderDateText: getFormattedAmount,
            onDateSelect,
            onMonthChange,
          })}
    </div>
  );
};
