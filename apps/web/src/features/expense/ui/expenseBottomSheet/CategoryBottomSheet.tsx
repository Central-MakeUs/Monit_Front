import React from 'react';
import * as styles from './CategoryBottomSheet.css';
import { BaseBottomSheetTemplate, CategoryBtn, CategoryIconType } from '@/shared/ui';

// TODO: 타입 수정
export interface Category {
  id: string;
  icon: CategoryIconType;
  label: string;
}

export interface CategoryBottomSheetTemplateProps {
  /** 카테고리 목록 */
  categories: Category[];
  /** 선택된 카테고리 ID */
  selectedId?: string | null;
  /** 카테고리 선택 시 콜백 */
  onSelect?: (category: Category) => void;
  /** + 추가 버튼 클릭 시 콜백 */
  onAddClick?: () => void;
  /** 선택 버튼 클릭 시 콜백 */
  onConfirm?: () => void;
}

export const CategoryBottomSheetTemplate = ({
  categories,
  selectedId,
  onSelect,
  onAddClick,
  onConfirm,
}: CategoryBottomSheetTemplateProps) => {
  const needsScroll = categories.length > 12;

  return (
    <BaseBottomSheetTemplate>
      <BaseBottomSheetTemplate.Header type='add' text='카테고리' onClickAddBtn={onAddClick} />
      <BaseBottomSheetTemplate.Content>
        <div className={needsScroll ? styles.categoryGridScrollable : styles.categoryGrid}>
          {categories.map((category) => (
            <CategoryBtn
              key={category.id}
              icon={category.icon}
              label={category.label}
              mode={selectedId === category.id ? 'active' : 'default'}
              onClick={() => onSelect?.(category)}
            />
          ))}
        </div>
      </BaseBottomSheetTemplate.Content>
      <BaseBottomSheetTemplate.Button label='선택' onClick={onConfirm} isGradation={needsScroll} />
      {needsScroll && <BaseBottomSheetTemplate.Gradient />}
    </BaseBottomSheetTemplate>
  );
};
