import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { BottomSheet } from '@/shared/ui/bottomSheet';
import { Button } from '@/shared/ui';
import { IconPickerBottomSheetTemplate } from './IconPickerBottomSheet';
import { Category } from './CategoryBottomSheet';
import { useModal } from '@/shared/hooks';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/BottomSheet/IconPickerBottomSheet',
  component: IconPickerBottomSheetTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: getFigmaUrl('1347-6824'),
    },
    docs: {
      description: {
        component: [
          'IconPickerBottomSheet는 카테고리 아이콘을 선택하는 바텀시트 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **categories**: 표시할 아이콘 목록입니다 (라벨 없이 아이콘만 표시).',
          '- **selectedId**: 현재 선택된 아이콘 ID입니다.',
          '- **onSelect**: 아이콘 선택 시 호출되는 콜백입니다.',
          '- **onConfirm**: 선택 완료 버튼 클릭 시 호출되는 콜백입니다.',
          '- **onClose**: 닫기 버튼 클릭 시 호출되는 콜백입니다.',
          '- CategoryButton을 사용하여 아이콘을 그리드 형태로 표시합니다.',
          '- 스크롤 가능한 컨텐츠 영역을 제공합니다.',
          '',
          '## 사용 예시',
          '```tsx',
          'const [selectedId, setSelectedId] = useState(null);',
          '',
          '<IconPickerBottomSheetTemplate',
          '  categories={categories}',
          '  selectedId={selectedId}',
          '  onSelect={(category) => setSelectedId(category.id)}',
          '  onConfirm={() => {}}',
          '  onClose={() => {}}',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    categories: {
      description: '아이콘 목록 (id, icon 포함, label은 표시되지 않음)',
      table: {
        type: { summary: 'Category[]' },
      },
    },
    selectedId: {
      control: 'text',
      description: '선택된 아이콘 ID',
      table: {
        type: { summary: 'string | null' },
      },
    },
    onSelect: {
      description: '아이콘 선택 시 콜백',
      table: {
        type: { summary: '(category: Category) => void' },
      },
    },
    onConfirm: {
      description: '선택 버튼 클릭 시 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClose: {
      description: '닫기 버튼 클릭 시 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof IconPickerBottomSheetTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCategories: Category[] = [
  { id: '1', icon: 'shopping', label: '쇼핑' },
  { id: '2', icon: 'coin', label: '동전' },
  { id: '3', icon: 'percent', label: '퍼센트' },
  { id: '4', icon: 'shopping', label: '쇼핑백' },
  { id: '5', icon: 'shopping', label: '카트' },
  { id: '6', icon: 'coin', label: '지갑' },
  { id: '7', icon: 'percent', label: '할인' },
  { id: '8', icon: 'shopping', label: '선물' },
  { id: '9', icon: 'shopping', label: '옷' },
  { id: '10', icon: 'coin', label: '돈' },
  { id: '11', icon: 'percent', label: '세일' },
  { id: '12', icon: 'shopping', label: '가방' },
  { id: '13', icon: 'shopping', label: '신발' },
  { id: '14', icon: 'coin', label: '카드' },
  { id: '15', icon: 'percent', label: '쿠폰' },
  { id: '16', icon: 'shopping', label: '박스' },
  { id: '17', icon: 'shopping', label: '태그' },
  { id: '18', icon: 'shopping', label: '영수증' },
];

export const Default: Story = {
  name: '기본 아이콘 선택',
  args: {
    categories: mockCategories,
  },
  render: () => {
    const TemplateDemo = () => {
      const { isOpen, openModal, closeModal } = useModal();
      const [selectedId, setSelectedId] = useState<string | null>('3');

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
          <Button variant='brand' onClick={openModal}>
            아이콘 선택 열기
          </Button>

          <BottomSheet isOpen={isOpen} onClose={closeModal}>
            <IconPickerBottomSheetTemplate
              categories={mockCategories}
              selectedId={selectedId}
              onSelect={(category) => setSelectedId(category.id)}
              onClose={closeModal}
              onConfirm={() => {
                alert(`선택된 아이콘: ${selectedId}`);
                closeModal();
              }}
            />
          </BottomSheet>
        </div>
      );
    };

    return <TemplateDemo />;
  },
  parameters: {
    docs: {
      description: {
        story:
          '여러 아이콘 중에서 하나를 선택할 수 있는 기본 아이콘 선택 바텀시트입니다. 카테고리를 생성하거나 수정할 때 아이콘을 지정할 수 있습니다.',
      },
    },
    story: {
      inline: false,
      height: '600px',
    },
  },
};
