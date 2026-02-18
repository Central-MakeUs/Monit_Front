import type { Meta, StoryObj } from '@storybook/nextjs';
import { PageIndicator } from './PageIndicator';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/PageIndicator',
  component: PageIndicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: getFigmaUrl('1408-7069'),
    },
    docs: {
      description: {
        component: [
          'PageIndicator는 여러 페이지 중 현재 위치를 시각적으로 표시하는 도트 인디케이터입니다.',
          '',
          '## 주요 기능',
          '- **currentPage**: 현재 활성화된 페이지 인덱스 (0부터 시작)',
          '- **totalPages**: 전체 페이지 수',
          '- 현재 페이지에 해당하는 도트만 활성(active) 상태로 표시됩니다.',
          '',
          '## 사용 예시',
          '```tsx',
          '<PageIndicator currentPage={0} totalPages={4} />',
          '```',
        ].join('\n'),
      },
    },
  },
  args: {
    currentPage: 0,
    totalPages: 4,
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 0, max: 10 },
      description: '현재 활성화된 페이지 인덱스 (0부터 시작)',
      table: {
        type: { summary: 'number' },
      },
    },
    totalPages: {
      control: { type: 'number', min: 2, max: 10 },
      description: '전체 페이지 수',
      table: {
        type: { summary: 'number' },
      },
    },
  },
} satisfies Meta<typeof PageIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page1: Story = {
  name: '1페이지',
  args: {
    currentPage: 0,
    totalPages: 4,
  },
};

export const Page2: Story = {
  name: '2페이지',
  args: {
    currentPage: 1,
    totalPages: 4,
  },
};

export const Page3: Story = {
  name: '3페이지',
  args: {
    currentPage: 2,
    totalPages: 4,
  },
};

export const Page4: Story = {
  name: '4페이지',
  args: {
    currentPage: 3,
    totalPages: 4,
  },
};

export const AllPages: Story = {
  name: '전체 페이지 비교',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i}>
          <h3
            style={{
              marginBottom: '8px',
              fontSize: '12px',
              fontWeight: 500,
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
            Page {i + 1}
          </h3>
          <PageIndicator currentPage={i} totalPages={4} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '4페이지 인디케이터의 모든 상태를 한눈에 비교할 수 있습니다.',
      },
    },
  },
};
