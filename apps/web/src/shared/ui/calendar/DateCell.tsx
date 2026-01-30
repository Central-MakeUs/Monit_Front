import React from 'react';
import { dateCellWrapper, dateBadge, dateText } from '@/shared/ui/calendar/styles/DateCell.css';

export interface DateCellProps {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  isOutsideMonth: boolean;
  size?: 'md' | 'lg' | 'weekly';
  showText?: boolean;
  text?: string;
  onClick?: (date: Date) => void;
}

export const DateCell = ({
  date,
  isSelected,
  isToday,
  isOutsideMonth,
  size = 'md',
  showText = false,
  text,
  onClick,
}: DateCellProps) => {
  const handleClick = () => {
    onClick?.(date);
  };

  return (
    <div className={dateCellWrapper({ size, showText })} onClick={handleClick}>
      <span
        className={dateBadge({
          selected: isSelected,
          today: isToday,
          isOutsideMonth,
          size,
        })}>
        {date.getDate()}
      </span>
      {showText && text && (
        <span className={dateText({ size, isOutsideMonth, selected: isSelected })}>{text}</span>
      )}
    </div>
  );
};
