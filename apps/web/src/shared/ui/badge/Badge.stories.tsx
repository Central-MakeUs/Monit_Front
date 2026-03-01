import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './Badge';
import { getFigmaUrl } from '@/shared/config/figma';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: getFigmaUrl('396-3461'),
    },
    docs: {
      description: {
        component:
          '라벨과 아이콘을 표시하는 뱃지 컴포넌트입니다. evaluationType 지정 시 해당 만족도 이모지(emoji 폴더 아이콘)가 자동으로 표시됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '뱃지 라벨 텍스트',
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm'],
      description: '뱃지 크기 (xs, sm)',
    },
    backgroundColor: {
      control: 'color',
      description: '뱃지 배경색',
    },
    evaluationType: {
      control: 'select',
      options: [
        undefined,
        'VERY_SATISFIED',
        'SATISFIED',
        'NORMAL',
        'DISAPPOINTED',
        'VERY_DISAPPOINTED',
      ],
      description: '만족도 타입 (lg 사이즈에서 색상 적용)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LgDefault: Story = {
  args: {
    label: '소비상황',
    size: 'sm',
  },
};

export const VerySatisfied: Story = {
  args: {
    label: '정말 만족했어요',
    size: 'sm',
    evaluationType: 'VERY_SATISFIED',
  },
};

export const Satisfied: Story = {
  args: {
    label: '대체로 만족했어요',
    size: 'sm',
    evaluationType: 'SATISFIED',
  },
};

export const Normal: Story = {
  args: {
    label: '그냥 그랬어요',
    size: 'sm',
    evaluationType: 'NORMAL',
  },
};

export const Disappointed: Story = {
  args: {
    label: '조금 아쉬워요',
    size: 'sm',
    evaluationType: 'DISAPPOINTED',
  },
};

export const VeryDisappointed: Story = {
  args: {
    label: '별로였어요',
    size: 'sm',
    evaluationType: 'VERY_DISAPPOINTED',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
      <Badge label='정말 만족했어요' size='xs' evaluationType='VERY_SATISFIED' />
      <Badge label='대체로 만족했어요' size='xs' evaluationType='SATISFIED' />
      <Badge label='그냥 그랬어요' size='xs' evaluationType='NORMAL' />
      <Badge label='조금 아쉬워요' size='xs' evaluationType='DISAPPOINTED' />
      <Badge label='별로였어요' size='xs' evaluationType='VERY_DISAPPOINTED' />
    </div>
  ),
};
