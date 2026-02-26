import React from 'react';
import { Text } from '../text';
import * as styles from './Badge.css';
import { vars } from '../theme.css';
import type { EvaluationType } from '@/shared/types/evaluation.types';
import {
  IcVerySatisfied,
  IcSatisfied,
  IcNormal,
  IcDisappointed,
  IcVeryDisappointed,
} from 'public/icons';
import { EVALUATION_COLOR_MAP } from '../tokens/evaluationColors';

const EVALUATION_ICON_MAP: Record<EvaluationType, React.ComponentType<{ className?: string }>> = {
  VERY_SATISFIED: IcVerySatisfied,
  SATISFIED: IcSatisfied,
  NORMAL: IcNormal,
  DISAPPOINTED: IcDisappointed,
  VERY_DISAPPOINTED: IcVeryDisappointed,
};

export interface BadgeProps {
  label: string;
  size?: 'xs' | 'sm';
  backgroundColor?: string;
  evaluationType?: EvaluationType;
}

export const Badge = ({
  label,
  size = 'sm',
  backgroundColor = vars.color.bg.neutral.subtle,
  evaluationType,
}: BadgeProps) => {
  const colors = evaluationType ? EVALUATION_COLOR_MAP[evaluationType] : undefined;
  const EmojiIcon = evaluationType ? EVALUATION_ICON_MAP[evaluationType] : undefined;

  const isSm = size === 'sm';
  const effectiveBackground = size === 'xs' ? vars.color.bg.neutral.subtle : backgroundColor;

  const containerStyle = isSm
    ? colors
      ? {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          borderStyle: 'solid',
          borderWidth: '0.8px',
        }
      : {
          backgroundColor: effectiveBackground,
          borderColor: vars.color.border.default,
          borderStyle: 'solid',
          borderWidth: '0.8px',
        }
    : {
        backgroundColor: effectiveBackground,
      };

  const textColor = colors && isSm ? colors.text : vars.color.text.secondary;
  const iconColor = colors && isSm ? colors.text : vars.color.icon.tertiary;

  return (
    <div className={styles.badgeContainer({ size, hasState: !!colors })} style={containerStyle}>
      {evaluationType && EmojiIcon && (
        <div className={styles.iconWrapper} style={{ color: iconColor }}>
          <EmojiIcon className={styles.icon({ size })} />
        </div>
      )}
      <Text variant={size === 'sm' ? 'b2' : 'b1'} color={textColor}>
        {label}
      </Text>
    </div>
  );
};
