import React from 'react';
import {
  header,
  navRow,
  navText,
  navButton,
  iconRotate,
} from '@/shared/ui/calendar/styles/Calendar.css';
import { IcRightChevron } from 'public/icons';

interface CalendarHeaderProps {
  formattedMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader = ({
  formattedMonth,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) => {
  return (
    <div className={header}>
      <div className={navRow}>
        <button type='button' onClick={onPrevMonth} className={navButton}>
          <IcRightChevron className={iconRotate} />
        </button>
        <span className={navText}>{formattedMonth}</span>
        <button type='button' onClick={onNextMonth} className={navButton}>
          <IcRightChevron />
        </button>
      </div>
    </div>
  );
};
