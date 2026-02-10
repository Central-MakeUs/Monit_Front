import type { Meta, StoryObj } from '@storybook/nextjs';
import { HistoryCard } from './HistoryCard';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/HistoryCard',
  component: HistoryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: getFigmaUrl('434-6388'),
    },
    docs: {
      description: {
        component: [
          '`소비 내역` 표시에 사용하는 카드 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **title**: 소비처 제목',
          '- **category**: 카테고리 아이콘 타입 (coin, percent, shopping, plus)',
          '- **price**: 금액 (숫자, 자동으로 천단위 구분자 적용)',
          '- **categoryName**: 카테고리 이름 (예: 식비, 간식 등)',
          '- **disabled**: 비활성화 상태',
          '',
          '## 사용 예시',
          '```tsx',
          '<HistoryCard',
          '  title="스타벅스"',
          '  category="shopping"',
          '  price={5500}',
          '  categoryName="간식"',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
  args: {
    title: '스타벅스',
    category: 'shopping',
    price: 5500,
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '소비처 제목',
      table: {
        type: { summary: 'string' },
      },
    },
    category: {
      control: { type: 'select' },
      options: ['coin', 'percent', 'shopping', 'plus'],
      description: '카테고리 아이콘 타입',
      table: {
        type: { summary: "'coin' | 'percent' | 'shopping' | 'plus'" },
      },
    },
    price: {
      control: { type: 'number' },
      description: '금액',
      table: {
        type: { summary: 'number' },
      },
    },
    categoryName: {
      control: { type: 'text' },
      description: '카테고리 이름 (예: 식비, 간식 등)',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof HistoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본',
  args: {
    title: '스타벅스',
    category: 'shopping',
    price: 5500,
    categoryName: '간식',
  },
};

export const Disabled: Story = {
  name: '비활성화',
  args: {
    title: '스타벅스',
    category: 'shopping',
    price: 5500,
    categoryName: '간식',
    disabled: true,
  },
};

export const AllCategories: Story = {
  name: 'All categories comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
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
          Shopping
        </h3>
        <HistoryCard title='스타벅스' category='shopping' price={5500} categoryName='간식' />
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
          Coin
        </h3>
        <HistoryCard title='월급' category='coin' price={3500000} categoryName='수입' />
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
          Percent
        </h3>
        <HistoryCard title='적금 이자' category='percent' price={25000} categoryName='보너스' />
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
          Plus
        </h3>
        <HistoryCard title='용돈' category='plus' price={100000} categoryName='수입' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 카테고리 타입을 한눈에 비교할 수 있습니다.',
      },
    },
  },
};
