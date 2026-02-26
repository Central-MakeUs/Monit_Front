/**
 * 금액을 "N원" 형식 문자열로 포맷 (천 단위 구분)
 */
export function formatCurrency(value: number): string {
  return `${value.toLocaleString()}원`;
}
