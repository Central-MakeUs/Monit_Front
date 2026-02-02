import React from 'react';
import { weeklyGrid, weeklyColumn } from '../styles/Calendar.css';
import { DateCell } from '../DateCell';
import { isSameDate, isToday, isAfterToday } from '../lib';
import type { CalendarDate } from '../lib';

interface WeeklyDateGridProps {
  weekDates: CalendarDate[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const WeeklyDateGrid = ({ weekDates, selectedDate, onDateSelect }: WeeklyDateGridProps) => {
  return (
    <div className={weeklyGrid}>
      {weekDates.map((dateObj) => {
        const { date, isCurrentMonth } = dateObj;
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

        return (
          <div key={dateKey} className={weeklyColumn}>
            <DateCell
              date={date}
              isSelected={selectedDate ? isSameDate(date, selectedDate) : false}
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
