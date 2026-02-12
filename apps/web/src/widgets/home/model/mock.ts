import { type ExpenseListDTO } from '@/entities/expense';

export const HOME_MOCK_DATA = {
  hasExpenses: true,
  emptyStateType: 'date' as const,
  expenseCount: 3,
  totalExpenseAmount: 24500,
  expenses: [
    {
      expenseId: 1,
      usageHistory: '마라샹궈',
      categoryIconType: 'shopping',
      categoryName: '식비',
      amount: 12000,
      emotionType: '기분전환',
      evaluationType: 'VERY_SATISFIED',
    },
    {
      expenseId: 2,
      usageHistory: '아메리카노',
      categoryIconType: 'coffee',
      categoryName: '간식',
      amount: 4500,
      emotionType: '그냥저냥',
      evaluationType: 'NORMAL',
    },
    {
      expenseId: 3,
      usageHistory: '캘린더',
      categoryIconType: 'shopping',
      categoryName: '생활',
      amount: 8000,
      emotionType: '기분전환',
      evaluationType: 'VERY_SATISFIED',
    },
  ] as ExpenseListDTO[],
};
