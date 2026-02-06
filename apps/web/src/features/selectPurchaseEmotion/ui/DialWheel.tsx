'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { emotions } from '@/shared/constants';
import * as styles from './DialWheel.css';
import { Text } from '@/shared/ui';

interface DialWheelProps {
  selectedIndex: number;
  onIndexChange: (index: number) => void;
}

const ITEM_COUNT = emotions.length;
const TOTAL_ANGLE = 140; // 전체 사용 각도 (180보다 작으면 간격이 좁아짐)
const ANGLE_PER_ITEM = TOTAL_ANGLE / (ITEM_COUNT - 1);

//숫자 작아질 수록 안으로 들어가
const WHEEL_RADIUS = 120; // 텍스트가 위치할 반지름 (중앙원과 바깥원 사이)

// 회전 범위 제한 (0도 ~ 최대 회전각)
const MIN_ROTATION = 0;
const MAX_ROTATION = -TOTAL_ANGLE;

export const DialWheel = ({ selectedIndex, onIndexChange }: DialWheelProps) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startAngle = useRef(0);
  const initialRotation = -selectedIndex * ANGLE_PER_ITEM;
  const currentRotation = useRef(initialRotation);
  const [rotation, setRotation] = useState(initialRotation);
  const isInternalChange = useRef(false);

  // ScrollPicker에서 selectedIndex가 변경되면 첫 번째 세트로 동기화
  useEffect(() => {
    // DialWheel 내부에서 변경한 경우 스킵 (현재 위치 유지)
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }

    const targetRotation = -selectedIndex * ANGLE_PER_ITEM;
    currentRotation.current = targetRotation;
    setRotation(targetRotation);
  }, [selectedIndex]);

  const getAngleFromEvent = useCallback((clientX: number, clientY: number) => {
    if (!wheelRef.current) return 0;
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  }, []);

  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      isDragging.current = true;
      startAngle.current = getAngleFromEvent(clientX, clientY) - currentRotation.current;
    },
    [getAngleFromEvent]
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging.current) return;
      const angle = getAngleFromEvent(clientX, clientY);
      let newRotation = angle - startAngle.current;

      // 회전 범위 제한 (MIN_ROTATION ~ MAX_ROTATION)
      newRotation = Math.min(MIN_ROTATION, Math.max(MAX_ROTATION, newRotation));

      currentRotation.current = newRotation;
      setRotation(newRotation);
    },
    [getAngleFromEvent]
  );

  const handleEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // 현재 회전에서 가장 가까운 ANGLE_PER_ITEM 배수 찾기
    const currentAngle = -currentRotation.current;
    const snappedAngle = Math.round(currentAngle / ANGLE_PER_ITEM) * ANGLE_PER_ITEM;
    let targetRotation = -snappedAngle;

    // 회전 범위 제한
    targetRotation = Math.min(MIN_ROTATION, Math.max(MAX_ROTATION, targetRotation));

    currentRotation.current = targetRotation;
    setRotation(targetRotation);

    // 인덱스 계산 (0 ~ ITEM_COUNT-1 범위)
    const finalIndex = Math.round(-targetRotation / ANGLE_PER_ITEM);

    // 내부 변경 표시 (useEffect에서 첫 번째 세트로 이동하지 않도록)
    isInternalChange.current = true;
    onIndexChange(finalIndex);
  }, [onIndexChange]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    },
    [handleStart]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      handleStart(touch.clientX, touch.clientY);
    },
    [handleStart]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleMouseUp = () => handleEnd();
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      handleMove(touch.clientX, touch.clientY);
    };
    const handleTouchEnd = () => handleEnd();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMove, handleEnd]);

  return (
    <div className={styles.wheelContainer}>
      <div
        ref={wheelRef}
        className={`${styles.wheel} ${isDragging.current ? styles.wheelDragging : ''}`}
        style={{ transform: `translateY(-50%) rotate(${rotation}deg)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}>
        {emotions.map((emotion, index) => {
          const itemAngle = index * ANGLE_PER_ITEM;
          const isActive = index === selectedIndex;

          return (
            <Text
              as='span'
              variant='h1'
              key={`${emotion.value}-${index}`}
              className={styles.wheelItem({ active: isActive })}
              style={{
                transform: `rotate(${itemAngle}deg) translateX(${WHEEL_RADIUS}px) translateX(-50%)`,
              }}>
              {emotion.label}
            </Text>
          );
        })}
      </div>
      <div className={styles.centerCircle} />
    </div>
  );
};
