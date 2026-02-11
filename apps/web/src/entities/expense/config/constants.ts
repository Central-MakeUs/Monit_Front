export const EXPENSE_CONSTANTS = {
  MAX_AMOUNT: 100000000, // 1억
  MAX_USAGE_LENGTH: 20,
} as const;

export const EXPENSE_ERROR_MESSAGES = {
  OVER_MAX_AMOUNT: '최대 입력 가능 금액은 1억 원이에요.',
  EMPTY_AMOUNT: '소비금액을 입력해주세요.',
  INVALID_USAGE: '한글, 영문, 숫자만 20자 이내로 입력가능해요.',
} as const;
