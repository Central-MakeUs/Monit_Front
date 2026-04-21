import React from 'react';
import * as styles from './CategoryBottomSheet.css';
import { BaseBottomSheetTemplate, CategoryBtn, CategoryItem } from '@/shared/ui';

export interface IconPickerBottomSheetTemplateProps {
  /** 아이콘 목록 */
  categories: CategoryItem[];
  /** 선택된 아이콘 ID */
  selectedId?: string | null;
  /** 아이콘 선택 시 콜백 */
  onSelect?: (category: CategoryItem) => void;
  /** 선택 버튼 클릭 시 콜백 */
  onConfirm?: () => void;
}

export const IconPickerBottomSheetTemplate = ({
  categories,
  selectedId,
  onSelect,
  onConfirm,
}: IconPickerBottomSheetTemplateProps) => {
  return (
    <BaseBottomSheetTemplate>
      <BaseBottomSheetTemplate.Header type='close' text='아이콘' />
      <BaseBottomSheetTemplate.Content>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <CategoryBtn
              key={category.id}
              icon={category.icon}
              mode={selectedId === category.id ? 'active' : 'default'}
              onClick={() => onSelect?.(category)}
            />
          ))}
        </div>
      </BaseBottomSheetTemplate.Content>
      <BaseBottomSheetTemplate.Button label='선택' onClick={onConfirm} isGradation={true} />
      <BaseBottomSheetTemplate.Gradient />
    </BaseBottomSheetTemplate>
  );
};
