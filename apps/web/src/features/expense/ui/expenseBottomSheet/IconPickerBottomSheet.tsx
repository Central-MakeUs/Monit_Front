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
  /** X 버튼 클릭 시 콜백 */
  onClose?: () => void;
}

export const IconPickerBottomSheetTemplate = ({
  categories,
  selectedId,
  onSelect,
  onConfirm,
  onClose,
}: IconPickerBottomSheetTemplateProps) => {
  return (
    <BaseBottomSheetTemplate>
      <BaseBottomSheetTemplate.Header type='close' text='아이콘' onClose={onClose} />
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
