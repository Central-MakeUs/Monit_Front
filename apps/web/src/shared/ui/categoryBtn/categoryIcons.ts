import React from 'react';
import IcCoin from 'public/icons/ic-coin.svg';
import IcPercent from 'public/icons/ic-percent.svg';
import IcShopping from 'public/icons/ic-shopping.svg';
import IcPlusSimple from 'public/icons/ic-plus-simple.svg';
import { vars } from '../theme.css';

/** 사용 가능한 아이콘 종류 */
export type CategoryIconType = 'coin' | 'percent' | 'shopping' | 'plus';

type IconComponent = React.ComponentType<{ className?: string }>;

/**
 * 아이콘 설정 타입
 * @property component - SVGR 컴포넌트
 * @property color - 아이콘 색상 (semantic token)
 */
interface IconConfig {
  component: IconComponent;
  color: string;
}

/**
 * 카테고리 아이콘 타입별 컴포넌트 및 색상 매핑
 * - 아이콘 추가 시 이 맵에 등록
 */
export const CATEGORY_ICON_MAP: Record<CategoryIconType, IconConfig> = {
  coin: {
    component: IcCoin,
    color: vars.color.bg.accent.yellow.default,
  },
  percent: {
    component: IcPercent,
    color: vars.color.bg.accent.green.default,
  },
  shopping: {
    component: IcShopping,
    color: vars.color.bg.accent.blue.default,
  },
  plus: {
    component: IcPlusSimple,
    color: vars.color.border.default,
  },
} as const;
