export const ROUTES = {
  HOME: '/',
  MY: '/my',
  EXPENSE: '/expense',
  REPORT: '/report',
  REPORT_LIST: '/report/list',
  REPORT_DETAIL: '/report/detail',
  EXPENSE_CATEGORY: '/expense/category',
  AGREEMENT: 'auth/agreement',
  REVIEW: (date: string) => `/review/${date}`,
  REPORT_CATEGORY_DETAIL: '/report/category-detail',
  NOTIFICATIONS: '/notifications',
} as const;
