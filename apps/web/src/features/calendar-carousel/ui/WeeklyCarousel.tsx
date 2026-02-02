/**
 * @module features/calendar-carousel
 * @description 주간 캘린더 캐러셀 UI 컴포넌트
 * FSD: features layer
 */

'use client';

import React from 'react';
import { weeklyCarouselContainer, weeklyCarouselTrack, weeklyCarouselSlide } from './Carousel.css';
import { WeeklyDateGrid } from '@/shared/ui/calendar';
import type { CalendarDate } from '@/shared/lib/calendar';

interface WeeklyCarouselProps {
  prevWeek: CalendarDate[];
  currentWeek: CalendarDate[];
  nextWeek: CalendarDate[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  trackRef: React.RefObject<HTMLDivElement | null>;
  handlers: ReturnType<typeof import('react-swipeable').useSwipeable>;
  transform: string;
  transition: string;
  onTransitionEnd: () => void;
}

export const WeeklyCarousel = ({
  prevWeek,
  currentWeek,
  nextWeek,
  selectedDate,
  onDateSelect,
  trackRef,
  handlers,
  transform,
  transition,
  onTransitionEnd,
}: WeeklyCarouselProps) => {
  return (
    <div className={weeklyCarouselContainer} {...handlers}>
      <div
        ref={trackRef}
        className={weeklyCarouselTrack}
        onTransitionEnd={onTransitionEnd}
        style={{
          transform,
          transition,
        }}>
        <div className={weeklyCarouselSlide}>
          <WeeklyDateGrid
            weekDates={prevWeek}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
          />
        </div>

        <div className={weeklyCarouselSlide}>
          <WeeklyDateGrid
            weekDates={currentWeek}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
          />
        </div>

        <div className={weeklyCarouselSlide}>
          <WeeklyDateGrid
            weekDates={nextWeek}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
          />
        </div>
      </div>
    </div>
  );
};
