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
    id: 1,
    title: '스타벅스 아메리카노',
    category: 'coin' as const,
    price: 5000,
    badgeLabel: '필수템',
  },
  {
    id: 2,
    title: 'GS25 편의점',
    category: 'shopping' as const,
    price: 12000,
    badgeLabel: '살기위해',
  },
  {
    id: 3,
    title: '카카오택시',
    category: 'percent' as const,
    price: 8500,
    badgeLabel: '기분전환',
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
        id: 4,
        title: '올리브영',
        category: 'shopping' as const,
        price: 15000,
      },
      {
        id: 5,
        title: '점심식사',
        category: 'coin' as const,
        price: 9000,
        badgeLabel: '맛집',
      },
    ],
  },
};
