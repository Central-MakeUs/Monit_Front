import type { CategoryDetailVM } from './categoryDetailTypes';

// TODO: API 연동 시 제거
export const MOCK_CATEGORY_DETAIL: CategoryDetailVM = {
  periodLabel: '2026년 1월 2주차',
  categoryName: '홀린 듯한 소비 상세 내역',
  totalCount: 10,
  totalAmount: 409000,
  groups: [
    {
      level: 5,
      label: '정말 만족했어요',
      rank: 1,
      totalCount: 3,
      totalAmount: 78800,
      transactions: [
        {
          id: 'tx-1',
          merchantName: '서광서점',
          categoryIcon: 'book',
          categoryName: '교육',
          amount: 43000,
        },
        {
          id: 'tx-2',
          merchantName: '스타벅스 아메리카노',
          categoryIcon: 'coffee',
          categoryName: '카페',
          amount: 12800,
        },
        {
          id: 'tx-3',
          merchantName: '영어 회화 교습권',
          categoryIcon: 'credit',
          categoryName: '자기계발',
          amount: 23000,
        },
      ],
    },
    {
      level: 4,
      label: '대체로 만족해요',
      rank: 2,
      totalCount: 3,
      totalAmount: 82000,
      transactions: [
        {
          id: 'tx-4',
          merchantName: '올리브영',
          categoryIcon: 'beauty',
          categoryName: '뷰티',
          amount: 34000,
        },
        {
          id: 'tx-5',
          merchantName: '카카오택시',
          categoryIcon: 'coin',
          categoryName: '교통',
          amount: 14500,
        },
        {
          id: 'tx-6',
          merchantName: '이디야 커피',
          categoryIcon: 'coffee',
          categoryName: '카페',
          amount: 33500,
        },
      ],
    },
    {
      level: 3,
      label: '그냥 그랬어요',
      rank: 3,
      totalCount: 2,
      totalAmount: 120000,
      transactions: [
        {
          id: 'tx-7',
          merchantName: '다이소',
          categoryIcon: 'shopping',
          categoryName: '쇼핑',
          amount: 43000,
        },
        {
          id: 'tx-8',
          merchantName: '헬스장 월정액',
          categoryIcon: 'credit',
          categoryName: '건강',
          amount: 77000,
        },
      ],
    },
    {
      level: 2,
      label: '조금 아쉬워요',
      rank: 4,
      totalCount: 1,
      totalAmount: 30000,
      transactions: [
        {
          id: 'tx-9',
          merchantName: '쿠팡 로켓배송',
          categoryIcon: 'shopping',
          categoryName: '쇼핑',
          amount: 30000,
        },
      ],
    },
    {
      level: 1,
      label: '별로였어요',
      rank: 5,
      totalCount: 2,
      totalAmount: 50000,
      transactions: [
        {
          id: 'tx-10',
          merchantName: '편의점 충동구매',
          categoryIcon: 'coin',
          categoryName: '식비',
          amount: 18000,
        },
        {
          id: 'tx-11',
          merchantName: '온라인 강의',
          categoryIcon: 'book',
          categoryName: '교육',
          amount: 32000,
        },
      ],
    },
  ],
};
