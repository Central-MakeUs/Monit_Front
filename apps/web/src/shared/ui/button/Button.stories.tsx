import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './Button';
import { getFigmaUrl } from '@/shared/config/figma';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: getFigmaUrl('23-54'),
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'brand', 'subtle'],
      description: '버튼의 스타일 타입',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼의 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Variants
export const PrimarySmall: Story = {
  args: {
    children: '돌아보기',
    variant: 'primary',
    size: 'sm',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('396-4783'),
    },
  },
};

export const PrimaryMedium: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('23-53'),
    },
  },
};

export const PrimaryLarge: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'lg',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('122-719'),
    },
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('23-79'),
    },
  },
};

// Secondary Variants
export const SecondaryMedium: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'md',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('62-218'),
    },
  },
};

export const SecondaryLarge: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'lg',
  },
};

// Brand Variants
export const BrandMedium: Story = {
  args: {
    children: 'Button',
    variant: 'brand',
    size: 'md',
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('62-243'),
    },
  },
};

export const BrandLarge: Story = {
  args: {
    children: 'Button',
    variant: 'brand',
    size: 'lg',
  },
};

export const AllVariants: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Primary
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button variant='primary' size='sm'>
            Small
          </Button>
          <Button variant='primary' size='md'>
            Medium
          </Button>
          <Button variant='primary' size='lg'>
            Large
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Secondary
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button variant='secondary' size='sm'>
            Small
          </Button>
          <Button variant='secondary' size='md'>
            Medium
          </Button>
          <Button variant='secondary' size='lg'>
            Large
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Brand
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button variant='brand' size='sm'>
            Small
          </Button>
          <Button variant='brand' size='md'>
            Medium
          </Button>
          <Button variant='brand' size='lg'>
            Large
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Disabled
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button variant='primary' size='sm' disabled>
            Small
          </Button>
          <Button variant='primary' size='md' disabled>
            Medium
          </Button>
          <Button variant='primary' size='lg' disabled>
            Large
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const SizeComparison: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button variant='primary' size='sm'>
        Small
      </Button>
      <Button variant='primary' size='md'>
        Medium
      </Button>
      <Button variant='primary' size='lg'>
        Large
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: 'Button',
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div style={{ width: '100%', padding: '10px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333', margin: 0 }}>Full Width</h3>
        <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
          버튼이 부모 컨테이너 너비에 맞춰 확장됩니다.
        </p>
        <Button variant='primary' size='md'>
          Primary Button
        </Button>
        <Button variant='secondary' size='md'>
          Secondary Button
        </Button>
        <Button variant='brand' size='md'>
          Brand Button
        </Button>
        <Button variant='primary' size='md' disabled>
          Disabled Button
        </Button>
      </div>
    </div>
  ),
};
