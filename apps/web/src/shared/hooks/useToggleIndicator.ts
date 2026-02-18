'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

interface UseToggleIndicatorProps {
  activeIndex: number;
  styleVars: { x: string; width: string };
}

export const useToggleIndicator = ({ activeIndex, styleVars }: UseToggleIndicatorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLButtonElement>(null);
  const secondRef = useRef<HTMLButtonElement>(null);

  const [position, setPosition] = useState({ x: 0, width: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const activeButton = activeIndex === 0 ? firstRef.current : secondRef.current;

    if (!container || !activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    const x = buttonRect.left - containerRect.left;
    const width = buttonRect.width;

    setPosition({ x, width });
  }, [activeIndex]);

  const indicatorStyle = assignInlineVars({
    [styleVars.x]: `${position.x}px`,
    [styleVars.width]: `${position.width}px`,
  });

  return {
    containerRef,
    firstRef,
    secondRef,
    indicatorStyle,
  };
};
