import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ReportListCacheState {
  lastSeenCount: number | null;
  setLastSeenCount: (count: number) => void;
}

export const useReportListCacheStore = create<ReportListCacheState>()(
  persist(
    (set) => ({
      lastSeenCount: null,
      setLastSeenCount: (count) => set({ lastSeenCount: count }),
    }),
    {
      name: 'report-list/cache',
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
