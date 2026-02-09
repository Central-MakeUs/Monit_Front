/**
 * @module features/expense
 * @description AmountDateStep 전용 캘린더 바텀시트
 *
 * Note: 재사용하지 않으므로 features 내부 컴포넌트로 유지
 */
'use client';

import React, { useState } from 'react';
import { BaseBottomSheetTemplate, Button } from '@/shared/ui';
import { MonthlyCalendar } from '@/widgets/calendar';

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

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onSelectDate?.(date);
  };

  const handleMonthChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      onConfirm?.();
    }
  };

  return (
    <BaseBottomSheetTemplate>
      <BaseBottomSheetTemplate.Header type='close' text='소비일 수정' onClose={onClose} />
      <div>
        <MonthlyCalendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          variant='modal'
          showText={false}
          onDateSelect={handleDateSelect}
          onMonthChange={handleMonthChange}
        />
      </div>
      <Button variant='brand' onClick={handleConfirm} disabled={!selectedDate}>
        선택
      </Button>
    </BaseBottomSheetTemplate>
  );
};
