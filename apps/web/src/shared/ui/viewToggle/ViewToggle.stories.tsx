import type { Meta, StoryObj } from '@storybook/nextjs';
import { ViewToggle } from './ViewToggle';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/ViewToggle',
  component: ViewToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: getFigmaUrl('765-11282'),
    },
    docs: {
      description: {
        component: [
          '캘린더 화면에서 사용자가 보여지는 소비기록 타입을 선택하는 토글 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **defaultValue**: 기본값 (list: 리스트 타입, calendar: 캘린더 타입)',
          '- **disabled**: 비활성화 상태',
          '- **ariaLabel**: ARIA 라벨',
          '',
        ].join('\n'),
      },
    },
  },
  args: {
    defaultValue: 'list',
    disabled: false,
  },
} satisfies Meta<typeof ViewToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'list',
  },
};

export const Calendar: Story = {
  args: {
    defaultValue: 'calendar',
  },
};
