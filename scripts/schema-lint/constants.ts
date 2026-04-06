/** 검사에서 제외할 Response 타입명 */
export const EXCLUDED_TYPES = new Set([
  'Response',
  'BaseResponse',
  'ErrorResponse',
  'PaginationResponse',
]);

/**
 * 검사에서 제외할 타입명 접두사
 * ApiResponse* 래퍼는 isSuccess/code/message/result 공통 구조이므로 제외
 */
export const EXCLUDED_PREFIXES = ['ApiResponse'];

/**
 * 흔한 오타 사전: [오타, 올바른 표기]
 * 필드명에 오타 문자열이 포함되어 있으면 경고
 */
export const COMMON_TYPOS: [string, string][] = [
  ['Avarage', 'Average'],
  ['avarage', 'average'],
  ['reponse', 'response'],
  ['Reponse', 'Response'],
  ['reslut', 'result'],
  ['Reslut', 'Result'],
  ['lenght', 'length'],
  ['Lenght', 'Length'],
  ['coutn', 'count'],
  ['Coutn', 'Count'],
  ['descrption', 'description'],
  ['Descrption', 'Description'],
  ['categroy', 'category'],
  ['Categroy', 'Category'],
  ['amoutn', 'amount'],
  ['Amoutn', 'Amount'],
  ['staus', 'status'],
  ['Staus', 'Status'],
  ['titile', 'title'],
  ['Titile', 'Title'],
  ['mesage', 'message'],
  ['Mesage', 'Message'],
];

/** Response 타입 이름 매칭 패턴 */
export const RESPONSE_SUFFIX = 'Response';

/** 편집 거리 기반 유사 필드 감지 임계값 (보수적) */
export const EDIT_DISTANCE_THRESHOLD = 1;

/** 편집 거리 비교 대상 최소 필드명 길이 */
export const MIN_FIELD_LENGTH_FOR_SIMILARITY = 6;

/** 전부 optional인데 ERROR로 판단할 최소 필드 수 */
export const MIN_FIELDS_FOR_ALL_OPTIONAL_ERROR = 3;
