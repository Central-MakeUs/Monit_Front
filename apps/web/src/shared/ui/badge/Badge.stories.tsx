import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './Badge';
import { getFigmaUrl } from '@/shared/config/figma';
import { IcBadge } from 'public/icons';

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
        component: '라벨과 아이콘을 표시하는 뱃지 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '뱃지 라벨 텍스트',
    },
    icon: {
      control: false,
      description: '뱃지 아이콘 (ReactNode)',
    },
    size: {
      control: 'radio',
      options: ['sm', 'lg'],
      description: '뱃지 크기',
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

export const Default: Story = {
  args: {
    label: '만족도 낮음',
    size: 'sm',
  },
};

export const SmWithIcon: Story = {
  args: {
    label: '만족도 낮음',
    size: 'sm',
    icon: <IcBadge />,
  },
};

export const LgDefault: Story = {
  args: {
    label: '홀린듯이',
    size: 'lg',
    icon: <IcBadge />,
  },
};

export const VerySatisfied: Story = {
  args: {
    label: '정말 만족했어요',
    size: 'lg',
    evaluationType: 'VERY_SATISFIED',
    icon: <IcBadge />,
  },
};

export const Satisfied: Story = {
  args: {
    label: '대체로 만족했어요',
    size: 'lg',
    evaluationType: 'SATISFIED',
    icon: <IcBadge />,
  },
};

export const Normal: Story = {
  args: {
    label: '그냥 그랬어요',
    size: 'lg',
    evaluationType: 'NORMAL',
    icon: <IcBadge />,
  },
};

export const Disappointed: Story = {
  args: {
    label: '조금 아쉬워요',
    size: 'lg',
    evaluationType: 'DISAPPOINTED',
    icon: <IcBadge />,
  },
};

export const VeryDisappointed: Story = {
  args: {
    label: '별로였어요',
    size: 'lg',
    evaluationType: 'VERY_DISAPPOINTED',
    icon: <IcBadge />,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Badge label='만족도 낮음' size='sm' icon={<IcBadge />} />
      <Badge label='홀린듯이' size='lg' icon={<IcBadge />} />
      <Badge label='정말 만족했어요' size='lg' evaluationType='VERY_SATISFIED' icon={<IcBadge />} />
      <Badge label='대체로 만족했어요' size='lg' evaluationType='SATISFIED' icon={<IcBadge />} />
      <Badge label='그냥 그랬어요' size='lg' evaluationType='NORMAL' icon={<IcBadge />} />
      <Badge label='조금 아쉬워요' size='lg' evaluationType='DISAPPOINTED' icon={<IcBadge />} />
      <Badge label='별로였어요' size='lg' evaluationType='VERY_DISAPPOINTED' icon={<IcBadge />} />
    </div>
  ),
};
