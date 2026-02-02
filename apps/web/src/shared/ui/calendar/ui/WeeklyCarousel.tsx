import React from 'react';
import {
  weeklyCarouselContainer,
  weeklyCarouselTrack,
  weeklyCarouselSlide,
} from '../styles/Calendar.css';
import { WeeklyDateGrid } from './WeeklyDateGrid';
import type { CalendarDate } from '../lib';

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
