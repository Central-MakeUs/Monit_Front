import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const loginBtn = recipe({
  base: {
    padding: '1.2rem 1rem',
    width: '100%',
    height: '4.8rem',
    borderRadius: '5px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    ':active': {
      opacity: 0.8,
    },
  },
  variants: {
    social: {
      kakao: {
        backgroundColor: '#FEE500',
        color: '#000000',
      },
      apple: {
        backgroundColor: '#000000',
        color: '#FFFFFF',
      },
    },
  },
});

export const iconWrapper = recipe({
  base: {
    position: 'absolute',
    left: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
  variants: {
    social: {
      kakao: {
        padding: '1rem',
      },
      apple: {},
    },
  },
});
