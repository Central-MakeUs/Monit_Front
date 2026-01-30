import { DatePickerFormatters, defaultFormatters } from '../config/formatters';
export type { DatePickerFormatters };

export interface DatePickerValue {
  year: number;
  month: number;
}

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

export const generateYearRange = (startYear: number, endYear: number): number[] => {
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
};

export const generateMonthRange = (): number[] => {
  return Array.from({ length: 12 }, (_, i) => i + 1);
};

export const getInitialDateValue = (value?: DatePickerValue): DatePickerValue => {
  if (value) return value;

  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  };
};

export const mergeFormatters = (custom?: DatePickerFormatters): Required<DatePickerFormatters> => {
  return { ...defaultFormatters, ...custom };
};
