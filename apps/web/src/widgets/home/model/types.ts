/**
 * Home 위젯 공용 타입 정의
 */

/** 뷰 모드 타입 */
export type ViewMode = 'list' | 'calendar';

/** 빈 상태 타입 - entities/expense에서 정의된 도메인 타입을 re-export */
export type { EmptyStateType } from '@/entities/expense';

/** 테스트 모드 타입 (개발 전용) */
export type TestMode = 'empty-never' | 'empty-today' | 'empty-date' | 'has-expenses';

/** 주간 캘린더 슬롯 Props */
export interface WeeklyCalendarSlotProps {
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  onWeekChange: (date: Date) => void;
}

/** 월간 캘린더 슬롯 Props */
export interface MonthlyCalendarSlotProps {
  currentDate: Date;
  selectedDate: Date | null;
  renderDateText: (date: Date) => string | undefined;
  onDateSelect: (date: Date | null) => void;
  onMonthChange: (date: Date) => void;
}
