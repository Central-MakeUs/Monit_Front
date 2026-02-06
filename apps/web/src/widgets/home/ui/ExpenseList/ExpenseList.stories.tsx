import type { Meta, StoryObj } from '@storybook/nextjs';
import { ExpenseList } from './ExpenseList';

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
 * Mock 데이터를 사용한 지출 목록 (개발 환경)
 *
 * 프로덕션 환경에서는 빈 목록이 표시됩니다.
 */
export const WithMockData: Story = {
  args: {
    selectedDate: new Date(2024, 0, 15),
  },
  parameters: {
    docs: {
      description: {
        story:
          '개발 환경에서만 Mock 데이터가 표시됩니다. 프로덕션에서는 API 연동 후 실제 데이터를 사용합니다.',
      },
    },
  },
};

/**
 * 다른 날짜 선택
 */
export const DifferentDate: Story = {
  args: {
    selectedDate: new Date(2024, 11, 25),
  },
};

/**
 * 날짜 선택 없음
 */
export const NoDateSelected: Story = {
  args: {
    selectedDate: null,
  },
};
