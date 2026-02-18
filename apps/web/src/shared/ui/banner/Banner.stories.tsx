import type { Meta, StoryObj } from '@storybook/nextjs';
import { Banner } from './Banner';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: getFigmaUrl('396-5116'),
    },
    docs: {
      description: {
        component: [
          '회고 현황을 표시하는 배너 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **isActive**: 회고할 건수가 있는지 여부',
          '- **count**: 돌아보지 않은 소비 건수 (isActive가 true일 때 표시)',
          '- **onClickReview**: 돌아보기 버튼 클릭 핸들러',
          '',
          '## 사용 예시',
          '```tsx',
          '<Banner isActive={true} count={9} onClickReview={() => console.log("review")} />',
          '```',
        ].join('\n'),
      },
    },
  },
  args: {
    isActive: false,
    count: 0,
  },
  argTypes: {
    isActive: {
      control: { type: 'boolean' },
      description: '활성 상태 여부 (회고할 건수가 있는지)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    count: {
      control: { type: 'number' },
      description: '돌아보지 않은 소비 건수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    onClickReview: {
      action: 'clicked',
      description: '돌아보기 버튼 클릭 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 (회고 완료)',
  args: {
    isActive: false,
  },
};

export const Active: Story = {
  name: '활성 (회고할 건수 있음)',
  args: {
    isActive: true,
    count: 9,
  },
};

export const Comparison: Story = {
  name: '상태 비교',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3
          style={{
            marginBottom: '8px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
          Default (회고 완료)
        </h3>
        <Banner isActive={false} />
      </div>
      <div>
        <h3
          style={{
            marginBottom: '8px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
          Active (회고할 건수 있음)
        </h3>
        <Banner isActive={true} count={9} onClickReview={() => alert('돌아보기 클릭!')} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '두 가지 상태를 한눈에 비교할 수 있습니다.',
      },
    },
  },
};
