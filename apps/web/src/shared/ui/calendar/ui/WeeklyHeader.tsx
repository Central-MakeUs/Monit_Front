import React from 'react';
import { weeklyGrid, weeklyColumn, weeklyWeekdayCell } from '../styles/Calendar.css';
import { WEEKDAYS, isSameDate } from '@/shared/lib/calendar';
import type { CalendarDate } from '@/shared/lib/calendar';

interface WeeklyHeaderProps {
  currentWeek: CalendarDate[];
  selectedDate: Date | null;
}

export const WeeklyHeader = ({ currentWeek, selectedDate }: WeeklyHeaderProps) => {
  const isSelectedDateInCurrentWeek = selectedDate
    ? currentWeek.some((dateObj) => isSameDate(dateObj.date, selectedDate))
    : false;

  const selectedDayIndex =
    isSelectedDateInCurrentWeek && selectedDate ? (selectedDate.getDay() + 6) % 7 : -1;

  return (
    <div className={weeklyGrid}>
      {WEEKDAYS.map((dayName, index) => {
        const isSelectedDay = isSelectedDateInCurrentWeek && index === selectedDayIndex;

        return (
          <div key={dayName} className={weeklyColumn}>
            <div className={weeklyWeekdayCell({ isSelected: isSelectedDay })}>{dayName}</div>
          </div>
        );
      })}
    </div>
  );
};
