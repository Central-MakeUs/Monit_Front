import { globalStyle } from '@vanilla-extract/css';
import '../ui/theme.css';

globalStyle('*', {
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
  fontFamily: 'var(--font-suit), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  WebkitTouchCallout: 'none',
  userSelect: 'none',
});

globalStyle('html', {
  fontSize: '62.5%',
  maxWidth: '100vw',
  overflowX: 'hidden',
  overscrollBehavior: 'none',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('body', {
  width: '100%',
  maxWidth: '43rem',
  minWidth: '32rem',
  minHeight: '100dvh',
  margin: '0 auto',
  background: '#F6F7F9',
  overscrollBehavior: 'none',
  '@media': {
    '(min-width: 431px)': {
      boxShadow: '0 0 16px rgba(0,0,0,0.2)',
    },
  },
});
