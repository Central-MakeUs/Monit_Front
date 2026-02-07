import type { paths } from '../api/schema';

type Endpoint = keyof paths;

const endpoint = <T extends Endpoint>(path: T): T => path;

export const ENDPOINT = {
  // Auth
  AUTH: {
    KAKAO_CALLBACK: endpoint('/api/auth/kakao/callback'),
    APPLE_LOGIN: endpoint('/api/auth/apple/login'),
    APPLE_CALLBACK: endpoint('/api/auth/apple/callback'),
    REISSUE: endpoint('/api/auth/reissue'),
    LOGOUT: endpoint('/api/auth/logout'),
    WITHDRAW: endpoint('/api/auth/withdraw'),
  },
  // Expense
  EXPENSE: {
    RECORD: endpoint('/api/expense/record'),
    UPDATE_RECORD: endpoint('/api/expense/update_record/{expenseId}'),
    REMIND: endpoint('/api/expense/remind'),
    DAILY: endpoint('/api/expense/daily'),
    RETROSPECT_LIST: endpoint('/api/expense/retrospect-list'),
  },
  EXPENSE_REPORT: {
    WEEKLY_DETAIL: endpoint('/api/expense/weekly_detail'),
    SUMMARY_RECORD: endpoint('/api/expense/summary_record'),
    DAILY_SATISFACTION: endpoint('/api/expense/daily_satisfaction'),
  },
  CATEGORY: {
    CATEGORY_LIST: endpoint('/api/expense/category_list'),
    CATEGORY_CREATE: endpoint('/api/expense/category_create'),
    CATEGORY_UPDATE: endpoint('/api/expense/category_update/{categoryId}'),
  },
} as const;
