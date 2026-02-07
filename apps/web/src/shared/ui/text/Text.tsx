import React, { PropsWithChildren, HTMLAttributes } from 'react';
import * as styles from './Text.css';

export type TypographyVariant =
  | 't5'
  | 't4'
  | 't3'
  | 't2'
  | 't1'
  | 'h5'
  | 'h4'
  | 'h3'
  | 'h2'
  | 'h1'
  | 'b5'
  | 'b4'
  | 'b3'
  | 'b2'
  | 'b1';

type AsElement = 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: AsElement;
  color?: string;
  align?: React.CSSProperties['textAlign'];
  className?: string;
}

export const Text = ({
  variant = 'b3',
  as: Component = 'p',
  color,
  align,
  className,
  style,
  children,
  ...props
}: PropsWithChildren<TextProps>) => {
  return (
    <Component
      className={`${styles.text({ variant })} ${className || ''}`}
      style={{ color, textAlign: align, ...style }}
      {...props}>
      {children}
    </Component>
  );
};
