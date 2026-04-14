/** 파싱된 필드 정보 */
export type ParsedField = {
  name: string;
  optional: boolean;
  typeText: string;
};

/** 파싱된 Response 타입 정보 */
export type ParsedResponse = {
  name: string;
  fields: ParsedField[];
};

/** 규칙 검사 결과 심각도 */
export type Severity = 'error' | 'warn';

/** 개별 진단 항목 */
export type Diagnostic = {
  severity: Severity;
  typeName: string;
  message: string;
  /** 백엔드에 전달할 수정 제안 (여러 줄 가능) */
  suggestions?: string[];
};
