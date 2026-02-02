import { globalStyle } from '@vanilla-extract/css';
import '../ui/theme.css';

globalStyle('*', {
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
  fontFamily: 'var(--font-suit), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
});

globalStyle('html', {
  fontSize: '62.5%',
  maxWidth: '100vw',
  overflowX: 'hidden',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('body', {
  background: '#F6F7F9',
});
