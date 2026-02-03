import React from 'react';
import { dateCellWrapper, dateBadge, dateText } from '@/shared/ui/calendar/styles/DateCell.css';

export interface DateCellProps {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  isOutsideMonth: boolean;
  isDisabled?: boolean;
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
  isDisabled = false,
  size = 'md',
  showText = false,
  text,
  onClick,
}: DateCellProps) => {
  const handleClick = () => {
    if (!isDisabled) {
      onClick?.(date);
    }
  };

  return (
    <div
      className={dateCellWrapper({ size, showText, disabled: isDisabled })}
      onClick={handleClick}
      style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
      <span
        className={dateBadge({
          selected: isSelected,
          today: isToday,
          isOutsideMonth,
          disabled: isDisabled,
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
