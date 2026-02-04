import React, { ReactNode } from 'react';
import { Text } from '../text';
import * as styles from './Badge.css';
import { vars, primitiveColors } from '../theme.css';
import type { EvaluationType } from '@/shared/types/evaluation.types';

const BADGE_COLOR_MAP: Record<EvaluationType, { bg: string; border: string; text: string }> = {
  VERY_SATISFIED: {
    bg: primitiveColors.blue[100],
    border: primitiveColors.blue[200],
    text: primitiveColors.blue[400],
  },
  SATISFIED: {
    bg: primitiveColors.green[50],
    border: primitiveColors.green[100],
    text: primitiveColors.green[300],
  },
  NORMAL: {
    bg: primitiveColors.yellow[50],
    border: primitiveColors.yellow[200],
    text: primitiveColors.yellow[500],
  },
  DISAPPOINTED: {
    bg: primitiveColors.primary[50],
    border: primitiveColors.primary[100],
    text: primitiveColors.primary[400],
  },
  VERY_DISAPPOINTED: {
    bg: primitiveColors.red[50],
    border: primitiveColors.red[100],
    text: primitiveColors.red[400],
  },
};

export interface BadgeProps {
  label: string;
  icon?: ReactNode;
  size?: 'sm' | 'lg';
  backgroundColor?: string;
  evaluationType?: EvaluationType;
}

export const Badge = ({
  label,
  size = 'lg',
  icon,
  backgroundColor = vars.color.bg.neutral.subtle,
  evaluationType,
}: BadgeProps) => {
  const colors = evaluationType ? BADGE_COLOR_MAP[evaluationType] : undefined;

  const containerStyle =
    size === 'lg' && colors
      ? { backgroundColor: colors.bg, borderColor: colors.border }
      : { backgroundColor };

  const textColor = colors ? colors.text : vars.color.text.secondary;

  return (
    <div className={styles.badgeContainer({ size, hasState: !!colors })} style={containerStyle}>
      {icon && (
        <div
          className={styles.icon({ size })}
          style={{ color: colors ? colors.text : vars.color.icon.tertiary }}>
          {icon}
        </div>
      )}
      <Text variant={size === 'sm' ? 'b1' : 'b2'} color={textColor}>
        {label}
      </Text>
    </div>
  );
};
