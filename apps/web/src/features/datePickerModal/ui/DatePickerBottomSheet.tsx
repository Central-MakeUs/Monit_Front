import { BaseBottomSheetTemplate } from '@/shared/ui';
import { DatePicker } from '@/shared/ui/datePicker';
import React, { useState, useEffect } from 'react';
import * as styles from './DatePickerBottomSheet.css';

export interface DatePickerBottomSheetTemplateProps {
  /** 초기 연도 */
  initialYear: number;
  /** 초기 월 */
  initialMonth: number;
  /** 선택 버튼 클릭 시 콜백 */
  onConfirm?: (year: number, month: number) => void;
  /** X 버튼 클릭 시 콜백 */
  onClose?: () => void;
  /** 미래 날짜 선택 허용 여부 (기본값: false) */
  allowFuture?: boolean;
}

/**
 * DatePicker BottomSheet 템플릿 컴포넌트
 *
 * BottomSheet 내에서 연/월을 선택할 수 있는 템플릿입니다.
 * BaseBottomSheetTemplate을 기반으로 DatePicker를 결합한 재사용 가능한 컴포넌트입니다.
 */
export const DatePickerBottomSheetTemplate = ({
  initialYear,
  initialMonth,
  onConfirm,
  onClose,
  allowFuture = false,
}: DatePickerBottomSheetTemplateProps) => {
  const [tempValue, setTempValue] = useState({ year: initialYear, month: initialMonth });

  useEffect(() => {
    setTempValue({ year: initialYear, month: initialMonth });
  }, [initialYear, initialMonth]);

  const handleChange = (value: { year: number; month: number }) => {
    setTempValue(value);
  };

  const handleConfirm = () => {
    // 미래 날짜 검증
    if (!allowFuture) {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;

      // 미래 날짜인 경우 현재 날짜로 제한
      if (
        tempValue.year > currentYear ||
        (tempValue.year === currentYear && tempValue.month > currentMonth)
      ) {
        onConfirm?.(currentYear, currentMonth);
        return;
      }
    }

    onConfirm?.(tempValue.year, tempValue.month);
  };

  // maxYear 설정 (미래 날짜 불가 시 현재 연도로 제한)
  const now = new Date();
  const maxYear = allowFuture ? undefined : now.getFullYear();

  return (
    <BaseBottomSheetTemplate>
      <BaseBottomSheetTemplate.Header type='close' text='월 선택' onClose={onClose} />
      <div className={styles.pickerWrapper}>
        <DatePicker
          value={tempValue}
          onChange={handleChange}
          maxYear={maxYear}
          allowFuture={allowFuture}
        />
      </div>
      <BaseBottomSheetTemplate.Button label='선택' onClick={handleConfirm} />
    </BaseBottomSheetTemplate>
  );
};
