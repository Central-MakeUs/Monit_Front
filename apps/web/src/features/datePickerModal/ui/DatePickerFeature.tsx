'use client';

import React, { useState } from 'react';
import { BottomSheet } from '@/shared/ui/bottomSheet';
import { DatePickerBottomSheetTemplate } from './DatePickerBottomSheet';

export interface DatePickerFeatureProps {
  currentDate: Date;
  onDateConfirm: (year: number, month: number) => void;
  children: (props: { onOpen: () => void }) => React.ReactNode;
}

/**
 * DatePicker 기능 컴포넌트
 *
 * BottomSheet와 DatePicker를 조합한 재사용 가능한 feature 컴포넌트입니다.
 * Render Props 패턴을 사용하여 트리거 UI를 외부에서 주입받습니다.
 *
 * @example
 * ```tsx
 * <DatePickerFeature currentDate={date} onDateConfirm={handleConfirm}>
 *   {({ onOpen }) => <Button onClick={onOpen}>날짜 선택</Button>}
 * </DatePickerFeature>
 * ```
 */
export const DatePickerFeature = ({
  currentDate,
  onDateConfirm,
  children,
}: DatePickerFeatureProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleConfirm = (year: number, month: number) => {
    onDateConfirm(year, month);
    handleClose();
  };

  return (
    <>
      {children({ onOpen: handleOpen })}
      <BottomSheet isOpen={isOpen} onClose={handleClose}>
        <DatePickerBottomSheetTemplate
          initialYear={currentDate.getFullYear()}
          initialMonth={currentDate.getMonth() + 1}
          onConfirm={handleConfirm}
          onClose={handleClose}
          allowFuture={false}
        />
      </BottomSheet>
    </>
  );
};
