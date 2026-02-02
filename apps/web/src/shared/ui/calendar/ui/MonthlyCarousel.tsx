'use client';

import React from 'react';
import {
  monthlyCarouselContainer,
  monthlyCarouselTrack,
  monthlyCarouselSlide,
} from '../styles/Calendar.css';
import { CalendarGrid } from '../CalendarGrid';
import type { CalendarDate } from '../lib';

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
}: MonthlyCarouselProps) => {
  return (
    <div className={monthlyCarouselContainer} {...handlers}>
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
