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
    viewMode: {
      control: 'radio',
      options: ['list', 'calendar'],
      description: '캘린더 표시 모드',
    },
    onViewModeChange: { action: 'viewModeChanged' },
  },
  args: {
    onViewModeChange: () => {},
  },
} satisfies Meta<typeof MonthlyExpenseInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 리스트 뷰 모드
 *
 * ViewToggle이 리스트 모드로 설정된 상태입니다.
 */
export const ListView: Story = {
  args: {
    viewMode: 'list',
  },
};

/**
 * 캘린더 뷰 모드
 *
 * ViewToggle이 캘린더 모드로 설정된 상태입니다.
 */
export const CalendarView: Story = {
  args: {
    viewMode: 'calendar',
  },
};
