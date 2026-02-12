import { blinkingText } from '@/shared/ui/animations';

/**
 * 로딩/페칭 상태에 따라 깜빡임 애니메이션 클래스를 반환합니다.
 * @description 데이터 로딩 중 금액 텍스트에 적용되는 공통 패턴
 */
export const getLoadingClass = (isLoading?: boolean, isFetching?: boolean): string =>
  isLoading || isFetching ? blinkingText : '';
