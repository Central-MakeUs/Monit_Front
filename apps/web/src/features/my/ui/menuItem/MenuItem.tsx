import React from 'react';
import * as styles from './MenuItem.css';
import { Text, Toggle } from '@/shared/ui';
import { vars } from '@/shared/ui/theme.css';
import { IcRightChevron } from 'public/icons';

interface MenuItemProps {
  type?: 'default' | 'arrow' | 'toggle';
  label: string;
}

export const MenuItem = ({ type = 'default', label }: MenuItemProps) => {
  return (
    <div className={styles.container}>
      <Text variant='h3' color={vars.color.text.primary}>
        {label}
      </Text>
      {type === 'toggle' && (
        <>
          <Toggle />
        </>
      )}
      {type === 'arrow' && (
        <>
          <IcRightChevron color={vars.color.text.secondary} />
        </>
      )}
    </div>
  );
};
