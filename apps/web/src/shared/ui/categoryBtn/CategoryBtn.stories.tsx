import type { Meta, StoryObj } from '@storybook/nextjs';
import { CategoryBtn } from './CategoryBtn';
import { getFigmaUrl } from '@/shared/config/figma';

const meta: Meta<typeof CategoryBtn> = {
  title: 'Components/CategoryBtn',
  component: CategoryBtn,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: getFigmaUrl('125-1306'),
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    onEditClick: { action: 'edit clicked' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼의 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: '버튼의 타입',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    mode: {
      control: 'select',
      options: ['default', 'active', 'plus', 'edit'],
      description: '버튼의 모드 (아이콘/레이아웃이 바뀌는 모드)',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    hasText: {
      control: 'boolean',
      description: '라벨 표시 여부',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    icon: {
      control: 'select',
      options: ['coin', 'percent', 'shopping', 'plus'],
      description: '아이콘 종류',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Small - Default
export const PrimarySmallDefault: Story = {
  args: {
    size: 'sm',
    type: 'primary',
    mode: 'default',
    hasText: false,
    icon: 'coin',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('396-6478'),
    },
  },
};

// Primary Medium - Default
export const PrimaryMediumDefault: Story = {
  args: {
    size: 'md',
    type: 'primary',
    mode: 'default',
    hasText: true,
    icon: 'coin',
    label: '카테고리명',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('84-2913'),
    },
  },
};

// Primary Medium - Active
export const PrimaryMediumActive: Story = {
  args: {
    size: 'md',
    type: 'primary',
    mode: 'active',
    hasText: true,
    icon: 'coin',
    label: '카테고리명',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('125-1307'),
    },
  },
};

// Primary Medium - Plus
export const PrimaryMediumPlus: Story = {
  args: {
    size: 'md',
    type: 'primary',
    mode: 'plus',
    hasText: true,
    icon: 'plus',
    label: '더보기',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('125-1359'),
    },
  },
};

// Secondary Medium - Default
export const SecondaryMediumDefault: Story = {
  args: {
    size: 'md',
    type: 'secondary',
    mode: 'default',
    hasText: true,
    icon: 'percent',
    label: '카테고리명',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('594-3512'),
    },
  },
};

// Secondary Medium - Active
export const SecondaryMediumActive: Story = {
  args: {
    size: 'md',
    type: 'secondary',
    mode: 'active',
    hasText: true,
    icon: 'percent',
    label: '카테고리명',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('594-3515'),
    },
  },
};

// Secondary Medium - Plus
export const SecondaryMediumPlus: Story = {
  args: {
    size: 'md',
    type: 'secondary',
    mode: 'plus',
    hasText: true,
    icon: 'plus',
    label: '더보기',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('594-3518'),
    },
  },
};

// Secondary Medium - Edit
export const SecondaryMediumEdit: Story = {
  args: {
    size: 'md',
    type: 'secondary',
    mode: 'edit',
    hasText: true,
    icon: 'shopping',
    label: '카테고리명',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('760-8962'),
    },
  },
};

// Primary Large - Default
export const PrimaryLargeDefault: Story = {
  args: {
    size: 'lg',
    type: 'primary',
    mode: 'default',
    hasText: false,
    icon: 'coin',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('594-3548'),
    },
  },
};

// Primary Large - Plus
export const PrimaryLargePlus: Story = {
  args: {
    size: 'lg',
    type: 'primary',
    mode: 'plus',
    hasText: false,
    icon: 'plus',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('594-3551'),
    },
  },
};

// Without Text
export const WithoutText: Story = {
  args: {
    size: 'md',
    type: 'primary',
    mode: 'default',
    hasText: false,
    icon: 'coin',
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Small Size (without text)
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <CategoryBtn size='sm' type='primary' mode='default' hasText={false} icon='coin' />
          <CategoryBtn size='sm' type='primary' mode='default' hasText={false} icon='percent' />
          <CategoryBtn size='sm' type='primary' mode='default' hasText={false} icon='shopping' />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Primary - Medium
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <CategoryBtn
            size='md'
            type='primary'
            mode='default'
            hasText
            icon='coin'
            label='카테고리명'
          />
          <CategoryBtn
            size='md'
            type='primary'
            mode='active'
            hasText
            icon='coin'
            label='카테고리명'
          />
          <CategoryBtn size='md' type='primary' mode='plus' hasText icon='plus' label='더보기' />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Secondary - Medium
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <CategoryBtn
            size='md'
            type='secondary'
            mode='default'
            hasText
            icon='percent'
            label='카테고리명'
          />
          <CategoryBtn
            size='md'
            type='secondary'
            mode='active'
            hasText
            icon='percent'
            label='카테고리명'
          />
          <CategoryBtn size='md' type='secondary' mode='plus' hasText icon='plus' label='더보기' />
          <CategoryBtn
            size='md'
            type='secondary'
            mode='edit'
            hasText
            icon='shopping'
            label='카테고리명'
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Large Size (without text)
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <CategoryBtn size='lg' type='primary' mode='default' hasText={false} icon='coin' />
          <CategoryBtn size='lg' type='primary' mode='plus' hasText={false} icon='plus' />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Size Comparison
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <CategoryBtn size='sm' type='primary' mode='default' hasText={false} icon='coin' />
          <CategoryBtn
            size='md'
            type='primary'
            mode='default'
            hasText
            icon='coin'
            label='카테고리명'
          />
          <CategoryBtn size='lg' type='primary' mode='default' hasText={false} icon='coin' />
        </div>
      </div>
    </div>
  ),
};
