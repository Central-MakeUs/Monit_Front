import type { Meta, StoryObj } from '@storybook/nextjs';
import { MonthlyExpenseInfo } from './MonthlyExpenseInfo';

const meta = {
  title: 'Widgets/Home/MonthlyExpenseInfo',
  component: MonthlyExpenseInfo,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    standalone: {
      control: 'boolean',
      description: '단독 사용 시 margin/padding 루트 적용',
    },
  },
} satisfies Meta<typeof MonthlyExpenseInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 (조립 시 사용, 헤더 내부) */
export const Default: Story = {
  args: {
    monthlyTotalAmount: 1234567,
    standalone: false,
  },
};

/** 단독 사용 (Report 등) */
export const Standalone: Story = {
  args: {
    monthlyTotalAmount: 1234567,
    standalone: true,
  },
};

/** 로딩 중 */
export const Loading: Story = {
  args: {
    monthlyTotalAmount: 0,
    isLoading: true,
    standalone: true,
  },
};
