'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Text, TopBar, vars } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { expenseReportQueries, type ExpenseEmotionType } from '@/entities/expenseReport';
import { categoryQueries } from '@/features/expense/model/categoryQueries';
import { toCategoryDetailVM } from '../../model/toCategoryDetailVM';
import { SatisfactionGroupCard } from './SatisfactionGroupCard';
import * as styles from './CategoryDetailPage.css';

export interface CategoryDetailPageProps {
  onBack: () => void;
  /**
   * 감정 타입. API가 허용하는 화이트리스트 값만 받는다.
   * 외부(쿼리스트링 등)에서 온 값은 호출부(route)에서 `isExpenseEmotionType`으로
   * 검증한 뒤 넘겨야 한다. 유효하지 않다면 undefined로 전달해 "잘못된 접근" 분기로 빠지게 한다.
   */
  emotionType?: ExpenseEmotionType;
  /** (주간) 조회 시작일 (YYYY-MM-DD) */
  start?: string;
  /** (주간) 조회 종료일 (YYYY-MM-DD) */
  end?: string;
  /** (월간) 조회 연도. month와 함께 있을 때 월간 모드로 조회 */
  year?: number;
  /** (월간) 조회 월 */
  month?: number;
  /** 기간 레이블 fallback (응답에 없을 때 표시) */
  periodLabel?: string;
}

export const CategoryDetailPage = ({
  onBack,
  emotionType,
  start,
  end,
  year,
  month,
  periodLabel,
}: CategoryDetailPageProps) => {
  // 월간 모드는 year/month가 모두 유한한 정수이고 month가 1~12 범위일 때만 활성화한다.
  // (NaN/소수/0 등이 흘러 들어와 잘못된 API 요청이나 라벨이 만들어지는 것을 막는다.)
  // Number.isInteger는 NaN/Infinity/소수를 모두 걸러준다.
  const isMonthly =
    Number.isInteger(year) && Number.isInteger(month) && month! >= 1 && month! <= 12;
  const isValidDate = (v: string | undefined): boolean =>
    typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
  const isWeekly = !isMonthly && isValidDate(start) && isValidDate(end);

  const {
    data: weeklyRaw,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError,
  } = useQuery({
    ...expenseReportQueries.weeklyExpenseDetailsQuery({
      start: start ?? '',
      end: end ?? '',
      emotionType: emotionType!,
    }),
    enabled: !!emotionType && isWeekly,
  });

  const {
    data: monthlyRaw,
    isLoading: isMonthlyLoading,
    isError: isMonthlyError,
  } = useQuery({
    ...expenseReportQueries.monthlyExpenseDetailsQuery({
      year: year ?? 0,
      month: month ?? 0,
      emotionType: emotionType!,
    }),
    enabled: !!emotionType && isMonthly,
  });

  const { data: categoryList } = useQuery(categoryQueries.listQuery());

  const categoryIconMap = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const c of categoryList?.result ?? []) {
      if (c.name && c.icon) map.set(c.name, c.icon);
    }
    return map;
  }, [categoryList]);

  const raw = isMonthly ? monthlyRaw : isWeekly ? weeklyRaw : undefined;
  const vm = raw ? toCategoryDetailVM(raw, categoryIconMap, periodLabel) : null;
  const isLoading =
    (isWeekly && isWeeklyLoading && !!emotionType) ||
    (isMonthly && isMonthlyLoading && !!emotionType);
  const isError = (isWeekly && isWeeklyError) || (isMonthly && isMonthlyError);
  // emotionType이나 모드 식별 정보 자체가 없으면 잘못된 진입이다.
  const isInvalidParams = !emotionType || (!isWeekly && !isMonthly);

  return (
    <div className={styles.container}>
      <TopBar
        left={
          <button
            type='button'
            className={styles.iconButton}
            onClick={onBack}
            aria-label='뒤로 가기'>
            <IcLeftChevron />
          </button>
        }
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            소비 내역 상세
          </Text>
        }
      />

      <div className={styles.scrollArea}>
        {isInvalidParams ? (
          <div className={styles.emptyState} role='status'>
            잘못된 접근이에요. 이전 화면에서 다시 시도해 주세요.
          </div>
        ) : isLoading ? (
          <div className={styles.emptyState} aria-busy='true' aria-live='polite'>
            소비 내역을 불러오고 있어요…
          </div>
        ) : isError ? (
          <div className={styles.emptyState} role='alert'>
            소비 내역을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </div>
        ) : !vm ? (
          <div className={styles.emptyState} role='status'>
            표시할 소비 내역이 없어요.
          </div>
        ) : (
          <>
            <div className={styles.summarySection}>
              <div className={styles.labelWrapper}>
                <Text className={styles.label} variant='b3'>
                  {vm.periodLabel}
                </Text>
              </div>
              <p className={styles.titleText}>{vm.categoryName}</p>
            </div>

            <div className={styles.totalBar}>
              <span className={styles.totalBarText}>총 소비 {vm.totalCount}건</span>
              <div className={styles.totalBarAmountWrapper}>
                <span className={styles.totalBarAmountText}>총</span>
                <span className={styles.totalBarAmountText}>{formatCurrency(vm.totalAmount)}</span>
              </div>
            </div>

            <div className={styles.groupList}>
              {vm.groups.map((group) => (
                <SatisfactionGroupCard key={group.level} vm={group} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
