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
          '- **arrow**: 화살표 위치를 설정합니다 (`left`, `center`, `right`)',
          '- **direction**: 화살표 방향을 설정합니다 (`bottom`, `top`)',
          '- **step**: 스텝 텍스트를 선택적으로 표시합니다',
          '',
          '## 사용 예시',
          '```tsx',
          '<Tooltip',
          '  arrow="left"',
          '  direction="bottom"',
          '  title="소비 기록"',
          '  step="(1/3)"',
          '  description="플러스 버튼을 눌러, 소비를 기록해 보세요"',
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
      options: ['left', 'center', 'right'],
      description: '화살표 위치',
      table: {
        type: { summary: "'left' | 'center' | 'right'" },
        defaultValue: { summary: 'left' },
      },
    },
    direction: {
      control: { type: 'radio' },
      options: ['bottom', 'top'],
      description: '화살표 방향',
      table: {
        type: { summary: "'bottom' | 'top'" },
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

export const WithoutStep: Story = {
  name: '스텝 없음',
  args: {
    arrow: 'left',
    direction: 'bottom',
    step: undefined,
  },
};

const ARROWS = ['left', 'center', 'right'] as const;
const DIRECTIONS = ['bottom', 'top'] as const;

const LABEL_STYLE: React.CSSProperties = {
  marginBottom: '4px',
  fontSize: '12px',
  fontWeight: 500,
  color: '#999',
};

export const AllVariants: Story = {
  name: 'All variants comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '390px' }}>
      {DIRECTIONS.map((direction) => (
        <div key={direction}>
          <h3 style={{ ...LABEL_STYLE, marginBottom: '12px', fontSize: '14px' }}>
            Direction: {direction}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {ARROWS.map((arrow) => (
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
