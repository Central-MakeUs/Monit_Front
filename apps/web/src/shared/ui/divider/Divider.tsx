import React from 'react';
import * as styles from './Divider.css';

export interface DividerProps {
  color?: string;
}

export const Divider = ({ color }: DividerProps) => {
  return <div className={styles.divider} style={color ? { backgroundColor: color } : undefined} />;
};
