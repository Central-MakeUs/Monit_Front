import type { Meta, StoryObj } from '@storybook/nextjs';
import { ExpenseList, Expense } from './ExpenseList';

const meta = {
  title: 'Widgets/Home/ExpenseList',
  component: ExpenseList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExpenseList>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Mock 데이터
 */
const mockExpenses: Expense[] = [
  {
    expenseId: 1,
    usageHistory: '스타벅스 아메리카노',
    categoryIconType: 'shopping',
    categoryName: '카페',
    amount: 5000,
    emotionType: '만족',
    evaluationType: 'GREAT',
  },
  {
    expenseId: 2,
    usageHistory: 'GS25 편의점',
    categoryIconType: 'shopping',
    categoryName: '편의점',
    amount: 12000,
    emotionType: '살기위해',
    evaluationType: 'NORMAL',
  },
  {
    expenseId: 3,
    usageHistory: '카카오택시',
    categoryIconType: 'coin',
    categoryName: '교통',
    amount: 8500,
    emotionType: '기분전환',
    evaluationType: 'GOOD',
  },
];

/**
 * 지출 목록이 있는 상태
 */
export const WithExpenses: Story = {
  args: {
    selectedDate: new Date(2024, 0, 15),
    expenses: mockExpenses,
  },
};

/**
 * 많은 지출 항목
 */
export const ManyExpenses: Story = {
  args: {
    selectedDate: new Date(2024, 0, 15),
    expenses: [
      ...mockExpenses,
      {
        expenseId: 4,
        usageHistory: '올리브영',
        categoryIconType: 'shopping',
        categoryName: '쇼핑',
        amount: 15000,
        emotionType: '힐링',
        evaluationType: 'GREAT',
      },
      {
        expenseId: 5,
        usageHistory: '점심식사',
        categoryIconType: 'coin',
        categoryName: '식비',
        amount: 9000,
        emotionType: '맛집',
        evaluationType: 'GOOD',
      },
    ],
  },
};
