import type { Meta, StoryObj } from '@storybook/nextjs';
import { RatingBtn } from './RatingBtn';

const meta: Meta<typeof RatingBtn> = {
  title: 'Components/RatingBtn',
  component: RatingBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: '버튼 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: 'select',
      options: ['VERY_SATISFIED', 'SATISFIED', 'NORMAL', 'DISAPPOINTED', 'VERY_DISAPPOINTED'],
      description: '평가 타입',
    },
    selected: {
      control: 'boolean',
      description: '선택 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const VerySatisfied: Story = {
  args: {
    size: 'md',
    type: 'VERY_SATISFIED',
    selected: true,
    label: '매우만족',
  },
};

export const Satisfied: Story = {
  args: {
    size: 'md',
    type: 'SATISFIED',
    selected: true,
    label: '만족',
  },
};

export const Normal: Story = {
  args: {
    size: 'md',
    type: 'NORMAL',
    selected: true,
    label: '보통',
  },
};

export const Disappointed: Story = {
  args: {
    size: 'md',
    type: 'DISAPPOINTED',
    selected: true,
    label: '불만족',
  },
};

export const VeryDisappointed: Story = {
  args: {
    size: 'md',
    type: 'VERY_DISAPPOINTED',
    selected: true,
    label: '매우불만족',
  },
};

export const Unselected: Story = {
  args: {
    size: 'md',
    type: 'NORMAL',
    selected: false,
    label: '보통',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Selected (md)
        </h3>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
          <RatingBtn size='md' type='VERY_SATISFIED' selected label='매우만족' />
          <RatingBtn size='md' type='SATISFIED' selected label='만족' />
          <RatingBtn size='md' type='NORMAL' selected label='보통' />
          <RatingBtn size='md' type='DISAPPOINTED' selected label='불만족' />
          <RatingBtn size='md' type='VERY_DISAPPOINTED' selected label='매우불만족' />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Unselected (md)
        </h3>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
          <RatingBtn size='md' type='VERY_SATISFIED' label='매우만족' />
          <RatingBtn size='md' type='SATISFIED' label='만족' />
          <RatingBtn size='md' type='NORMAL' label='보통' />
          <RatingBtn size='md' type='DISAPPOINTED' label='불만족' />
          <RatingBtn size='md' type='VERY_DISAPPOINTED' label='매우불만족' />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Selected (lg)
        </h3>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
          <RatingBtn size='lg' type='VERY_SATISFIED' selected label='매우만족' />
          <RatingBtn size='lg' type='SATISFIED' selected label='만족' />
          <RatingBtn size='lg' type='NORMAL' selected label='보통' />
          <RatingBtn size='lg' type='DISAPPOINTED' selected label='불만족' />
          <RatingBtn size='lg' type='VERY_DISAPPOINTED' selected label='매우불만족' />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Without Label (md)
        </h3>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
          <RatingBtn size='md' type='VERY_SATISFIED' selected />
          <RatingBtn size='md' type='SATISFIED' selected />
          <RatingBtn size='md' type='NORMAL' selected />
          <RatingBtn size='md' type='DISAPPOINTED' selected />
          <RatingBtn size='md' type='VERY_DISAPPOINTED' selected />
        </div>
      </div>
    </div>
  ),
};
