import type { Meta, StoryObj } from '@storybook/nextjs';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Widgets/Home/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 처음 사용하는 사용자 (한 번도 소비 기록이 없음)
 */
export const Never: Story = {
  args: {
    type: 'never',
  },
};

/**
 * 오늘 지출 내역이 없는 상태
 */
export const Today: Story = {
  args: {
    type: 'today',
  },
};

/**
 * 선택한 날짜에 지출 내역이 없는 상태
 */
export const Date: Story = {
  args: {
    type: 'date',
  },
};
