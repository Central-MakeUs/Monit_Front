'use client';

import React from 'react';
import IcEditCategory from 'public/icons/ic-edit-category.svg';
import { editButton, editIcon } from './CategoryBtn.css';

export interface EditCategoryBtnProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const EditCategoryBtn = ({
  size = 'md',
  onClick,
}: EditCategoryBtnProps): React.JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const mouseEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }) as unknown as React.MouseEvent<HTMLElement>;
      handleClick(mouseEvent);
    }
  };

  return (
    <div
      className={editButton({ size })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
      aria-label='편집'>
      <IcEditCategory className={editIcon} />
    </div>
  );
};
