'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { EditCategoryBtn } from './EditCategoryBtn';
import { CATEGORY_ICON_MAP, CategoryIconType } from './categoryIcons';
import {
  categoryButtonWrapper,
  categoryIconContainer,
  categoryIconSvg,
  categoryLabel,
} from './CategoryBtn.css';

export interface CategoryBtnProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'type'
> {
  /** 버튼 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 버튼 타입 */
  type?: 'primary' | 'secondary' | 'neutral';
  /** 버튼 모드 */
  mode?: 'default' | 'active' | 'plus' | 'edit';
  /** 라벨 표시 여부 */
  hasText?: boolean;
  /** 아이콘 종류 */
  icon: CategoryIconType;
  /** 라벨 텍스트 */
  label?: string;
  /** edit 버튼 클릭 핸들러 */
  onEditClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 하이라이트 여부 (온보딩에서 사용) */
  highlighted?: boolean;
}

export const CategoryBtn = ({
  size = 'md',
  type = 'primary',
  mode = 'default',
  hasText = true,
  icon,
  label,
  onEditClick,
  onClick,
  highlighted = false,
  ...props
}: CategoryBtnProps): React.JSX.Element => {
  const { component: IconComponent, color } = CATEGORY_ICON_MAP[icon];

  return (
    <button className={categoryButtonWrapper()} onClick={onClick} {...props}>
      <div className={categoryIconContainer({ size, type, mode, highlighted })} style={{ color }}>
        <IconComponent className={categoryIconSvg({ size })} />
        {mode === 'edit' && <EditCategoryBtn size={size} onClick={onEditClick} />}
      </div>
      {hasText && label && <span className={categoryLabel({ mode })}>{label}</span>}
    </button>
  );
};
