/**
 * Home 위젯 공용 타입 정의
 */

/** 뷰 모드 타입 */
export type ViewMode = 'list' | 'calendar';

/** 빈 상태 타입 */
export type EmptyStateType = 'never' | 'today' | 'date';

/** 테스트 모드 타입 (개발 전용) */
export type TestMode = 'empty-never' | 'empty-today' | 'empty-date' | 'has-expenses';
