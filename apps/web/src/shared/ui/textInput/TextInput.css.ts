import { style, styleVariants } from '@vanilla-extract/css';
import { typography, vars } from '../theme.css';

export const textInputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  width: '100%',
});

const inputFieldBase = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0.8rem 0',
  backgroundColor: 'transparent',
  borderBottom: '1px solid',
  width: '100%',
});

export const inputFieldVariants = styleVariants({
  disabled: [
    inputFieldBase,
    {
      borderColor: vars.color.border.default,
      justifyContent: 'space-between',
    },
  ],
  default: [
    inputFieldBase,
    {
      borderColor: vars.color.border.default,
      justifyContent: 'space-between',
    },
  ],
  active: [
    inputFieldBase,
    {
      borderColor: vars.color.border.active,
      justifyContent: 'space-between',
    },
  ],
  error: [
    inputFieldBase,
    {
      borderColor: vars.color.border.error,
      justifyContent: 'space-between',
    },
  ],
  'default-edit': [
    inputFieldBase,
    {
      borderColor: 'transparent',
      gap: '1rem',
    },
  ],
});

const inputBase = style({
  border: 'none',
  width: '100%',
  outline: 'none',
  backgroundColor: 'transparent',
  '::placeholder': {
    color: vars.color.text.disabled,
  },
  '::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  selectors: {
    '&[type="number"]': {
      MozAppearance: 'textfield',
    },
  },
});

export const inputVariants = styleVariants({
  text: [
    inputBase,
    {
      ...typography.head.h5,
      color: vars.color.text.primary,
      '::placeholder': {
        color: vars.color.text.tertiary,
      },
    },
  ],
  number: [
    inputBase,
    {
      ...typography.title.t5,
      color: vars.color.text.primary,
      '::placeholder': {
        color: vars.color.text.tertiary,
      },
      selectors: {
        '&:focus::placeholder': {
          color: vars.color.text.primary,
        },
      },
    },
  ],
});

export const inputDefaultEdit = style({
  flex: 'none',
  width: 'auto',
});

export const inputDisabled = style({
  color: vars.color.text.disabled,
});

export const inputWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
});

export const inputWithSuffix = style({
  width: 0,
  minWidth: '1ch',
  flex: '0 0 auto',
});

export const suffix = styleVariants({
  text: {
    ...typography.head.h5,
    flexShrink: 0,
  },
  number: {
    ...typography.title.t5,
    flexShrink: 0,
  },
});

export const suffixDefault = style({
  color: vars.color.text.primary,
});

export const suffixPlaceholder = style({
  color: vars.color.text.tertiary,
});

export const clearButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.6rem',
  height: '1.6rem',
  backgroundColor: vars.color.bg.neutral.secondary,
  borderRadius: vars.radius.full,
  border: 'none',
  cursor: 'pointer',
  color: vars.color.primitive.static.white,
  position: 'relative',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: '-0.6rem',
    },
  },
});

export const clearIcon = style({
  width: '0.6rem',
  height: '0.6rem',
});

export const clearButtonHidden = style({
  opacity: 0,
  pointerEvents: 'none',
});

export const editButton = style({
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.color.icon.disabled,
});

export const descriptionContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
});
