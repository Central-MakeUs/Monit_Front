import * as styles from './Tooltip.css';
import { Text, vars } from '@/shared/ui';
import { IcToolTip } from 'public/icons';
import React from 'react';

export interface TooltipProps {
  /** 화살표 위치 */
  arrow?: 'left' | 'right' | 'center';
  /** 화살표 방향 (bottom: 아래쪽, top: 위쪽) */
  direction?: 'bottom' | 'top';
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
  const arrowElement = (
    <div className={styles.arrowContainerVariants[direction]}>
      <div className={direction === 'top' ? styles.arrowFlipped : undefined}>
        <IcToolTip color='#ffff' />
      </div>
    </div>
  );

  return (
    <div className={`${styles.wrapperVariants[arrow]}${className ? ` ${className}` : ''}`}>
      {direction === 'top' && arrowElement}
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
      {direction === 'bottom' && arrowElement}
    </div>
  );
};
