import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { SelectionTile } from './SelectionTile';
import { getFigmaUrl } from '@/shared/config/figma';

const meta: Meta<typeof SelectionTile> = {
  title: 'Components/SelectionTile',
  component: SelectionTile,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: getFigmaUrl('1668-7387'),
    },
    docs: {
      description: {
        component: [
          '`약관 동의` 등 선택 항목에 사용하는 타일 컴포넌트입니다.',
          '',
          '- `lg`: 전체 동의 등 상위 항목에 사용',
          '- `sm`: 개별 약관 항목에 사용, chevron 아이콘과 href를 통해 상세 페이지로 이동 가능',
        ].join('\n'),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    size: {
      control: 'select',
      options: ['lg', 'sm'],
      description: '타일의 크기',
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    selected: {
      control: 'boolean',
      description: '선택 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: '타일 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LargeDefault: Story = {
  args: {
    label: '모두 동의합니다',
    size: 'lg',
    selected: false,
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('1668-7385'),
    },
  },
};

export const LargeSelected: Story = {
  args: {
    label: '모두 동의합니다',
    size: 'lg',
    selected: true,
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('1668-7394'),
    },
  },
};

export const SmallDefault: Story = {
  args: {
    label: '이용약관 동의 (필수)',
    size: 'sm',
    selected: false,
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('1668-7386'),
    },
  },
};

export const SmallSelected: Story = {
  args: {
    label: '이용약관 동의 (필수)',
    size: 'sm',
    selected: true,
  },
  parameters: {
    design: {
      type: 'figma',
      url: getFigmaUrl('1668-7432'),
    },
  },
};

export const AllVariants: Story = {
  args: {
    label: '모두 동의합니다',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '354px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Large
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SelectionTile size='lg' label='모두 동의합니다' selected={false} />
          <SelectionTile size='lg' label='모두 동의합니다' selected={true} />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          Small
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          <SelectionTile size='sm' label='이용약관 동의 (필수)' selected={false} />
          <SelectionTile size='sm' label='개인정보 수집 및 이용 동의 (필수)' selected={false} />
          <SelectionTile size='sm' label='마케팅 정보 수신 동의 (선택)' selected={true} />
        </div>
      </div>
    </div>
  ),
};

interface SelectionItem {
  label: string;
  selected: boolean;
}

export const InteractiveExample: Story = {
  args: {
    label: '모두 동의합니다',
  },
  render: function InteractiveRender() {
    const [allSelected, setAllSelected] = React.useState(false);
    const [items, setItems] = React.useState<SelectionItem[]>([
      { label: '이용약관 동의 (필수)', selected: false },
      { label: '개인정보 수집 및 이용 동의 (필수)', selected: false },
      { label: '마케팅 정보 수신 동의 (선택)', selected: false },
    ]);

    const handleAllClick = () => {
      const newValue = !allSelected;
      setAllSelected(newValue);
      setItems(items.map((item: SelectionItem) => ({ ...item, selected: newValue })));
    };

    const handleItemClick = (index: number) => {
      const newItems = [...items];
      const item = newItems[index];
      if (item) {
        item.selected = !item.selected;
        setItems(newItems);
        setAllSelected(newItems.every((i: SelectionItem) => i.selected));
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '354px' }}>
        <SelectionTile
          size='lg'
          label='모두 동의합니다'
          selected={allSelected}
          onClick={handleAllClick}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((item: SelectionItem, index: number) => (
            <SelectionTile
              key={index}
              size='sm'
              label={item.label}
              selected={item.selected}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    );
  },
};
