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
