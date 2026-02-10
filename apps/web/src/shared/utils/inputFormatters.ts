/**
 * 숫자 문자열의 앞자리 0을 제거합니다.
 * @param value - 정규화할 값
 * @returns 앞자리 0이 제거된 문자열 (빈 문자열이면 '0' 반환)
 */
export const normalizeNumberValue = (value: string): string => {
  if (value === '') return value;
  return value.replace(/^0+/, '') || '0';
};

/**
 * 숫자가 아닌 문자를 제거하고 콤마로 포맷팅합니다.
 * @param value - 포맷팅할 값
 * @returns 콤마가 포함된 숫자 문자열 (빈 문자열이면 빈 문자열 반환)
 */
export const formatNumberWithComma = (value: string): string => {
  const number = value.replace(/[^0-9]/g, '');
  if (!number) return '';
  return Number(number).toLocaleString();
};
