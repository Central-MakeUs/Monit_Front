import type { Decorator, Meta, StoryObj } from '@storybook/nextjs';
import { TopBar } from './TopBar';
import { getFigmaUrl } from '@/shared/config/figma';
import { Text, vars } from '@/shared/ui';
import { IcBell, IcMenu, IcLeftChevron } from 'public/icons';

const withMobileLayout: Decorator = (Story) => (
  <div
    style={{
      maxWidth: '430px',
      margin: '0 auto',
      backgroundColor: vars.color.bg.base,
    }}>
    <Story />
  </div>
);

const meta = {
  title: 'Components/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  decorators: [withMobileLayout],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: getFigmaUrl('84-2855'),
    },
    docs: {
      description: {
        component: [
          '페이지 상단에 표시되는 TopBar 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **left**: 좌측 영역 (뒤로가기 버튼, 날짜)',
          '- **center**: 중앙 영역 (페이지 타이틀)',
          '- **right**: 우측 영역 (알람, 메뉴,편집 등등)',
          '',
        ].join('\n'),
      },
    },
  },
  args: {
    left: null,
    center: null,
    right: null,
  },
  argTypes: {
    left: {
      description: '좌측 영역에 표시될 요소 (뒤로가기 버튼, 타이틀 등)',
      control: false,
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'null' },
      },
    },
    center: {
      description: '중앙 영역에 표시될 요소 (페이지 타이틀)',
      control: false,
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'null' },
      },
    },
    right: {
      description: '우측 영역에 표시될 요소 (알람, 메뉴, 편집 버튼 등)',
      control: false,
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'null' },
      },
    },
    className: {
      description: '추가적인 CSS 클래스명',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    left: <IcLeftChevron />,
    center: (
      <Text variant='t1' color={vars.color.text.primary}>
        타이틀
      </Text>
    ),
    right: <IcMenu />,
  },
};

export const Category: Story = {
  args: {
    left: <IcLeftChevron />,
    center: (
      <Text variant='t1' color={vars.color.text.primary}>
        카테고리
      </Text>
    ),
    right: (
      <Text variant='h4' color={vars.color.text.secondary}>
        편집
      </Text>
    ),
  },
};

export const Report: Story = {
  args: {
    left: (
      <Text variant='t1' color={vars.color.text.primary}>
        리포트
      </Text>
    ),
    right: (
      <div style={{ gap: '1.2rem', display: 'flex', alignItems: 'center' }}>
        <IcBell />
        <IcMenu />
      </div>
    ),
  },
};

export const DetailPage: Story = {
  args: {
    left: <IcLeftChevron />,
    center: (
      <Text variant='t1' color={vars.color.text.primary}>
        소비기록
      </Text>
    ),
  },
};
