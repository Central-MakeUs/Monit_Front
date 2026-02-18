import { recipe } from '@vanilla-extract/recipes';
import { typography } from '../tokens/typography';

export const text = recipe({
  base: {
    fontFamily:
      'var(--font-suit), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: 0,
  },
  variants: {
    variant: {
      // Title variants
      t5: typography.title.t5,
      t4: typography.title.t4,
      t3: typography.title.t3,
      t2: typography.title.t2,
      t1: typography.title.t1,

      // Head variants
      h5: typography.head.h5,
      h4: typography.head.h4,
      h3: typography.head.h3,
      h2: typography.head.h2,
      h1: typography.head.h1,

      // Body variants
      b5: typography.body.b5,
      b4: typography.body.b4,
      b3: typography.body.b3,
      b2: typography.body.b2,
      b1: typography.body.b1,
    },
  },
  // 기본값
  defaultVariants: {
    variant: 'b3',
  },
});
