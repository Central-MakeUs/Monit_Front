/**
 * 개발 전용 Mock 데이터
 * 프로덕션 빌드에서는 사용되지 않음
 */

export const mockExpenses = [
  {
    id: 1,
    title: '스타벅스 아메리카노',
    category: 'coin' as const,
    price: 5000,
    date: new Date(),
    badgeLabel: '필수템',
  },
  {
    id: 2,
    title: 'GS25 편의점',
    category: 'shopping' as const,
    price: 12000,
    date: new Date(),
    badgeLabel: '살기위해',
  },
  {
    id: 3,
    title: '카카오택시',
    category: 'percent' as const,
    price: 8500,
    date: new Date(),
    badgeLabel: '기분전환',
  },
];
