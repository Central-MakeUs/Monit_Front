import React from 'react';
import { weeklyGrid, weeklyColumn, weeklyWeekdayCell } from '../styles/Calendar.css';
import { DateCell } from '../DateCell';
import { isSameDate, isToday, isAfterToday, WEEKDAYS } from '@/shared/lib/calendar';
import type { CalendarDate } from '@/shared/lib/calendar';

interface WeeklyDateGridProps {
  weekDates: CalendarDate[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const WeeklyDateGrid = ({ weekDates, selectedDate, onDateSelect }: WeeklyDateGridProps) => {
  return (
    <div className={weeklyGrid}>
      {weekDates.map((dateObj, index) => {
        const { date, isCurrentMonth } = dateObj;
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const isSelected = selectedDate ? isSameDate(date, selectedDate) : false;

        return (
          <div key={dateKey} className={weeklyColumn}>
            <div className={weeklyWeekdayCell({ isSelected })}>{WEEKDAYS[index]}</div>
            <DateCell
              date={date}
              isSelected={isSelected}
              isToday={isToday(date)}
              isOutsideMonth={!isCurrentMonth}
              isDisabled={isAfterToday(date)}
              size='weekly'
              onClick={onDateSelect}
            />
          </div>
        );
      })}
    </div>
  );
};
