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
import { vars } from '../theme.css';
import { EVALUATION_COLOR_MAP } from '../tokens/evaluationColors';

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
  /** 읽기 전용 (클릭 불가) */
  readOnly?: boolean;
  /** 라벨 */
  label?: string;
}

export const RatingBtn = ({
  size,
  type,
  selected = false,
  readOnly = false,
  label,
  onClick,
  ...props
}: RatingBtnProps) => {
  const IconComponent = selected ? RATING_ICON_MAP[type] : RATING_GRAY_ICON_MAP[type];
  const colors = EVALUATION_COLOR_MAP[type];

  return (
    <button
      className={ratingButtonWrapper({ readOnly })}
      onClick={readOnly ? undefined : onClick}
      {...props}>
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
