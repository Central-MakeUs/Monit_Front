import type { Meta, StoryObj } from '@storybook/nextjs';
import { ExpenseContent } from './ExpenseContent';
import { Expense } from '../ExpenseList';

const meta = {
  title: 'Widgets/Home/ExpenseContent',
  component: ExpenseContent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    hasExpenses: {
      control: 'boolean',
      description: '소비 내역 존재 여부',
    },
    emptyStateType: {
      control: 'radio',
      options: ['never', 'today', 'date'],
      description: 'Empty 상태 타입',
    },
  },
} satisfies Meta<typeof ExpenseContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSelectedDate = new Date(2024, 0, 15);

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
 * 소비 목록이 있는 상태
 *
 * 소비 내역이 있을 때의 표시 상태입니다.
 */
export const WithExpenses: Story = {
  args: {
    hasExpenses: true,
    emptyStateType: 'never',
    expenseCount: 3,
    totalExpenseAmount: 25500,
    selectedDate: defaultSelectedDate,
    expenses: mockExpenses,
  },
};

/**
 * Empty Ver.1 - 아직 소비 내역이 없는 상태
 *
 * 처음 앱을 사용하거나 소비 내역이 전혀 없는 상태입니다.
 */
export const EmptyNever: Story = {
  args: {
    hasExpenses: false,
    emptyStateType: 'never',
    expenseCount: 0,
    totalExpenseAmount: 0,
    selectedDate: defaultSelectedDate,
  },
};

/**
 * Empty Ver.2 - 오늘 소비 내역이 없는 상태
 *
 * 오늘 날짜를 선택했지만 소비 내역이 없는 상태입니다.
 */
export const EmptyToday: Story = {
  args: {
    hasExpenses: false,
    emptyStateType: 'today',
    expenseCount: 0,
    totalExpenseAmount: 0,
    selectedDate: new Date(),
  },
};

/**
 * Empty Ver.3 - 특정 날짜에 소비 내역이 없는 상태
 *
 * 과거 또는 특정 날짜를 선택했지만 소비 내역이 없는 상태입니다.
 */
export const EmptyDate: Story = {
  args: {
    hasExpenses: false,
    emptyStateType: 'date',
    expenseCount: 0,
    totalExpenseAmount: 0,
    selectedDate: defaultSelectedDate,
  },
};

/**
 * 많은 소비 내역
 */
export const ManyExpenses: Story = {
  args: {
    hasExpenses: true,
    emptyStateType: 'never',
    expenseCount: 15,
    totalExpenseAmount: 125000,
    selectedDate: defaultSelectedDate,
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
