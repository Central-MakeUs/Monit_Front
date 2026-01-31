import * as styles from './Tooltip.css';
import { Text, vars } from '@/shared/ui';
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

const ArrowIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='10' viewBox='0 0 16 10' fill='none'>
    <path
      d='M0.491421 2.84518L6.46773 8.82149C7.1186 9.47236 8.17388 9.47236 8.82475 8.82149L14.8011 2.84518C15.851 1.79524 15.1074 0 13.6226 0L1.66993 2.42773e-06C0.185088 2.65336e-06 -0.558521 1.79524 0.491421 2.84518Z'
      fill='white'
    />
  </svg>
);

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
        <ArrowIcon />
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
