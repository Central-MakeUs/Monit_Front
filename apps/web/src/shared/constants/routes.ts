export const ROUTES = {
  HOME: '/',
  MY: '/my',
  EXPENSE: '/expense',
  REPORT: '/report',
  EXPENSE_CATEGORY: '/expense/category',
  AGREEMENT: 'auth/agreement',
  REVIEW: (date: string) => `/review/${date}`,
  NOTIFICATIONS: '/notifications',
} as const;
