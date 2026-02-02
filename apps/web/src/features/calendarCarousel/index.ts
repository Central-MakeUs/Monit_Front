/**
 * @module features/calendar-carousel
 * @description 캘린더 캐러셀 기능 모듈
 * FSD: features layer - 월간/주간 캘린더 스와이프 기능
 */

// Model (Hooks)
export { useMonthlyCarousel } from './model/useMonthlyCarousel';
export { useWeeklyCarousel } from './model/useWeeklyCarousel';
export type { UseMonthlyCarouselReturn } from './model/useMonthlyCarousel';
export type { UseWeeklyCarouselReturn } from './model/useWeeklyCarousel';

// UI Components
export { MonthlyCarousel } from './ui/MonthlyCarousel';
export { WeeklyCarousel } from './ui/WeeklyCarousel';
