import {
  COMMON_TYPOS,
  EDIT_DISTANCE_THRESHOLD,
  MIN_FIELD_LENGTH_FOR_SIMILARITY,
} from '../constants.js';
import type { Diagnostic, ParsedResponse } from '../types.js';

/**
 * 필드명 오타를 감지한다.
 *
 * 1단계: 흔한 오타 사전 기반 (ERROR 수준으로 신뢰도 높음)
 * 2단계: 편집 거리 기반 유사 필드 감지 (WARN 전용, 보수적)
 */
export function typoRule(responses: ParsedResponse[]): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  for (const response of responses) {
    for (const field of response.fields) {
      // 1단계: 사전 기반 오타 감지
      for (const [typo, correct] of COMMON_TYPOS) {
        if (field.name.includes(typo)) {
          const suggested = field.name.replace(typo, correct);
          diagnostics.push({
            severity: 'warn',
            typeName: response.name,
            message: `오타 의심 필드: ${field.name}`,
            suggestions: [`필드명 수정: ${field.name} → ${suggested}`],
          });
        }
      }
    }

    // 2단계: 같은 Response 내 유사 필드명 감지
    const fieldNames = response.fields.map((f) => f.name);

    for (let i = 0; i < fieldNames.length; i++) {
      for (let j = i + 1; j < fieldNames.length; j++) {
        const a = fieldNames[i]!;
        const b = fieldNames[j]!;

        if (
          a.length >= MIN_FIELD_LENGTH_FOR_SIMILARITY &&
          b.length >= MIN_FIELD_LENGTH_FOR_SIMILARITY &&
          levenshtein(a, b) <= EDIT_DISTANCE_THRESHOLD
        ) {
          diagnostics.push({
            severity: 'warn',
            typeName: response.name,
            message: `유사한 필드명 감지: "${a}" ↔ "${b}" (편집 거리 ${levenshtein(a, b)})`,
            suggestions: ['의도적인 구분이 아니라면 필드명을 통일하세요.'],
          });
        }
      }
    }
  }

  return diagnostics;
}

/** Levenshtein 편집 거리 계산 */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0) as number[]);

  for (let i = 0; i <= m; i++) dp[i]![0] = i;
  for (let j = 0; j <= n; j++) dp[0]![j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i]![j] = Math.min(dp[i - 1]![j]! + 1, dp[i]![j - 1]! + 1, dp[i - 1]![j - 1]! + cost);
    }
  }

  return dp[m]![n]!;
}
