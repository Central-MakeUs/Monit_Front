export interface DatePickerFormatters {
  year?: (year: number) => string;
  month?: (month: number) => string;
}

export const defaultFormatters: Required<DatePickerFormatters> = {
  year: (year: number) => `${year}년`,
  month: (month: number) => `${month}월`,
};

export const koFormatter: DatePickerFormatters = {
  year: (year: number) => `${year}년`,
  month: (month: number) => `${month}월`,
};
