import { Expense } from '../ui/ExpenseList';

export const HOME_MOCK_DATA = {
  hasExpenses: true,
  emptyStateType: 'date' as const,
  expenseCount: 3,
  totalExpenseAmount: 24500,
  expenses: [
    {
      expenseId: 1,
      usageHistory: '마라샹궈',
      categoryIconType: 'coin',
      categoryName: '식비',
      amount: 12000,
      emotionType: '만족',
      evaluationType: 'GREAT',
    },
    {
      expenseId: 2,
      usageHistory: '아메리카노',
      categoryIconType: 'shopping',
      categoryName: '간식',
      amount: 4500,
      emotionType: '여유',
      evaluationType: 'GOOD',
    },
    {
      expenseId: 3,
      usageHistory: '캘린더',
      categoryIconType: 'percent',
      categoryName: '생활',
      amount: 8000,
      emotionType: '기분 전환',
      evaluationType: 'VERY_SATISFIED',
    },
  ] as Expense[],
};
