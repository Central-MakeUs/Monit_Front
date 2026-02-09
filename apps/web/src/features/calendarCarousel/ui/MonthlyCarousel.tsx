/**
 * @module features/calendar-carousel
 * @description 월간 캘린더 캐러셀 UI 컴포넌트
 * FSD: features layer
 */

'use client';

import React from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  monthlyCarouselContainer,
  monthlyCarouselTrack,
  monthlyCarouselSlide,
  containerHeightVar,
  heightTransitionVar,
} from './Carousel.css';
import { CalendarGrid } from '@/shared/ui/calendar';
import type { CalendarDate } from '@/shared/lib/calendar';

interface MonthlyCarouselProps {
  prevMonth: CalendarDate[];
  currentMonth: CalendarDate[];
  nextMonth: CalendarDate[];
  selectedDate: Date | null;
  size?: 'md' | 'lg';
  showText?: boolean;
  renderDateText?: (date: Date) => string | undefined;
  onDateSelect: (date: Date) => void;
  trackRef: React.RefObject<HTMLDivElement | null>;
  handlers: ReturnType<typeof import('react-swipeable').useSwipeable>;
  transform: string;
  transition: string;
  onTransitionEnd: () => void;
  containerHeight: number;
  shouldTransitionHeight: boolean;
}

export const MonthlyCarousel = ({
  prevMonth,
  currentMonth,
  nextMonth,
  selectedDate,
  size = 'lg',
  showText = false,
  renderDateText,
  onDateSelect,
  trackRef,
  handlers,
  transform,
  transition,
  onTransitionEnd,
  containerHeight,
  shouldTransitionHeight,
}: MonthlyCarouselProps) => {
  return (
    <div
      className={monthlyCarouselContainer}
      {...handlers}
      style={assignInlineVars({
        [containerHeightVar]: containerHeight > 0 ? `${containerHeight}px` : 'auto',
        [heightTransitionVar]: shouldTransitionHeight
          ? 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          : 'none',
      })}>
      <div
        ref={trackRef}
        className={monthlyCarouselTrack}
        onTransitionEnd={onTransitionEnd}
        style={{
          transform,
          transition,
        }}>
        <div className={monthlyCarouselSlide}>
          <CalendarGrid
            dates={prevMonth}
            selectedDate={selectedDate}
            size={size}
            showText={showText}
            renderDateText={renderDateText}
            onDateSelect={onDateSelect}
          />
        </div>

        <div className={monthlyCarouselSlide}>
          <CalendarGrid
            dates={currentMonth}
            selectedDate={selectedDate}
            size={size}
            showText={showText}
            renderDateText={renderDateText}
            onDateSelect={onDateSelect}
          />
        </div>

        <div className={monthlyCarouselSlide}>
          <CalendarGrid
            dates={nextMonth}
            selectedDate={selectedDate}
            size={size}
            showText={showText}
            renderDateText={renderDateText}
            onDateSelect={onDateSelect}
          />
        </div>
      </div>
    </div>
  );
};
