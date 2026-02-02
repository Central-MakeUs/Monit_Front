'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { Text } from '@/shared/ui/text/Text';
import { emotions } from '@/shared/constants';
import * as styles from './ScrollPicker.css';

interface ScrollPickerProps {
  selectedIndex: number;
  onIndexChange: (index: number) => void;
}

const ITEM_COUNT = emotions.length;

export const ScrollPicker = ({ selectedIndex, onIndexChange }: ScrollPickerProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // 초기 위치 설정
  useEffect(() => {
    if (!listRef.current) return;
    const initialScroll = selectedIndex * styles.PICKER_ITEM_HEIGHT;
    listRef.current.scrollTop = initialScroll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 외부에서 selectedIndex가 변경되면 스크롤 위치 동기화
  useEffect(() => {
    if (!listRef.current || isScrolling.current) return;

    const targetScroll = selectedIndex * styles.PICKER_ITEM_HEIGHT;
    listRef.current.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, [selectedIndex]);

  const handleScroll = useCallback(() => {
    if (!listRef.current) return;

    isScrolling.current = true;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      if (!listRef.current) return;

      const scrollTop = listRef.current.scrollTop;
      const newIndex = Math.round(scrollTop / styles.PICKER_ITEM_HEIGHT);

      // 범위 체크
      const clampedIndex = Math.max(0, Math.min(newIndex, ITEM_COUNT - 1));

      // 스냅
      const targetScroll = clampedIndex * styles.PICKER_ITEM_HEIGHT;
      listRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });

      if (clampedIndex !== selectedIndex) {
        onIndexChange(clampedIndex);
      }

      isScrolling.current = false;
    }, 50);
  }, [selectedIndex, onIndexChange]);

  const handleItemClick = useCallback(
    (index: number) => {
      if (!listRef.current) return;

      const targetScroll = index * styles.PICKER_ITEM_HEIGHT;
      listRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });

      onIndexChange(index);
    },
    [onIndexChange]
  );

  return (
    <div className={styles.pickerContainer}>
      <div ref={listRef} className={styles.pickerList} onScroll={handleScroll}>
        <div className={styles.pickerPadding} />
        {emotions.map((emotion, index) => {
          const isActive = index === selectedIndex;
          return (
            <Text
              variant='b5'
              as='div'
              key={emotion.value}
              className={styles.pickerItem({ active: isActive })}
              onClick={() => handleItemClick(index)}>
              {emotion.label}
            </Text>
          );
        })}
        <div className={styles.pickerPadding} />
      </div>
    </div>
  );
};
