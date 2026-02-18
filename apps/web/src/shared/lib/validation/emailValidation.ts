/**
 * 이메일 형식이 유효한지 검증합니다.
 * @param email - 검증할 이메일 주소
 * @returns 유효한 이메일 형식이면 true, 아니면 false
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 이메일 입력값에 에러가 있는지 확인합니다.
 * 빈 문자열이 아니면서 유효하지 않은 형식일 때 에러로 간주합니다.
 * @param email - 검증할 이메일 주소
 * @returns 에러가 있으면 true, 없으면 false
 */
export const hasEmailError = (email: string): boolean => {
  return email.trim() !== '' && !isValidEmail(email);
};
