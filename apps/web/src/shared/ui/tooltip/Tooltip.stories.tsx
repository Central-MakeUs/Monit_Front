import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tooltip } from './Tooltip';
import { getFigmaUrl } from '@/shared/config/figma';

const SAMPLE_ARGS = {
  title: '소비 기록',
  step: '(1/3)',
  description: '플러스 버튼을 눌러, 소비를 기록해 보세요',
} as const;

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: getFigmaUrl('2704-11075'),
    },
    docs: {
      description: {
        component: [
          '툴팁 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **arrow**: 화살표 위치를 설정합니다',
          '  - 상하 방향(top/bottom): `left`, `center`, `right`',
          '  - 좌우 방향(left/right): `top`, `center`, `bottom`',
          '- **direction**: 화살표 방향을 설정합니다 (`bottom`, `top`, `left`, `right`)',
          '- **step**: 스텝 텍스트를 선택적으로 표시합니다',
          '',
          '## 사용 예시',
          '```tsx',
          '// 상하 방향',
          '<Tooltip',
          '  arrow="left"',
          '  direction="bottom"',
          '  title="소비 기록"',
          '  step="(1/3)"',
          '  description="플러스 버튼을 눌러, 소비를 기록해 보세요"',
          '/>',
          '',
          '// 좌우 방향',
          '<Tooltip',
          '  arrow="center"',
          '  direction="right"',
          '  title="새 기능"',
          '  description="여기를 눌러 시작하세요"',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
  args: {
    arrow: 'left',
    direction: 'bottom',
    ...SAMPLE_ARGS,
  },
  argTypes: {
    arrow: {
      control: { type: 'radio' },
      options: ['left', 'center', 'right', 'top', 'bottom'],
      description: '화살표 위치 (상하: left/center/right, 좌우: top/center/bottom)',
      table: {
        type: { summary: "'left' | 'center' | 'right' | 'top' | 'bottom'" },
        defaultValue: { summary: 'left' },
      },
    },
    direction: {
      control: { type: 'radio' },
      options: ['bottom', 'top', 'left', 'right'],
      description: '화살표 방향',
      table: {
        type: { summary: "'bottom' | 'top' | 'left' | 'right'" },
        defaultValue: { summary: 'bottom' },
      },
    },
    title: {
      control: { type: 'text' },
      description: '타이틀 텍스트',
    },
    step: {
      control: { type: 'text' },
      description: '스텝 텍스트 (없으면 미표시)',
    },
    description: {
      control: { type: 'text' },
      description: '설명 텍스트',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    arrow: 'left',
    direction: 'bottom',
  },
};

export const ArrowCenter: Story = {
  args: {
    arrow: 'center',
    direction: 'bottom',
  },
};

export const ArrowRight: Story = {
  args: {
    arrow: 'right',
    direction: 'bottom',
  },
};

export const DirectionTop: Story = {
  args: {
    arrow: 'left',
    direction: 'top',
  },
};

export const DirectionLeft: Story = {
  name: '화살표 왼쪽',
  args: {
    arrow: 'center',
    direction: 'left',
  },
};

export const DirectionRight: Story = {
  name: '화살표 오른쪽',
  args: {
    arrow: 'center',
    direction: 'right',
  },
};

export const WithoutStep: Story = {
  name: '스텝 없음',
  args: {
    arrow: 'left',
    direction: 'bottom',
    step: undefined,
  },
};

const VERTICAL_ARROWS = ['left', 'center', 'right'] as const;
const HORIZONTAL_ARROWS = ['top', 'center', 'bottom'] as const;
const VERTICAL_DIRECTIONS = ['bottom', 'top'] as const;
const HORIZONTAL_DIRECTIONS = ['left', 'right'] as const;

const LABEL_STYLE: React.CSSProperties = {
  marginBottom: '4px',
  fontSize: '12px',
  fontWeight: 500,
  color: '#999',
};

export const AllVerticalVariants: Story = {
  name: '상하 방향 모음',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '390px' }}>
      {VERTICAL_DIRECTIONS.map((direction) => (
        <div key={direction}>
          <h3 style={{ ...LABEL_STYLE, marginBottom: '12px', fontSize: '14px' }}>
            Direction: {direction}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {VERTICAL_ARROWS.map((arrow) => (
              <div key={arrow}>
                <h4 style={LABEL_STYLE}>arrow: {arrow}</h4>
                <Tooltip arrow={arrow} direction={direction} {...SAMPLE_ARGS} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'arrow(left, center, right)와 direction(bottom, top) 조합을 한눈에 비교할 수 있습니다.',
      },
    },
  },
};

export const AllHorizontalVariants: Story = {
  name: '좌우 방향 모음',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
      {HORIZONTAL_DIRECTIONS.map((direction) => (
        <div key={direction}>
          <h3 style={{ ...LABEL_STYLE, marginBottom: '12px', fontSize: '14px' }}>
            Direction: {direction}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {HORIZONTAL_ARROWS.map((arrow) => (
              <div key={arrow}>
                <h4 style={LABEL_STYLE}>arrow: {arrow}</h4>
                <Tooltip arrow={arrow} direction={direction} {...SAMPLE_ARGS} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'arrow(top, center, bottom)와 direction(left, right) 조합을 한눈에 비교할 수 있습니다.',
      },
    },
  },
};
