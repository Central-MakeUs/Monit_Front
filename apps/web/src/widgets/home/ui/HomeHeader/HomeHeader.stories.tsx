import type { Meta, StoryObj } from '@storybook/nextjs';
import { HomeHeader } from './HomeHeader';

const meta = {
  title: 'Widgets/Home/HomeHeader',
  component: HomeHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onDateButtonClick: { action: 'dateButtonClicked' },
    onSettingsClick: { action: 'settingsClicked' },
  },
  args: {
    onDateButtonClick: () => {},
    onSettingsClick: () => {},
  },
} satisfies Meta<typeof HomeHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 홈 헤더 상태
 */
export const Default: Story = {
  args: {
    currentDate: new Date(2024, 0, 15), // 2024년 1월 15일
  },
};

/**
 * 다른 월을 표시하는 헤더
 */
export const DifferentMonth: Story = {
  args: {
    currentDate: new Date(2024, 11, 25), // 2024년 12월 25일
  },
};

/**
 * 현재 날짜 표시
 */
export const Today: Story = {
  args: {
    currentDate: new Date(),
  },
};
