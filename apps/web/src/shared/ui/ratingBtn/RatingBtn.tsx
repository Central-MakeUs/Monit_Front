'use client';

import React, { ComponentType, type ButtonHTMLAttributes } from 'react';
import {
  IcVerySatisfied,
  IcSatisfied,
  IcNormal,
  IcDisappointed,
  IcVeryDisappointed,
  IcGrayVerySatisfied,
  IcGraySatisfied,
  IcGrayNormal,
  IcGrayDisappointed,
  IcGrayVeryDisappointed,
} from 'public/icons';
import type { EvaluationType } from '@/shared/types/evaluation.types';
import { ratingButtonWrapper, ratingIconContainer, ratingIconSvg } from './RatingBtn.css';
import { Text } from '../text';
import { vars, primitiveColors } from '../theme.css';

type IconComponent = ComponentType<{ className?: string }>;

const RATING_ICON_MAP: Record<EvaluationType, IconComponent> = {
  VERY_SATISFIED: IcVerySatisfied,
  SATISFIED: IcSatisfied,
  NORMAL: IcNormal,
  DISAPPOINTED: IcDisappointed,
  VERY_DISAPPOINTED: IcVeryDisappointed,
};

const RATING_GRAY_ICON_MAP: Record<EvaluationType, IconComponent> = {
  VERY_SATISFIED: IcGrayVerySatisfied,
  SATISFIED: IcGraySatisfied,
  NORMAL: IcGrayNormal,
  DISAPPOINTED: IcGrayDisappointed,
  VERY_DISAPPOINTED: IcGrayVeryDisappointed,
};

const RATING_COLOR_MAP: Record<EvaluationType, { bg: string; border: string }> = {
  VERY_SATISFIED: { bg: primitiveColors.blue[100], border: primitiveColors.blue[200] },
  SATISFIED: { bg: primitiveColors.green[50], border: primitiveColors.green[100] },
  NORMAL: { bg: primitiveColors.yellow[50], border: primitiveColors.yellow[100] },
  DISAPPOINTED: { bg: primitiveColors.primary[50], border: primitiveColors.primary[100] },
  VERY_DISAPPOINTED: { bg: primitiveColors.red[50], border: primitiveColors.red[100] },
};

export interface RatingBtnProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'type'
> {
  /** 크기 */
  size: 'md' | 'lg';
  /** 평가 타입 */
  type: EvaluationType;
  /** 선택 여부 */
  selected?: boolean;
  /** 라벨 */
  label?: string;
}

export const RatingBtn = ({
  size,
  type,
  selected = false,
  label,
  onClick,
  ...props
}: RatingBtnProps) => {
  const IconComponent = selected ? RATING_ICON_MAP[type] : RATING_GRAY_ICON_MAP[type];
  const colors = RATING_COLOR_MAP[type];

  return (
    <button className={ratingButtonWrapper()} onClick={onClick} {...props}>
      <div
        className={ratingIconContainer({ selected, size })}
        style={selected ? { backgroundColor: colors.bg, borderColor: colors.border } : undefined}>
        <IconComponent className={ratingIconSvg()} />
      </div>
      {label && (
        <Text variant='b2' color={vars.color.text.secondary}>
          {label}
        </Text>
      )}
    </button>
  );
};
