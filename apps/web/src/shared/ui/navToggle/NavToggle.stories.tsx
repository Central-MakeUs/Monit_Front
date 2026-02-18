import type { Meta, StoryObj } from '@storybook/nextjs';
import { NavToggle } from './NavToggle';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/NavToggle',
  component: NavToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: getFigmaUrl('115-820'),
    },
    docs: {
      description: {
        component: [
          '메인 네비게이션에서 Home과 Report 화면을 전환하는 토글 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **defaultValue**: 기본값 (home: 홈 화면, report: 리포트 화면)',
          '- **value**: 제어 컴포넌트로 사용 시 현재 값',
          '- **onChange**: 값 변경 시 호출되는 콜백',
          '',
        ].join('\n'),
      },
    },
  },
  args: {
    defaultValue: 'home',
  },
} satisfies Meta<typeof NavToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'home',
  },
};

export const Report: Story = {
  args: {
    defaultValue: 'report',
  },
};
