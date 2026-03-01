import type { RankItem, ReportSummaryVM } from './types';
import { formatCurrency } from '@/shared/lib/formatCurrency';

export function toReportSummaryVM(params: {
  title: string;
  periodLabel: string;
  totalAmount: number;
  rankItems: RankItem[];
  subtitleLines?: [string, string];
}): ReportSummaryVM {
  const {
    title,
    periodLabel,
    totalAmount,
    rankItems,
    subtitleLines = ['홀린 듯한 상태에서', '가장 많은 소비를 했어요'],
  } = params;

  const totalCount = rankItems.reduce((sum, item) => sum + item.count, 0);

  // 금액(amount) 내림차순 정렬 (동률이면 count로 정렬)
  const sortedByAmount = [...rankItems].sort((a, b) => {
    if (b.amount !== a.amount) return b.amount - a.amount;
    return b.count - a.count;
  });
  // 상위 4개 → 막대 그래프, 상위 3개 → 순위 리스트
  const barItems = sortedByAmount.slice(0, 4);
  const listItems = sortedByAmount.slice(0, 3);

  return {
    title,
    subtitleLines,
    periodLabel,
    totalAmountText: formatCurrency(totalAmount),

    // 막대 너비: 월 전체 count 대비 해당 라벨의 count 비율
    barSegments:
      totalCount > 0
        ? barItems.map((item, idx) => ({
            key: item.label,
            flex: item.count / totalCount,
            colorIndex: idx as 0 | 1 | 2 | 3,
          }))
        : [],

    rankRows: listItems.map((item, idx) => ({
      key: item.label,
      index: idx + 1,
      dotIndex: idx as 0 | 1 | 2,
      label: item.label,
      count: item.count,
      amountText: formatCurrency(item.amount),
    })),
  };
}
