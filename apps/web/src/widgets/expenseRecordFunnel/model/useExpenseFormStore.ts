import { create } from 'zustand';

interface ExpenseFormState {
  amount?: number;
  expendedAt?: string;
  usageHistory?: string;
  categoryId?: number;
  emotionType?: string;
}

interface ExpenseFormActions {
  setAmountDate: (amount: number, expendedAt: string) => void;
  setUsageCategory: (usageHistory: string, categoryId: number) => void;
  setEmotionType: (emotionType: string) => void;
  reset: () => void;
}

export const useExpenseFormStore = create<ExpenseFormState & ExpenseFormActions>((set) => ({
  setAmountDate: (amount, expendedAt) => set({ amount, expendedAt }),
  setUsageCategory: (usageHistory, categoryId) => set({ usageHistory, categoryId }),
  setEmotionType: (emotionType) => set({ emotionType }),
  reset: () =>
    set({
      amount: undefined,
      expendedAt: undefined,
      usageHistory: undefined,
      categoryId: undefined,
      emotionType: undefined,
    }),
}));
