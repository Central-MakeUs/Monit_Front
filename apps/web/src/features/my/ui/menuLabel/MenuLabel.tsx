import React from 'react';
import { Text } from '@/shared/ui';
import * as styles from './MenuLabel.css';
import { vars } from '@/shared/ui/theme.css';

interface MenuLabelProps {
  label: string;
}

export const MenuLabel = ({ label }: MenuLabelProps) => {
  return (
    <div className={styles.container}>
      <Text variant='h2' color={vars.color.text.secondary} align='start'>
        {label}
      </Text>
    </div>
  );
};
