import React from 'react';
import {
  weeklyGrid,
  weeklyColumn,
  weeklyWeekdayCell,
  weeklyCarouselContainer,
} from '../styles/Calendar.css';
import { WEEKDAYS } from '../model/constants';
import { isSameDate } from '../lib';
import type { CalendarDate } from '../lib';

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
    <div className={weeklyCarouselContainer}>
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
    </div>
  );
};
