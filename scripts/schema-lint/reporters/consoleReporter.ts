import type { Diagnostic } from '../types.js';

/**
 * 진단 결과를 한국어 CLI 리포트로 출력한다.
 */
export function printReport(diagnostics: Diagnostic[], totalResponseCount: number): void {
  const errors = diagnostics.filter((d) => d.severity === 'error');
  const warns = diagnostics.filter((d) => d.severity === 'warn');

  console.log('');
  console.log('Schema Lint 리포트');
  console.log('==================');
  console.log('');

  if (diagnostics.length === 0) {
    console.log('✅ 모든 Response 타입이 검사를 통과했습니다.');
    console.log('');
    printSummary(totalResponseCount, errors.length, warns.length);
    return;
  }

  // 타입별로 그룹핑
  const grouped = groupByType(diagnostics);

  for (const [typeName, items] of grouped) {
    const typeErrors = items.filter((d) => d.severity === 'error');
    const typeWarns = items.filter((d) => d.severity === 'warn');

    if (typeErrors.length > 0) {
      console.log(`[ERROR] ${typeName}`);
      for (const d of typeErrors) {
        for (const line of d.message.split('\n')) {
          console.log(`  ${line}`);
        }
        printSuggestions(d.suggestions);
      }
      console.log('');
    }

    if (typeWarns.length > 0) {
      console.log(`[WARN] ${typeName}`);
      for (const d of typeWarns) {
        for (const line of d.message.split('\n')) {
          console.log(`  ${line}`);
        }
        printSuggestions(d.suggestions);
      }
      console.log('');
    }
  }

  printSummary(totalResponseCount, errors.length, warns.length);
}

function printSuggestions(suggestions?: string[]): void {
  if (!suggestions || suggestions.length === 0) return;
  console.log('  [제안]');
  for (const s of suggestions) {
    console.log(`    ${s}`);
  }
}

function printSummary(total: number, errorCount: number, warnCount: number): void {
  console.log('요약');
  console.log(`  검사한 Response 타입: ${total}개`);
  console.log(`  ERROR: ${errorCount}개`);
  console.log(`  WARN: ${warnCount}개`);
  console.log('');
}

function groupByType(diagnostics: Diagnostic[]): Map<string, Diagnostic[]> {
  const map = new Map<string, Diagnostic[]>();

  for (const d of diagnostics) {
    const list = map.get(d.typeName) ?? [];
    list.push(d);
    map.set(d.typeName, list);
  }

  return map;
}
