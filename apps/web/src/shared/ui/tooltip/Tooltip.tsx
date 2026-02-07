import * as styles from './Tooltip.css';
import { Text, vars } from '@/shared/ui';
import { IcToolTip } from 'public/icons';
import React from 'react';

export interface TooltipProps {
  /** 화살표 위치 (상하 방향일 때: left/center/right, 좌우 방향일 때: top/center/bottom) */
  arrow?: 'left' | 'right' | 'center' | 'top' | 'bottom';
  /** 화살표 방향 */
  direction?: 'bottom' | 'top' | 'left' | 'right';
  /** 타이틀 텍스트 */
  title: string;
  /** 스텝 텍스트 (예: "(1/3)") */
  step?: string;
  /** 설명 텍스트 */
  description: string;
  /** 추가 className */
  className?: string;
}

export const Tooltip = ({
  arrow = 'left',
  direction = 'bottom',
  title,
  step,
  description,
  className,
}: TooltipProps) => {
  const isHorizontal = direction === 'left' || direction === 'right';

  const getArrowRotation = () => {
    if (direction === 'top') return styles.arrowFlipped;
    if (direction === 'left') return styles.arrowRotateLeft;
    if (direction === 'right') return styles.arrowRotateRight;
    return undefined;
  };

  const getArrowVerticalPosition = () => {
    if (!isHorizontal) return undefined;
    const pos =
      arrow === 'left' || arrow === 'right' ? 'center' : (arrow as 'top' | 'center' | 'bottom');
    return styles.arrowVerticalPosition[pos];
  };

  const arrowElement = isHorizontal ? (
    <div
      className={`${styles.arrowContainerHorizontalVariants[direction]} ${getArrowVerticalPosition()}`}>
      <div className={getArrowRotation()}>
        <IcToolTip color='#ffff' />
      </div>
    </div>
  ) : (
    <div className={styles.arrowContainerVariants[direction]}>
      <div className={getArrowRotation()}>
        <IcToolTip color='#ffff' />
      </div>
    </div>
  );

  const contentElement = (
    <div className={styles.content}>
      <div className={styles.titleRow}>
        <Text variant='h1' color={vars.color.text.primary}>
          {title}
        </Text>
        {step && (
          <Text variant='h1' color={vars.color.text.primary}>
            {step}
          </Text>
        )}
      </div>
      <Text variant='b2' color={vars.color.text.secondary}>
        {description}
      </Text>
    </div>
  );

  const getWrapperClass = () => {
    if (isHorizontal) {
      const horizontalArrow =
        arrow === 'left' || arrow === 'right' ? 'center' : (arrow as 'top' | 'center' | 'bottom');
      return styles.wrapperHorizontalVariants[horizontalArrow];
    }
    const verticalArrow =
      arrow === 'top' || arrow === 'bottom' ? 'center' : (arrow as 'left' | 'center' | 'right');
    return styles.wrapperVariants[verticalArrow];
  };

  return (
    <div className={`${getWrapperClass()}${className ? ` ${className}` : ''}`}>
      {direction === 'top' && arrowElement}
      {direction === 'left' && arrowElement}
      {contentElement}
      {direction === 'bottom' && arrowElement}
      {direction === 'right' && arrowElement}
    </div>
  );
};
