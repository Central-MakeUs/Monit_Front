/**
 * @module widgets/expense
 * @description 소비일 선택을 위한 캘린더 바텀시트 위젯
 *
 * widgets/calendar를 조합하여 완성된 UI 블록을 제공합니다.
 */
'use client';

import { BaseBottomSheetTemplate, Button } from '@/shared/ui';
import { Calendar } from '@/widgets/calendar';
import React, { useState } from 'react';

export interface CalendarBottomSheetTemplateProps {
  /** 선택된 날짜 */
  selectedDate?: Date;
  /** 날짜 선택 시 콜백 */
  onSelectDate?: (date: Date) => void;
  /** 선택 버튼 클릭 시 콜백 */
  onConfirm?: () => void;
  /** X 버튼 클릭 시 콜백 */
  onClose?: () => void;
}

export const CalendarBottomSheetTemplate = ({
  selectedDate: initialDate,
  onSelectDate,
  onConfirm,
  onClose,
}: CalendarBottomSheetTemplateProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onSelectDate?.(date);
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
        <Calendar variant='modal' selectedDate={selectedDate} onDateSelect={handleSelectDate} />
      </div>
      <Button variant='brand' onClick={handleConfirm} disabled={!selectedDate}>
        선택
      </Button>
    </BaseBottomSheetTemplate>
  );
};
