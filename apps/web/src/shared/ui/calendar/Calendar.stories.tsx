import type { Meta, StoryObj } from '@storybook/nextjs';
import { Calendar } from './Calendar';
import { getFigmaUrl } from '@/shared/config/figma';
import { fn } from '@storybook/test';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: getFigmaUrl('1672-7098'),
    },
    docs: {
      description: {
        component:
          '홈 화면과 바텀시트에 쓰이는 날짜 선택 캘린더 컴포넌트입니다. 기본값은 home입니다. modal 설정 시 바텀시트에서 사용되는 날짜 선택 캘린더로 전환됩니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '390px', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    onDateSelect: fn(),
  },
  argTypes: {
    currentDate: {
      table: { disable: true },
    },
    variant: {
      control: 'radio',
      options: ['modal', 'home'],
      description: '캘린더 디스플레이 변형 (modal: 바텀시트 용, home: 홈 화면 용)',
      table: {
        defaultValue: { summary: 'home' },
      },
    },
    viewMode: {
      control: 'radio',
      options: ['monthly', 'weekly'],
      description: '캘린더 뷰 모드 (monthly: 월간 뷰, weekly: 주간 뷰)',
      table: {
        defaultValue: { summary: 'monthly' },
      },
    },
    showText: {
      control: 'boolean',
      description: '날짜 아래 텍스트 표시 여부 (home 모드에서만 적용)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    renderDateText: {
      description: '날짜별 텍스트를 반환하는 함수',
      table: {
        type: { summary: '(date: Date) => string | undefined' },
      },
    },
    onDateSelect: {
      description: '날짜 클릭 시 호출되는 콜백',
    },
    onWeekChange: {
      description: '주 변경 시 호출되는 콜백 (주간 모드)',
    },
    onMonthChange: {
      description: '월 변경 시 호출되는 콜백 (월간 모드)',
    },
  },
  render: ({ currentDate, ...args }) => (
    <Calendar
      key={currentDate?.toString()}
      {...args}
      currentDate={currentDate ? new Date(currentDate) : undefined}
    />
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'home',
  },
};

export const HomeWithText: Story = {
  args: {
    variant: 'home',
    showText: true,
    renderDateText: (date: Date) => {
      return date ? '40,000' : undefined;
    },
  },
};

export const Modal: Story = {
  args: {
    variant: 'modal',
  },
};

export const Weekly: Story = {
  args: {
    variant: 'home',
    viewMode: 'weekly',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('2253-15074'),
    },
  },
};
