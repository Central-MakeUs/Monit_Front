import React from 'react';
import * as styles from './MenuItem.css';
import { Text, Toggle } from '@/shared/ui';
import { vars } from '@/shared/ui/theme.css';
import { IcRightChevron } from 'public/icons';

interface MenuItemProps {
  type?: 'default' | 'arrow' | 'toggle';
  label: string;
  onClick?: () => void;
  checked?: boolean;
  onToggleChange?: (checked: boolean) => void;
}

export const MenuItem = ({
  type = 'default',
  label,
  onClick,
  checked,
  onToggleChange,
}: MenuItemProps) => {
  return (
    <button className={styles.container} onClick={type !== 'toggle' ? onClick : undefined}>
      <Text variant='h3' color={vars.color.text.primary}>
        {label}
      </Text>
      {type === 'toggle' && (
        <>
          <Toggle checked={checked} onChange={onToggleChange} />
        </>
      )}
      {type === 'arrow' && (
        <>
          <IcRightChevron color={vars.color.text.secondary} />
        </>
      )}
    </button>
  );
};
