import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme.css';

export const stepIndicatorContainer = style({
  display: 'flex',
  gap: '0.6rem',
  alignItems: 'flex-end',
  justifyContent: 'center',
  padding: '0.6rem 1.8rem',
});

export const stepIndicatorItem = recipe({
  base: {
    position: 'relative',
    height: '0.4rem',
    flex: 1,
    borderRadius: '1px',
    backgroundColor: vars.color.indicator.default,
    overflow: 'hidden',
    selectors: {
      '&::after': {
        content: '""',
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: vars.color.indicator.active,
        transformOrigin: 'left',
        transition: 'transform 0.3s ease',
      },
    },
  },
  variants: {
    state: {
      active: {
        selectors: {
          '&::after': {
            transform: 'scaleX(1)',
          },
        },
      },
      default: {
        selectors: {
          '&::after': {
            transform: 'scaleX(0)',
          },
        },
      },
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
