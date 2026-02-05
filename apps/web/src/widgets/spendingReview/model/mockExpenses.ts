import type { ExpenseResponseDTO } from '@/entities/expense/model/expenseTypes';

// TODO: API 연동 시 제거
export const MOCK_EXPENSES: ExpenseResponseDTO[] = [
  {
    expenseId: 1,
    date: '2026-01-16',
    categoryIconType: 'coin',
    usageHistory: '영어 회화 교습권',
    categoryName: '자기계발',
    amount: 23000,
    emotionType: '홀린 듯이',
  },
  {
    expenseId: 2,
    date: '2026-01-16',
    categoryIconType: 'shopping',
    usageHistory: '나이키 운동화',
    categoryName: '쇼핑',
    amount: 89000,
    emotionType: '기분 전환',
  },
  {
    expenseId: 3,
    date: '2026-01-16',
    categoryIconType: 'percent',
    usageHistory: '넷플릭스 구독',
    categoryName: '구독',
    amount: 17000,
    emotionType: '필수템',
  },
];
