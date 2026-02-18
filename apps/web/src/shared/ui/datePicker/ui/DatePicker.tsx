'use client';

import React from 'react';
import { PickerColumn } from '@/shared/ui/datePicker/ui/PickerColumn';
import { pickerContainer, highlightLine } from '@/shared/ui/datePicker/styles/DatePicker.css';
import { useDatePicker } from '@/shared/ui/datePicker/model/useDatePicker';
import { DatePickerValue, mergeFormatters } from '@/shared/ui/datePicker/lib/datePickerUtils';
import { DatePickerFormatters } from '@/shared/ui/datePicker/config/formatters';

export interface DatePickerProps {
  value?: DatePickerValue;
  onChange?: (value: DatePickerValue) => void;
  minYear?: number;
  maxYear?: number;
  formatters?: DatePickerFormatters;
  allowFuture?: boolean;
}

export const DatePicker = ({
  value,
  onChange,
  minYear,
  maxYear,
  formatters,
  allowFuture = true,
}: DatePickerProps): React.JSX.Element => {
  const mergedFormatters = React.useMemo(() => mergeFormatters(formatters), [formatters]);

  const {
    years,
    months,
    yearIndex,
    monthIndex,
    handleYearChange,
    handleMonthChange,
    selectedYear,
  } = useDatePicker({ value, onChange, minYear, maxYear });

  const isMonthDisabled = React.useMemo(() => {
    if (allowFuture) return undefined;

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    return (month: number) => {
      if (selectedYear > currentYear) return true;
      if (selectedYear === currentYear && month > currentMonth) return true;
      return false;
    };
  }, [allowFuture, selectedYear]);

  return (
    <div className={pickerContainer}>
      <div className={highlightLine} />
      <PickerColumn
        items={years}
        selectedIndex={yearIndex}
        onChange={handleYearChange}
        renderItem={mergedFormatters.year}
      />
      <PickerColumn
        items={months}
        selectedIndex={monthIndex}
        onChange={handleMonthChange}
        renderItem={mergedFormatters.month}
        isDisabled={isMonthDisabled}
      />
    </div>
  );
};

export default DatePicker;
