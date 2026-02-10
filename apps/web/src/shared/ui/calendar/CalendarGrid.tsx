'use client';

import React from 'react';
import { grid, weekdayCell } from './styles/Calendar.css';
import { DateCell } from './DateCell';
import { WEEKDAYS, isSameDate, isToday, isAfterToday } from '@/shared/lib/calendar';

interface CalendarGridProps {
  dates: Array<{ date: Date; isCurrentMonth: boolean }>;
  selectedDate: Date | null;
  size?: 'md' | 'lg' | 'weekly';
  showText?: boolean;
  renderDateText?: (date: Date) => string | undefined;
  onDateSelect: (date: Date) => void;
  disableFutureDates?: boolean;
  hideOutsideMonth?: boolean;
}

export const CalendarGrid = ({
  dates,
  selectedDate,
  size = 'md',
  showText = false,
  renderDateText,
  onDateSelect,
  disableFutureDates = true,
  hideOutsideMonth = false,
}: CalendarGridProps) => {
  return (
    <div className={grid({ size })}>
      {WEEKDAYS.map((day) => (
        <div key={day} className={weekdayCell}>
          {day}
        </div>
      ))}
      {dates.map(({ date, isCurrentMonth }, index) => {
        // hideOutsideMonth가 true이고 현재 달이 아니면 빈 셀 렌더링
        if (hideOutsideMonth && !isCurrentMonth) {
          return <div key={index} />;
        }

        return (
          <DateCell
            key={index}
            date={date}
            isSelected={selectedDate ? isSameDate(date, selectedDate) : false}
            isToday={isToday(date)}
            isOutsideMonth={!isCurrentMonth}
            isDisabled={disableFutureDates && isAfterToday(date)}
            size={size}
            showText={showText}
            text={showText ? renderDateText?.(date) : undefined}
            onClick={onDateSelect}
          />
        );
      })}
    </div>
  );
};
