export const ENDPOINT = {
  // Auth
  AUTH: {
    KAKAO_LOGIN: 'api/auth/kakao/login',
    REISSUE: 'api/auth/reissue',
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
    MONTHLY_TOTALS: 'api/expense/monthly_totals',
    REPORT_ARRIVALS: 'api/expense/report_arrivals',
    CHECK_REPORT_ARRIVAL: 'api/expense/report_arrivals/{year}/{month}/check',
  },
  CATEGORY: {
    CATEGORY_LIST: 'api/expense/category_list',
    CATEGORY_CREATE: 'api/expense/category_create',
    CATEGORY_UPDATE: 'api/expense/category_update/{categoryId}',
  },
  INQUIRY: { INQUIRY_SEND: 'api/inquiry/send' },
  ONBOARDING: {
    REMIND: 'api/onboarding/remind',
    HOME: 'api/onboarding/home',
    CATEGORY: 'api/onboarding/category',
  },
  ALERT: {
    ALERT_LIST: 'api/alerts',
    ALERT_UNREAD_STATUS: 'api/alerts/unread-status',
    ALERT_READ_ALL: 'api/alerts/read-all',
  },
} as const;
