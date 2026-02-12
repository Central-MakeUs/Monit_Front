export const ENDPOINT = {
  // Auth
  AUTH: {
    KAKAO_CALLBACK: 'api/auth/kakao/callback',
    APPLE_LOGIN: 'api/auth/apple/login',
    APPLE_CALLBACK: 'api/auth/apple/callback',
    REISSUE: 'api/auth/reissue',
    LOGOUT: 'api/auth/logout',
    WITHDRAW: 'api/auth/withdraw',
  },
  // Expense
  EXPENSE: {
    RECORD: 'api/expense/record',
    UPDATE_RECORD: 'api/expense/update_record/{expenseId}',
    DELETE_RECORD: 'api/expense/delete/{expenseId}',
    REMIND: 'api/expense/remind',
    DAILY: 'api/expense/daily',
    RETROSPECT_LIST: 'api/expense/retrospect-list',
    CALENDAR: 'api/expense/calendar',
  },
  EXPENSE_REPORT: {
    WEEKLY_DETAIL: 'api/expense/weekly_detail',
    SUMMARY_RECORD: 'api/expense/summary_record',
    DAILY_SATISFACTION: 'api/expense/daily_satisfaction',
  },
  CATEGORY: {
    CATEGORY_LIST: 'api/expense/category_list',
    CATEGORY_CREATE: 'api/expense/category_create',
    CATEGORY_UPDATE: 'api/expense/category_update/{categoryId}',
  },
  INQUIRY: { INQUIRY_SEND: 'api/inquiry/send' },
} as const;
