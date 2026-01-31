export interface DatePickerFormatters {
  year?: (year: number) => string;
  month?: (month: number) => string;
}

export const koFormatter: Required<DatePickerFormatters> = {
  year: (year: number) => `${year}년`,
  month: (month: number) => `${month}월`,
};
