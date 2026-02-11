'use client';

import React, { useEffect, useState } from 'react';
import { WeeklyCalendar, MonthlyCalendar } from '@/widgets/calendar';
import { ViewMode } from '../../model/types';
import * as styles from './CalendarSection.css';
import { getExpenseCalendar, type DailyAmount } from '@/features/expense/api/getExpenseCalendar';
import { format } from 'date-fns';

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
  const [dailyAmounts, setDailyAmounts] = useState<DailyAmount[]>([]);

  useEffect(() => {
    const fetchMonthlyExpenses = async () => {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const response = await getExpenseCalendar({ year, month });
        if (response && response.result && response.result.dailyAmount) {
          setDailyAmounts(response.result.dailyAmount);
        } else {
          setDailyAmounts([]);
        }
      } catch (error) {
        console.error('Failed to fetch monthly expenses:', error);
        setDailyAmounts([]);
      }
    };

    if (viewMode === 'calendar') {
      fetchMonthlyExpenses();
    }
  }, [currentDate, viewMode]);

  const renderDateText = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const amountData = dailyAmounts.find((item) => item.date === dateString);
    return amountData ? amountData.dayAmount.toLocaleString() : undefined;
  };

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
          renderDateText={renderDateText}
          onDateSelect={onDateSelect}
          onMonthChange={onMonthChange}
        />
      )}
    </div>
  );
};
