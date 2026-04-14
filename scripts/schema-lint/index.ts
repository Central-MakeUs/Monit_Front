import path from 'node:path';
import { parseSchema } from './parseSchema.js';
import { responseOptionalRule } from './rules/responseOptionalRule.js';
import { typoRule } from './rules/typoRule.js';
import { printReport } from './reporters/consoleReporter.js';
import type { Diagnostic } from './types.js';

/** schema.d.ts 기본 경로 (레포 루트 기준) */
const DEFAULT_SCHEMA_PATH = 'apps/web/src/shared/api/schema.d.ts';

function main(): void {
  const schemaPath = path.resolve(process.argv[2] ?? DEFAULT_SCHEMA_PATH);

  console.log(`대상 파일: ${schemaPath}`);

  const responses = parseSchema(schemaPath);

  if (responses.length === 0) {
    console.log('검사 대상 Response 타입을 찾지 못했습니다.');
    return;
  }

  // 규칙 실행
  const diagnostics: Diagnostic[] = [...responseOptionalRule(responses), ...typoRule(responses)];

  // 리포트 출력
  printReport(diagnostics, responses.length);

  // ERROR가 있으면 exit code 1
  const hasError = diagnostics.some((d) => d.severity === 'error');
  if (hasError) {
    process.exitCode = 1;
  }
}

main();
