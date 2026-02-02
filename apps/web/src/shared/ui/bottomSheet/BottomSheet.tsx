'use client';

import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import * as styles from './BottomSheet.css';

export interface BottomSheetProps {
  /** BottomSheet 열림 상태 */
  isOpen: boolean;
  /** 닫기 핸들러 */
  onClose: () => void;
  /** 백드롭 투명 여부 */
  transparent?: boolean;
}

export const BottomSheet = ({
  isOpen,
  onClose,
  transparent = false,
  children,
}: PropsWithChildren<BottomSheetProps>): React.JSX.Element | null => {
  const [shouldRender, setShouldRender] = useState<boolean>();
  const [isAnimating, setIsAnimating] = useState<boolean>();
  const prevOverflow = useRef<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      if (prevOverflow.current === null) {
        prevOverflow.current = document.body.style.overflow;
      }
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else if (shouldRender) {
      setIsAnimating(false);

      const timeout = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = prevOverflow.current ?? '';
        prevOverflow.current = null;
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isOpen, shouldRender]);

  useEffect(() => {
    return () => {
      if (prevOverflow.current !== null) {
        document.body.style.overflow = prevOverflow.current;
        prevOverflow.current = null;
      }
    };
  }, []);

  if (!shouldRender) return null;

  return createPortal(
    <div className={styles.container} onClick={onClose}>
      <div className={styles.backdrop({ transparent, visible: isAnimating })} />
      <div
        className={styles.sheet({ animating: isAnimating })}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};
