import type { Meta, StoryObj } from '@storybook/nextjs';
import { BottomNav } from './BottomNav';
// import { getFigmaUrl } from '@/shared/config/figma';

const meta: Meta<typeof BottomNav> = {
  title: 'Components/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          background: '#F6F7F9',
          position: 'relative',
          width: 400,
          height: 80,
          transform: 'translateZ(0)',
        }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      // TODO: figmaURL 넣기
      // url: getFigmaUrl('Node-id'),
    },
    docs: {
      description: {
        component: [
          '하단에 고정되는 네비게이션 바 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **NavToggle**: Home/Report 화면 전환',
          '- **PlusButton**: 새 항목 추가 버튼',
          '',
          '## Props',
          '- **defaultTab**: 기본 탭 (home | report)',
          '- **activeTab**: 제어 컴포넌트로 사용 시 현재 탭',
          '- **onTabChange**: 탭 변경 시 콜백',
          '- **onPlusClick**: 플러스 버튼 클릭 시 콜백',
        ].join('\n'),
      },
    },
  },
  args: {
    defaultTab: 'home',
  },
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {
  args: {
    defaultTab: 'home',
  },
};

export const ReportTab: Story = {
  args: {
    defaultTab: 'report',
  },
};
