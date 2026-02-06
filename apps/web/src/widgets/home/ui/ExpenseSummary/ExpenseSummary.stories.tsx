import type { Meta, StoryObj } from '@storybook/nextjs';
import { ExpenseSummary } from './ExpenseSummary';

const meta = {
  title: 'Widgets/Home/ExpenseSummary',
  component: ExpenseSummary,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExpenseSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 지출 요약 상태
 */
export const Default: Story = {
  args: {
    count: 3,
    totalAmount: 25500,
  },
};

/**
 * 지출 내역이 없는 상태
 */
export const Empty: Story = {
  args: {
    count: 0,
    totalAmount: 0,
  },
};

/**
 * 많은 지출 내역
 */
export const ManyExpenses: Story = {
  args: {
    count: 15,
    totalAmount: 1234567,
  },
};

/**
 * 단일 지출 내역
 */
export const SingleExpense: Story = {
  args: {
    count: 1,
    totalAmount: 5000,
  },
};
