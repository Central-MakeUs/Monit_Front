import type { Meta, StoryObj } from '@storybook/nextjs';
import { Card } from './ui/Card';
import { Text, vars } from '@/shared/ui';
import { getFigmaUrl } from '@/shared/config/figma';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: getFigmaUrl('5326-96516'),
    },
    docs: {
      description: {
        component: [
          '재사용 가능한 카드 컨테이너입니다. 겉모습(padding, radius, shadow, border)과 클릭 가능 여부만 담당합니다.',
          '',
          '## 주요 기능',
          '- **fullWidth**: 전체 폭 사용 여부 (기본 true)',
          '- **onClick**: 있으면 클릭 가능한 카드로 사용할 수 있습니다.',
          '- **children**: 카드 안에 넣을 콘텐츠',
          '',
          '## 사용 예시',
          '```tsx',
          '<Card onClick={handleClick}>',
          '  <Text variant="h2">제목</Text>',
          '  <Text variant="b2">설명</Text>',
          '</Card>',
          '```',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    fullWidth: {
      control: { type: 'boolean' },
      description: '전체 폭 사용 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '클릭 시 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 (정적)',
  args: {
    fullWidth: true,
    children: (
      <>
        <Text variant='h2' color={vars.color.text.primary}>
          카드 제목
        </Text>
        <Text variant='b2' color={vars.color.text.secondary}>
          카드 안에 들어가는 설명 텍스트입니다.
        </Text>
      </>
    ),
  },
};

export const Interactive: Story = {
  name: '클릭 가능',
  args: {
    fullWidth: true,
    onClick: () => {},
    children: (
      <>
        <Text variant='h2' color={vars.color.text.primary}>
          클릭 가능한 카드
        </Text>
        <Text variant='b2' color={vars.color.text.secondary}>
          클릭 동작이 있는 카드입니다.
        </Text>
      </>
    ),
  },
};

export const AutoWidth: Story = {
  name: '자동 폭 (fullWidth false)',
  args: {
    fullWidth: false,
    children: (
      <>
        <Text variant='h2' color={vars.color.text.primary}>
          자동 폭
        </Text>
        <Text variant='b2' color={vars.color.text.secondary}>
          fullWidth=false일 때 콘텐츠 너비만큼만 차지합니다.
        </Text>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Story />
      </div>
    ),
  ],
};

export const Comparison: Story = {
  name: '정적 vs 인터랙티브 비교',
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div>
        <h3
          style={{
            marginBottom: '8px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#999',
            textTransform: 'uppercase',
          }}>
          정적 카드
        </h3>
        <Card>
          <Text variant='h3' color={vars.color.text.primary}>
            정적 카드
          </Text>
          <Text variant='b2' color={vars.color.text.secondary}>
            onClick 없음
          </Text>
        </Card>
      </div>
      <div>
        <h3
          style={{
            marginBottom: '8px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#999',
            textTransform: 'uppercase',
          }}>
          클릭 가능 카드
        </h3>
        <Card onClick={() => {}}>
          <Text variant='h3' color={vars.color.text.primary}>
            클릭 가능 카드
          </Text>
          <Text variant='b2' color={vars.color.text.secondary}>
            onClick 콜백이 있는 카드
          </Text>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'onClick 유무에 따른 스타일 차이를 비교할 수 있습니다.',
      },
    },
  },
};
