import type { Meta, StoryObj } from '@storybook/nextjs';
import { NotificationCard } from './NotificationCard';
import { getFigmaUrl } from '@/shared/config/figma';
import { IcCheckCircle } from 'public/icons';

const SAMPLE_ICON = <IcCheckCircle color='#00B28D' />;

const SAMPLE_ARGS = {
  icon: SAMPLE_ICON,
  category: '회고 알림',
  message: '1월 29일의 회고가 도착했어요.\n오늘의 소비를 돌아보고, 나의 소비 습관을 점검해보세요.',
  date: '1월 30일',
  actionLabel: '소비 돌아보기',
} as const;

const meta: Meta<typeof NotificationCard> = {
  title: 'Components/NotificationCard',
  component: NotificationCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: getFigmaUrl('2768-10312'),
    },
    docs: {
      description: {
        component: [
          '알림 페이지에서 사용되는 알림 카드 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **state**: 알림 상태에 따라 배경색이 변경됩니다 (`default`, `active`, `unread`)',
          '- **icon**: 알림 유형에 맞는 아이콘을 외부에서 주입합니다',
          '- **actionLabel**: 액션 버튼이 필요한 경우에만 표시됩니다',
          '',
          '## 사용 예시',
          '```tsx',
          '<NotificationCard',
          '  state="unread"',
          '  icon={<CheckIcon />}',
          '  category="회고 알림"',
          '  message="1월 29일의 회고가 도착했어요."',
          '  date="1월 30일"',
          '  actionLabel="소비 돌아보기"',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
  args: {
    state: 'default',
    ...SAMPLE_ARGS,
  },
  argTypes: {
    state: {
      control: { type: 'radio' },
      options: ['default', 'active', 'unread'],
      description: '알림 카드 상태',
      table: {
        type: { summary: "'default' | 'active' | 'unread'" },
        defaultValue: { summary: 'default' },
      },
    },
    icon: {
      control: false,
      description: '아이콘 React 노드',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    category: {
      control: { type: 'text' },
      description: '알림 카테고리 라벨',
    },
    message: {
      control: { type: 'text' },
      description: '알림 본문 메시지',
    },
    date: {
      control: { type: 'text' },
      description: '날짜 텍스트',
    },
    actionLabel: {
      control: { type: 'text' },
      description: '액션 버튼 라벨 (없으면 버튼 미표시)',
    },
  },
} satisfies Meta<typeof NotificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: 'default',
  },
};

export const Active: Story = {
  args: {
    state: 'active',
  },
};

export const Unread: Story = {
  args: {
    state: 'unread',
  },
};

export const WithoutAction: Story = {
  name: '액션 버튼 없음',
  args: {
    state: 'default',
    actionLabel: undefined,
  },
};

const STATES = ['default', 'active', 'unread'] as const;

const LABEL_STYLE: React.CSSProperties = {
  marginBottom: '4px',
  fontSize: '12px',
  fontWeight: 500,
  color: '#999',
};

export const AllStates: Story = {
  name: 'All states comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '390px' }}>
      {STATES.map((state) => (
        <div key={state}>
          <h3 style={LABEL_STYLE}>{state.charAt(0).toUpperCase() + state.slice(1)}</h3>
          <NotificationCard state={state} {...SAMPLE_ARGS} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default, Active, Unread 세 가지 상태를 한눈에 비교할 수 있습니다.',
      },
    },
  },
};
