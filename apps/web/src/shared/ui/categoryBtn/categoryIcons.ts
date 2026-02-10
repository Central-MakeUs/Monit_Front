import React from 'react';
import IcCoin from 'public/icons/ic-coin.svg';
import IcPercent from 'public/icons/ic-percent.svg';
import IcShopping from 'public/icons/ic-shopping.svg';
import IcPlusSimple from 'public/icons/ic-plus-simple.svg';
import IcCook from 'public/icons/ic-cook.svg';
import IcCoffee from 'public/icons/ic-coffee.svg';
import IcCredit from 'public/icons/ic-credit.svg';
import IcBook from 'public/icons/ic-book.svg';
import IcBeauty from 'public/icons/ic-beauty.svg';
import IcBeer from 'public/icons/ic-beer.svg';
import IcCamera from 'public/icons/ic-camera.svg';
import IcCup from 'public/icons/ic-cup.svg';
import { vars } from '../theme.css';

/** 사용 가능한 아이콘 종류 */
export type CategoryIconType =
  | 'coin'
  | 'percent'
  | 'plus'
  | 'shopping'
  | 'cook'
  | 'coffee'
  | 'credit'
  | 'book'
  | 'beauty'
  | 'beer'
  | 'camera'
  | 'cup';

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
  cook: {
    component: IcCook,
    color: vars.color.bg.accent.yellow.default,
  },
  coffee: {
    component: IcCoffee,
    color: vars.color.bg.accent.green.default,
  },
  credit: {
    component: IcCredit,
    color: vars.color.bg.accent.blue.default,
  },
  book: {
    component: IcBook,
    color: vars.color.bg.accent.yellow.default,
  },
  beauty: {
    component: IcBeauty,
    color: vars.color.bg.accent.green.default,
  },
  beer: {
    component: IcBeer,
    color: vars.color.bg.accent.yellow.default,
  },
  camera: {
    component: IcCamera,
    color: vars.color.bg.accent.green.default,
  },
  cup: {
    component: IcCup,
    color: vars.color.bg.accent.blue.default,
  },
} as const;
