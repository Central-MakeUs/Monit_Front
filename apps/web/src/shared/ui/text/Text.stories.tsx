import type { Meta, StoryObj } from '@storybook/nextjs';
import { Text } from './Text';
import { vars } from '..';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Text 컴포넌트는 프로젝트의 Typography 시스템을 적용하는 범용 텍스트 컴포넌트입니다.',
          '',
          '## Typography 변형',
          '- **Title**: t1 ~ t5',
          '- **Head**: h1 ~ h5',
          '- **Body**: b1 ~ b5',
          '',
          '## 사용 예시',
          '```tsx',
          '<Text variant="t4" as="h1">Title 4</Text>',
          '<Text variant="b3" color={vars.color.text.brand}>Brand Text</Text>',
          '<Text variant="b3" align="center">Centered Text</Text>',
          '```',
        ].join('\n'),
      },
    },
  },
  args: {
    variant: 'b3',
    children: 'Sample Text',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        't5',
        't4',
        't3',
        't2',
        't1',
        'h5',
        'h4',
        'h3',
        'h2',
        'h1',
        'b5',
        'b4',
        'b3',
        'b2',
        'b1',
      ],
      description: 'Typography 변형',
      table: {
        type: { summary: 'TypographyVariant' },
        defaultValue: { summary: 'b3' },
      },
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'],
      description: 'HTML 엘리먼트 타입',
      table: {
        type: { summary: 'AsElement' },
        defaultValue: { summary: 'p' },
      },
    },
    color: {
      control: 'color',
      description: '텍스트 색상',
      table: {
        type: { summary: 'string' },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '텍스트 정렬',
      table: {
        type: { summary: 'React.CSSProperties["textAlign"]' },
      },
    },
    children: {
      control: 'text',
      description: '텍스트 내용',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'b3',
    children: 'Default Body Text',
  },
};

export const AllTypography: Story = {
  name: '모든 Typography 변형',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Title */}
      <section>
        <h3
          style={{
            marginBottom: '12px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
          Title
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Text variant='t5' as='h1'>
            Title 5 (t5) - 가장 큰 제목
          </Text>
          <Text variant='t4' as='h1'>
            Title 4 (t4) - 큰 제목
          </Text>
          <Text variant='t3' as='h2'>
            Title 3 (t3) - 중간 제목
          </Text>
          <Text variant='t2' as='h3'>
            Title 2 (t2) - 작은 제목
          </Text>
          <Text variant='t1' as='h4'>
            Title 1 (t1) - 가장 작은 제목
          </Text>
        </div>
      </section>

      {/* Head */}
      <section>
        <h3
          style={{
            marginBottom: '12px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
          Head
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Text variant='h5'>Head 5 (h5) - 가장 큰 소제목</Text>
          <Text variant='h4'>Head 4 (h4) - 큰 소제목</Text>
          <Text variant='h3'>Head 3 (h3) - 중간 소제목</Text>
          <Text variant='h2'>Head 2 (h2) - 작은 소제목</Text>
          <Text variant='h1'>Head 1 (h1) - 가장 작은 소제목</Text>
        </div>
      </section>

      {/* Body */}
      <section>
        <h3
          style={{
            marginBottom: '12px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
          Body
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Text variant='b5'>Body 5 (b5) - 가장 큰 본문</Text>
          <Text variant='b4'>Body 4 (b4) - 큰 본문</Text>
          <Text variant='b3'>Body 3 (b3) - 기본 본문</Text>
          <Text variant='b2'>Body 2 (b2) - 작은 본문</Text>
          <Text variant='b1'>Body 1 (b1) - 가장 작은 본문</Text>
        </div>
      </section>
    </div>
  ),
};

export const WithColors: Story = {
  name: '색상 변형',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant='h3' color={vars.color.text.brand}>
        Primary Text
      </Text>
      <Text variant='b3' color={vars.color.text.secondary}>
        Secondary Text
      </Text>
      <Text variant='b3' color={vars.color.text.brand}>
        Brand Color
      </Text>
      <Text variant='b3' color={vars.color.primitive.green[500]}>
        Error Color
      </Text>
    </div>
  ),
};

export const AsElements: Story = {
  name: 'HTML 엘리먼트',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant='h3' as='h1'>
        h1 엘리먼트로 렌더링 Head 3
      </Text>
      <Text variant='b3' as='p'>
        p 엘리먼트로 렌더링 Body 3
      </Text>
      <Text variant='b2' as='label'>
        label 엘리먼트로 렌더링 Body 2
      </Text>
      <Text variant='b1' as='span'>
        span 엘리먼트로 렌더링 Body 1
      </Text>
    </div>
  ),
};

export const TextAlignment: Story = {
  name: '텍스트 정렬',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ border: '1px solid #e0e0e0', padding: '16px' }}>
        <Text variant='b3' align='left'>
          왼쪽 정렬
        </Text>
      </div>
      <div style={{ border: '1px solid #e0e0e0', padding: '16px' }}>
        <Text variant='b3' align='center'>
          가운데 정렬
        </Text>
      </div>
      <div style={{ border: '1px solid #e0e0e0', padding: '16px' }}>
        <Text variant='b3' align='right'>
          오른쪽 정렬
        </Text>
      </div>
    </div>
  ),
};
