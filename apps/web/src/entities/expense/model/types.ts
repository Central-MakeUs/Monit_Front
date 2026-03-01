import { components } from '@/shared/api/schema';

export type DailyExpenseResponse = components['schemas']['ApiResponseDailyExpenseResponseDTO'];
export type DailyExpenseResponseDTO = components['schemas']['DailyExpenseResponseDTO'];
export type ExpenseListDTO = components['schemas']['ExpenseListDTO'];
export type RetrospectListResponse = components['schemas']['ApiResponseListExpenseResponseDTO'];

/** 빈 상태 타입 (지출 내역 없음 시 표시할 메시지 분기) */
export type EmptyStateType = 'never' | 'today' | 'date';
