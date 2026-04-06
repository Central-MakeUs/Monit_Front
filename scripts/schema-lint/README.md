# Schema Lint

OpenAPI로 자동 생성된 `schema.d.ts`의 Response 타입 품질을 검사하는 CLI 도구입니다.

## 실행 방법

```bash
# 기본 실행 (apps/web/src/shared/api/schema.d.ts 자동 참조)
pnpm schema:lint

# 특정 파일 지정
pnpx tsx scripts/schema-lint/index.ts path/to/schema.d.ts
```

## 검사 항목

### ERROR

| 규칙              | 설명                                             |
| ----------------- | ------------------------------------------------ |
| required 필드 0개 | Response 타입에 required 필드가 하나도 없는 경우 |
| 전체 optional     | 필드가 3개 이상인데 전부 optional인 경우         |

### WARN

| 규칙                    | 설명                                        |
| ----------------------- | ------------------------------------------- |
| 오타 의심 (사전)        | `Avarage`, `reponse` 등 흔한 오타 패턴 매칭 |
| 유사 필드명 (편집 거리) | 같은 Response 내 1글자 차이 필드 감지       |

## 출력 예시

```
Schema Lint 리포트
==================

[ERROR] WeeklyDetailReportResponse
  전체 8개 필드가 모두 optional입니다.
  [제안]
    실제 항상 내려오는 필드를 required로 지정하세요.
    Spring 사용 시: @Schema(requiredMode = REQUIRED), @NotNull

[WARN] WeeklyDetailReportResponse
  오타 의심 필드: inAvarageEvaluation
  [제안]
    필드명 수정: inAvarageEvaluation -> inAverageEvaluation

요약
  검사한 Response 타입: 10개
  ERROR: 10개
  WARN: 1개
```

## 종료 코드

- ERROR가 1개 이상이면 `exit code 1` (CI 연동 시 실패 처리 가능)
- WARN만 있으면 통과

## 오타 사전 추가

`constants.ts`의 `COMMON_TYPOS` 배열에 `[오타, 올바른 표기]` 쌍을 추가하면 됩니다.

```typescript
export const COMMON_TYPOS: [string, string][] = [
  ['Avarage', 'Average'],
  ['reponse', 'response'],
  // 새 패턴 추가
  ['Destory', 'Destroy'],
];
```

## 검사 제외 설정

`constants.ts`에서 제외 대상을 관리합니다.

```typescript
// 특정 타입명 제외
export const EXCLUDED_TYPES = new Set(['Response', 'BaseResponse', 'ErrorResponse']);

// 접두사 기반 제외 (ApiResponse* 래퍼 등)
export const EXCLUDED_PREFIXES = ['ApiResponse'];
```

## 파일 구조

```
scripts/schema-lint/
  index.ts              # CLI 진입점
  parseSchema.ts        # TypeScript AST 기반 스키마 파서
  types.ts              # 공통 타입 정의
  constants.ts          # 제외 목록, 오타 사전, 임계값
  rules/
    responseOptionalRule.ts   # required 필드 누락 검사
    typoRule.ts               # 오타/유사 필드명 감지
  reporters/
    consoleReporter.ts        # 한국어 리포트 출력
```
