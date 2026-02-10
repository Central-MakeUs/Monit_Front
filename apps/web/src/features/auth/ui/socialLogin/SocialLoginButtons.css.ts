import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  paddingInline: '20px',
});

export const loginBtn = recipe({
  base: {
    width: '100%',
    height: '56px',
    borderRadius: '12px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
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
