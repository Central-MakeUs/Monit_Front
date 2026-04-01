import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ReportArrivalState {
  /**
   * 사용자가 X 또는 확인 버튼으로 닫은 리포트 키 ("year-month" 형식, 예: "2026-3")
   * 최신 발행 리포트의 키와 비교해 카드 노출 여부를 결정
   */
  dismissedKey: string | null;
  dismiss: (year: number, month: number) => void;
}

export const useReportArrivalStore = create<ReportArrivalState>()(
  persist(
    (set) => ({
      dismissedKey: null,
      dismiss: (year, month) => set({ dismissedKey: `${year}-${month}` }),
    }),
    {
      name: 'report-arrival/status',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
    }
  )
);
