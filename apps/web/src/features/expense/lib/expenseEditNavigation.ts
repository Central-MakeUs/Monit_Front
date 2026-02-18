const TARGET_KEY = 'expense-edit-target-id';

/**
 * 개별 소비 기록 편집 플로우에서
 * "카테고리 추가 페이지로 이동했다가 다시 돌아올 때
 * 어느 지출 바텀시트를 다시 열어야 하는지"를
 * 세션 스토리지로 넘겨주는 내비게이션 유틸입니다.
 *
 * - `ExpenseEditBottomSheet`에서 카테고리 추가로 나가기 전에
 *   `setTargetExpenseId`로 현재 편집 중인 지출 ID를 저장합니다.
 * - 홈으로 돌아온 뒤 `Home` 위젯에서 `consumeTargetExpenseId`를 호출해
 *   다시 열어야 할 지출 ID를 꺼내고, 그에 맞는 바텀시트를 다시 띄웁니다.
 *
 * Next.js 라우터나 특정 페이지 구조에 직접 의존하지 않고,
 * 세션 스토리지를 매개로 features 레이어 안에서만
 * 편집 플로우의 상태 전달을 담당합니다.
 */
export const expenseEditNavigation = {
  /**
   * 편집 중인 지출의 ID를 세션 스토리지에 저장합니다.
   *
   * @param expenseId - 다시 열어야 할 지출의 고유 ID (`ExpenseListDTO.expenseId`)
   */
  setTargetExpenseId(expenseId: number) {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(TARGET_KEY, String(expenseId));
  },

  /**
   * 세션 스토리지에 임시로 저장해 둔 지출 ID를 읽어옵니다.
   * 값이 없거나 잘못된 경우 `null`을 반환하며,
   * 유효한 값을 읽어온 경우에는 즉시 세션에서 제거합니다.
   *
   * @returns 다시 열어야 할 지출 ID, 없으면 `null`
   */
  consumeTargetExpenseId(): number | null {
    if (typeof window === 'undefined') return null;
    const stored = window.sessionStorage.getItem(TARGET_KEY);
    if (!stored) return null;

    window.sessionStorage.removeItem(TARGET_KEY);

    const id = Number(stored);
    if (Number.isNaN(id)) return null;
    return id;
  },
};
