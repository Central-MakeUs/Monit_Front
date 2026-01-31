import { useState, useMemo } from 'react';
import {
  DatePickerValue,
  generateYearRange,
  generateMonthRange,
  getInitialDateValue,
} from '@/shared/ui/datePicker/lib/datePickerUtils';
import {
  DEFAULT_MIN_YEAR_OFFSET,
  DEFAULT_MAX_YEAR_OFFSET,
} from '@/shared/ui/datePicker/config/constants';

interface UseDatePickerProps {
  value?: DatePickerValue;
  onChange?: (value: DatePickerValue) => void;
  minYear?: number;
  maxYear?: number;
}

interface UseDatePickerReturn {
  selectedYear: number;
  selectedMonth: number;
  years: number[];
  months: number[];
  yearIndex: number;
  monthIndex: number;
  handleYearChange: (index: number) => void;
  handleMonthChange: (index: number) => void;
}

export function useDatePicker({
  value,
  onChange,
  minYear: propMinYear,
  maxYear: propMaxYear,
}: UseDatePickerProps): UseDatePickerReturn {
  const currentYear = new Date().getFullYear();
  const minYear = propMinYear ?? currentYear - DEFAULT_MIN_YEAR_OFFSET;
  const maxYear = propMaxYear ?? currentYear + DEFAULT_MAX_YEAR_OFFSET;

  const initialValue = useMemo(() => getInitialDateValue(value), [value]);

  const [selectedYear, setSelectedYear] = useState(initialValue.year);
  const [selectedMonth, setSelectedMonth] = useState(initialValue.month);

  const years = useMemo(() => generateYearRange(minYear, maxYear), [minYear, maxYear]);
  const months = useMemo(() => generateMonthRange(), []);

  const yearIndex = years.findIndex((y) => y === selectedYear);
  const monthIndex = months.findIndex((m) => m === selectedMonth);

  const handleYearChange = (index: number) => {
    const year = years[index];
    if (year === undefined) return;
    setSelectedYear(year);
    onChange?.({ year, month: selectedMonth });
  };

  const handleMonthChange = (index: number) => {
    const month = months[index];
    if (month === undefined) return;
    setSelectedMonth(month);
    onChange?.({ year: selectedYear, month });
  };

  return {
    selectedYear,
    selectedMonth,
    years,
    months,
    yearIndex: yearIndex >= 0 ? yearIndex : 0,
    monthIndex: monthIndex >= 0 ? monthIndex : 0,
    handleYearChange,
    handleMonthChange,
  };
}
