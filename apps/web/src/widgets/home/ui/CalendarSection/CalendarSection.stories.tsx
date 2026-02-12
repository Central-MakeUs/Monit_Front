import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { WeeklyCalendar, MonthlyCalendar } from '@/widgets/calendar';
import { CalendarSection } from './CalendarSection';

const meta = {
  title: 'Widgets/Home/CalendarSection',
  component: CalendarSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    viewMode: {
      control: 'radio',
      options: ['list', 'calendar'],
      description: '캘린더 표시 모드',
    },
    onDateSelect: { action: 'dateSelected' },
    onMonthChange: { action: 'monthChanged' },
  },
  args: {
    onDateSelect: () => {},
    onMonthChange: () => {},
    renderWeeklyCalendar: (props) => <WeeklyCalendar {...props} />,
    renderMonthlyCalendar: ({ renderDateText, ...props }) => (
      <MonthlyCalendar {...props} variant='home' showText={true} renderDateText={renderDateText} />
    ),
  },
} satisfies Meta<typeof CalendarSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultCurrentDate = new Date(2024, 0, 15);
const defaultSelectedDate = new Date(2024, 0, 15);

/**
 * 리스트(주간) 뷰 모드
 *
 * 기본적으로 주간 캘린더를 보여줍니다.
 */
export const ListView: Story = {
  args: {
    viewMode: 'list',
    currentDate: defaultCurrentDate,
    selectedDate: defaultSelectedDate,
  },
};

/**
 * 캘린더(월간) 뷰 모드
 *
 * 월간 캘린더를 보여줍니다.
 */
export const CalendarView: Story = {
  args: {
    viewMode: 'calendar',
    currentDate: defaultCurrentDate,
    selectedDate: defaultSelectedDate,
  },
};

/**
 * 날짜 선택 없음
 *
 * 선택된 날짜가 없는 상태입니다.
 */
export const NoDateSelected: Story = {
  args: {
    viewMode: 'list',
    currentDate: defaultCurrentDate,
    selectedDate: null,
  },
};

/**
 * 다른 월 표시
 */
export const DifferentMonth: Story = {
  args: {
    viewMode: 'calendar',
    currentDate: new Date(2024, 11, 1), // 12월
    selectedDate: new Date(2024, 11, 25),
  },
};
