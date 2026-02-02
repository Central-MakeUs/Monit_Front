'use client';

import React, { useMemo } from 'react';

import { getOs } from '@/shared/utils';
import { useIsOnScreenKeyboardOpen } from '@/shared/hooks';

import useViewport from '@/shared/hooks/useViewport';
import * as styles from './BottomFixedArea.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

interface BottomFixedAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  containerStyle?: React.CSSProperties;
  zIndex?: number;
}

const detectIOS = getOs() === 'iOS';

export const BottomFixedArea = ({
  children,
  containerStyle,
  zIndex,
  ...rest
}: BottomFixedAreaProps) => {
  const viewport = useViewport();
  const isKeypadOpen = useIsOnScreenKeyboardOpen();

  const bottomStyle = useMemo(() => {
    if (!detectIOS) {
      return undefined;
    }
    return {
      bottom: isKeypadOpen ? `${-viewport.offset}px` : '0px',
    } as const;
  }, [isKeypadOpen, viewport.offset]);

  return (
    <div
      className={styles.container}
      {...rest}
      style={{
        ...bottomStyle,
        ...containerStyle,
        ...(zIndex !== undefined
          ? assignInlineVars({ [styles.zIndexVar]: String(zIndex) })
          : undefined),
      }}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
