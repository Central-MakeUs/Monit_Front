/**
 * @module features/expense
 * @description AmountDateStep 전용 캘린더 바텀시트
 *
 * Note: 재사용하지 않으므로 features 내부 컴포넌트로 유지
 */
'use client';

import React, { useState, useMemo } from 'react';
import { BaseBottomSheetTemplate, Button } from '@/shared/ui';
import { CalendarHeader, CalendarGrid } from '@/shared/ui/calendar';
import {
  generateCalendarDates,
  addMonths,
  subMonths,
  formatYearMonth,
  isAfterCurrentMonth,
} from '@/shared/lib/calendar';

interface CalendarBottomSheetTemplateProps {
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
  onConfirm?: () => void;
  onClose?: () => void;
}

export const CalendarBottomSheetTemplate = ({
  selectedDate: initialDate,
  onSelectDate,
  onConfirm,
  onClose,
}: CalendarBottomSheetTemplateProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);
  const [currentDate, setCurrentDate] = useState<Date>(initialDate || new Date());

  const dates = useMemo(() => {
    return generateCalendarDates(currentDate);
  }, [currentDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onSelectDate?.(date);
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    if (isAfterCurrentMonth(newDate)) {
      return;
    }
    setCurrentDate(newDate);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      onConfirm?.();
    }
  };

  const formattedMonth = formatYearMonth(currentDate);
  const isNextMonthDisabled = isAfterCurrentMonth(addMonths(currentDate, 1));

  return (
    <BaseBottomSheetTemplate>
      <BaseBottomSheetTemplate.Header type='close' text='소비일 수정' onClose={onClose} />
      <div>
        <CalendarHeader
          formattedMonth={formattedMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          hideNextButton={isNextMonthDisabled}
        />
        <CalendarGrid
          dates={dates}
          selectedDate={selectedDate || null}
          size='md'
          onDateSelect={handleDateSelect}
        />
      </div>
      <Button variant='brand' onClick={handleConfirm} disabled={!selectedDate}>
        선택
      </Button>
    </BaseBottomSheetTemplate>
  );
};
