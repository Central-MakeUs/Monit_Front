/**
 * @module features/calendar-carousel
 * @description 캐러셀 스타일
 * FSD: features layer
 */

import { style, createVar } from '@vanilla-extract/css';

// ==================== Monthly Carousel ====================

export const containerHeightVar = createVar();
export const heightTransitionVar = createVar();

export const monthlyCarouselContainer = style({
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  height: containerHeightVar,
  transition: heightTransitionVar,
});

export const monthlyCarouselTrack = style({
  display: 'flex',
  gap: 0,
  willChange: 'transform',
  backfaceVisibility: 'hidden',
  alignItems: 'flex-start',
});

export const monthlyCarouselSlide = style({
  width: '100%',
  minWidth: '100%',
  flexShrink: 0,
});

// ==================== Weekly Carousel ====================

export const weeklyCarouselContainer = style({
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
});

export const weeklyCarouselTrack = style({
  display: 'flex',
  gap: 0,
  willChange: 'transform',
  backfaceVisibility: 'hidden',
});

export const weeklyCarouselSlide = style({
  width: '100%',
  minWidth: '100%',
  flexShrink: 0,
});
