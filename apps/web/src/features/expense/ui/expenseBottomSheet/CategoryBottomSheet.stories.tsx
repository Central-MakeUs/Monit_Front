import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { BottomSheet } from '@/shared/ui/bottomSheet';
import { Button } from '@/shared/ui';
import { CategoryBottomSheetTemplate, Category } from './CategoryBottomSheet';
import { useModal } from '@/shared/hooks';
import { getFigmaUrl } from '@/shared/config/figma';

const meta = {
  title: 'Components/BottomSheet/CategoryBottomSheet',
  component: CategoryBottomSheetTemplate,
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
          'CategoryBottomSheet는 소비 카테고리를 선택하는 바텀시트 컴포넌트입니다.',
          '',
          '## 주요 기능',
          '- **categories**: 표시할 카테고리 목록입니다.',
          '- **selectedId**: 현재 선택된 카테고리 ID입니다.',
          '- **onSelect**: 카테고리 선택 시 호출되는 콜백입니다.',
          '- **onAddClick**: 카테고리 추가 버튼 클릭 시 호출되는 콜백입니다.',
          '- **onConfirm**: 선택 완료 버튼 클릭 시 호출되는 콜백입니다.',
          '- CategoryGrid를 사용하여 카테고리를 그리드 형태로 표시합니다.',
          '- 스크롤 가능한 컨텐츠 영역을 제공합니다.',
          '',
          '## 사용 예시',
          '```tsx',
          'const [selectedId, setSelectedId] = useState(null);',
          '',
          '<CategoryBottomSheetTemplate',
          '  categories={categories}',
          '  selectedId={selectedId}',
          '  onSelect={(category) => setSelectedId(category.id)}',
          '  onAddClick={() => {}}',
          '  onConfirm={() => {}}',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    categories: {
      description: '카테고리 목록 (id, icon, label 포함)',
      table: {
        type: { summary: 'Category[]' },
      },
    },
    selectedId: {
      control: 'text',
      description: '선택된 카테고리 ID',
      table: {
        type: { summary: 'string | null' },
      },
    },
    onSelect: {
      description: '카테고리 선택 시 콜백',
      table: {
        type: { summary: '(category: Category) => void' },
      },
    },
    onAddClick: {
      description: '카테고리 추가 버튼 클릭 시 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
    onConfirm: {
      description: '선택 버튼 클릭 시 콜백',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof CategoryBottomSheetTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCategories: Category[] = [
  { id: '1', icon: 'shopping', label: '간식' },
  { id: '2', icon: 'coin', label: '자기계발비' },
  { id: '3', icon: 'percent', label: '할인' },
  { id: '4', icon: 'shopping', label: '쇼핑' },
  { id: '5', icon: 'shopping', label: '식비' },
  { id: '6', icon: 'coin', label: '교통비' },
  { id: '7', icon: 'percent', label: '문화생활' },
  { id: '8', icon: 'shopping', label: '패션' },
  { id: '9', icon: 'shopping', label: '뷰티' },
  { id: '10', icon: 'coin', label: '건강' },
  { id: '11', icon: 'percent', label: '취미' },
  { id: '12', icon: 'shopping', label: '여행' },
  { id: '13', icon: 'shopping', label: '카페' },
  { id: '14', icon: 'coin', label: '공과금' },
  { id: '15', icon: 'percent', label: '선물' },
  { id: '16', icon: 'shopping', label: '반려동물' },
  { id: '17', icon: 'shopping', label: '기타' },
  { id: '18', icon: 'shopping', label: '미분류' },
];

export const Default: Story = {
  name: '기본 카테고리 선택',
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
            카테고리 선택 열기
          </Button>

          <BottomSheet isOpen={isOpen} onClose={closeModal}>
            <CategoryBottomSheetTemplate
              categories={mockCategories}
              selectedId={selectedId}
              onSelect={(category) => setSelectedId(category.id)}
              onAddClick={() => alert('카테고리 추가')}
              onConfirm={() => {
                alert(`선택된 카테고리: ${selectedId}`);
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
          '여러 카테고리 중에서 하나를 선택할 수 있는 기본 카테고리 선택 바텀시트입니다. + 버튼을 눌러 새 카테고리를 추가할 수 있습니다.',
      },
    },
    story: {
      inline: false,
      height: '600px',
    },
  },
};
