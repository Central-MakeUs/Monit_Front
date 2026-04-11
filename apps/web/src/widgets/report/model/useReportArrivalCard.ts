import { useQuery } from '@tanstack/react-query';
import { expenseReportQueries } from '@/entities/expenseReport';
import { patchCheckReportArrival } from '@/features/report/api';
import { useReportArrivalStore } from './reportArrivalStore';

/**
 * 월간 리포트 도착 카드 노출 여부와 관련 액션을 반환
 *
 * 노출 조건:
 * - 가장 최신 리포트가 isChecked: false (미확인 상태)
 * - 해당 리포트를 아직 dismiss하지 않은 경우
 *
 * 새로운 리포트가 발행되면 dismiss된 이전 키와 달라 자동으로 재노출됨
 */
export function useReportArrivalCard() {
  const { data: arrivals = [] } = useQuery(expenseReportQueries.reportArrivalsQuery());
  const { dismissedKey, dismiss } = useReportArrivalStore();

  const latest = arrivals.reduce<(typeof arrivals)[0] | null>((best, r) => {
    if (!best) return r;
    if ((r.year ?? 0) > (best.year ?? 0)) return r;
    if (r.year === best.year && (r.month ?? 0) > (best.month ?? 0)) return r;
    return best;
  }, null);

  const reportKey = latest ? `${latest.year}-${latest.month}` : null;
  const visible = !!latest && !latest.isChecked && reportKey !== dismissedKey;

  return {
    visible,
    year: latest?.year ?? 0,
    month: latest?.month ?? 0,
    onDismiss: () => {
      if (latest?.year != null && latest?.month != null) {
        dismiss(latest.year, latest.month);
      }
    },
    onConfirm: () => {
      if (latest?.year != null && latest?.month != null) {
        const { year, month } = latest;
        // 서버 확인 처리가 성공한 뒤에만 로컬 dismiss를 적용해
        // 실패 시 카드가 다시 노출되어 재시도할 수 있게 한다.
        patchCheckReportArrival(year, month)
          .then(() => {
            dismiss(year, month);
          })
          .catch((error) => {
            console.error('월간 리포트 확인 처리 실패:', error);
          });
      }
    },
  };
}
