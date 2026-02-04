import React, { ReactNode } from 'react';
import { Text } from '../text';
import * as styles from './Badge.css';
import { vars } from '../theme.css';
import type { EvaluationType } from '@/shared/types/evaluation.types';
import { IcBadge } from 'public/icons';
import { EVALUATION_COLOR_MAP } from '../tokens/evaluationColors';

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
  icon = <IcBadge />,
  backgroundColor = vars.color.bg.neutral.subtle,
  evaluationType,
}: BadgeProps) => {
  const colors = evaluationType ? EVALUATION_COLOR_MAP[evaluationType] : undefined;

  const containerStyle =
    size === 'lg' && colors
      ? { backgroundColor: colors.bg, borderColor: colors.border }
      : { backgroundColor };

  const textColor = colors ? colors.text : vars.color.text.secondary;

  return (
    <div className={styles.badgeContainer({ size, hasState: !!colors })} style={containerStyle}>
      {icon && evaluationType && (
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
