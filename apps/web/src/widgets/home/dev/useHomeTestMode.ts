'use client';

import { useState } from 'react';
import { EmptyStateType, TestMode } from '../model/types';

export interface UseHomeTestModeReturn {
  testMode: TestMode;
  setTestMode: (mode: TestMode) => void;
  hasExpenses: boolean;
  emptyStateType: EmptyStateType;
  expenseCount: number;
  totalExpenseAmount: number;
}

/**
 * 홈 페이지 테스트 모드 관리 훅 (개발 전용)
 * API 연동 전 퍼블리싱 테스트를 위한 상태 관리
 *
 * @returns 테스트 모드 상태 및 파생 데이터
 */
export const useHomeTestMode = (): UseHomeTestModeReturn => {
  const [testMode, setTestMode] = useState<TestMode>('empty-never');

  const hasExpenses = testMode === 'has-expenses';
  const emptyStateType: EmptyStateType =
    testMode === 'empty-never' ? 'never' : testMode === 'empty-today' ? 'today' : 'date';

  // TODO: API 연동 후 실제 데이터로 교체
  const expenseCount = hasExpenses ? 3 : 0;
  const totalExpenseAmount = hasExpenses ? 25500 : 0;

  return {
    testMode,
    setTestMode,
    hasExpenses,
    emptyStateType,
    expenseCount,
    totalExpenseAmount,
  };
};
