import React from 'react';
import { Text, CategoryBtn, CategoryIconType } from '@/shared/ui';
import { vars } from '@/shared/ui/theme.css';
import * as styles from './CategoryGrid.css';

export interface CategoryItem {
  id: string;
  icon: CategoryIconType;
  label: string;
}

export interface CategoryGridProps {
  type?: 'bottomSheet' | 'expense';
  /** 섹션 라벨 */
  label?: string;
  /** 전체 카테고리 개수 (뱃지에 표시) */
  count?: number;
  /** 카테고리 목록 */
  categories: CategoryItem[];
  /** 선택된 카테고리 ID */
  selectedId?: string | null;
  /** 최대 노출 개수 */
  maxVisible?: number;
  /** 카테고리 선택 시 콜백 */
  onSelect?: (category: CategoryItem) => void;
  /** 더보기 클릭 시 콜백 */
  onMoreClick?: () => void;
}

export const CategoryGrid = ({
  type = 'bottomSheet',
  label = '카테고리',
  categories,
  selectedId,
  maxVisible = 7,
  onSelect,
  onMoreClick,
}: CategoryGridProps) => {
  const visibleCategories = categories.slice(0, maxVisible);
  const hasMoreCategories = categories.length > maxVisible;

  return (
    <div className={type === 'expense' ? styles.expenseWrapper : styles.wrapper}>
      <div className={styles.header}>
        <Text
          variant={type === 'expense' ? 'h3' : 'b3'}
          color={type === 'expense' ? vars.color.text.primary : vars.color.text.secondary}>
          {label}
        </Text>
      </div>
      <div className={styles.grid}>
        {visibleCategories.map((category) => (
          <CategoryBtn
            key={category.id}
            icon={category.icon}
            label={category.label}
            mode={selectedId === category.id ? 'active' : 'default'}
            onClick={() => onSelect?.(category)}
          />
        ))}
        {(hasMoreCategories || categories.length > 0) && (
          <CategoryBtn icon='plus' label='더보기' mode='default' onClick={onMoreClick} />
        )}
      </div>
    </div>
  );
};
