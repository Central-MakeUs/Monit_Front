'use client';

import React from 'react';
import {
  weeklyGrid,
  weeklyColumn,
  weeklyWeekdayCell,
} from '@/shared/ui/calendar/styles/Calendar.css';
import { DateCell } from '@/shared/ui/calendar/DateCell';
import { WEEKDAYS } from '@/shared/ui/calendar/model/constants';
import { isSameDate, isToday } from '@/shared/ui/calendar/lib/calendarUtils';
import { useSwipeGesture } from '@/shared/ui/calendar/model/useSwipeGesture';
import type { CalendarDate } from '@/shared/ui/calendar/lib/calendarUtils';

interface WeeklyCalendarGridProps {
  dates: CalendarDate[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export const WeeklyCalendarGrid = ({
  dates,
  selectedDate,
  onDateSelect,
  onSwipeLeft,
  onSwipeRight,
}: WeeklyCalendarGridProps) => {
  const { handleTouchStart, handleTouchEnd } = useSwipeGesture({
    onSwipeLeft,
    onSwipeRight,
  });

  const isSelectedDateInCurrentWeek = selectedDate
    ? dates.some((dateObj) => isSameDate(dateObj.date, selectedDate))
    : false;

  const selectedDayIndex =
    isSelectedDateInCurrentWeek && selectedDate ? (selectedDate.getDay() + 6) % 7 : -1;

  return (
    <div className={weeklyGrid} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {dates.map((dateObj, index) => {
        const { date, isCurrentMonth } = dateObj;
        const dayName = WEEKDAYS[index];

        const isSelectedDay = isSelectedDateInCurrentWeek && index === selectedDayIndex;

        return (
          <div key={index} className={weeklyColumn}>
            <div className={weeklyWeekdayCell({ isSelected: isSelectedDay })}>{dayName}</div>
            <DateCell
              date={date}
              isSelected={selectedDate ? isSameDate(date, selectedDate) : false}
              isToday={isToday(date)}
              isOutsideMonth={!isCurrentMonth}
              size='weekly'
              onClick={onDateSelect}
            />
          </div>
        );
      })}
    </div>
  );
};
