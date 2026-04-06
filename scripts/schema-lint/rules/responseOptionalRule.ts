import { MIN_FIELDS_FOR_ALL_OPTIONAL_ERROR } from '../constants.js';
import type { Diagnostic, ParsedResponse } from '../types.js';

/**
 * Response 타입의 optional 필드 비율을 검사한다.
 *
 * ERROR 조건:
 * - 필드가 MIN_FIELDS_FOR_ALL_OPTIONAL_ERROR개 이상인데 전부 optional
 * - required 필드가 0개
 */
export function responseOptionalRule(responses: ParsedResponse[]): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  for (const response of responses) {
    const { name, fields } = response;

    if (fields.length === 0) continue;

    const requiredCount = fields.filter((f) => !f.optional).length;
    const optionalCount = fields.filter((f) => f.optional).length;

    const suggestions = [
      '실제 항상 내려오는 필드를 required로 지정하세요.',
      'Spring 사용 시: @Schema(requiredMode = REQUIRED), @NotNull',
    ];

    if (requiredCount === 0 && fields.length >= MIN_FIELDS_FOR_ALL_OPTIONAL_ERROR) {
      diagnostics.push({
        severity: 'error',
        typeName: name,
        message: `전체 ${fields.length}개 필드가 모두 optional입니다.`,
        suggestions,
      });
    } else if (requiredCount === 0 && fields.length > 0) {
      diagnostics.push({
        severity: 'error',
        typeName: name,
        message: `required 필드가 0개입니다. (전체 ${fields.length}개 필드, 모두 optional)`,
        suggestions,
      });
    }
  }

  return diagnostics;
}
