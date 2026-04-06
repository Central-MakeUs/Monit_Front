import ts from 'typescript';
import { EXCLUDED_PREFIXES, EXCLUDED_TYPES, RESPONSE_SUFFIX } from './constants.js';
import type { ParsedField, ParsedResponse } from './types.js';

/**
 * schema.d.ts를 TypeScript AST로 파싱하여 Response 타입 목록을 반환한다.
 *
 * openapi-typescript가 생성하는 두 가지 구조를 모두 지원:
 * 1. export interface components { schemas: { XxxResponse: { ... } } }
 * 2. interface/type XxxResponse = { ... } (독립 선언)
 */
export function parseSchema(filePath: string): ParsedResponse[] {
  const program = ts.createProgram([filePath], { noEmit: true });
  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) {
    throw new Error(`파일을 열 수 없습니다: ${filePath}`);
  }

  const results: ParsedResponse[] = [];

  ts.forEachChild(sourceFile, (node) => {
    // 1) export interface components { schemas: { ... } }
    if (ts.isInterfaceDeclaration(node) && node.name.text === 'components') {
      const schemasProperty = node.members.find(
        (m): m is ts.PropertySignature =>
          ts.isPropertySignature(m) && ts.isIdentifier(m.name!) && m.name.text === 'schemas'
      );

      if (schemasProperty?.type && ts.isTypeLiteralNode(schemasProperty.type)) {
        for (const member of schemasProperty.type.members) {
          if (!ts.isPropertySignature(member) || !member.name) continue;
          const typeName = ts.isIdentifier(member.name)
            ? member.name.text
            : member.name.getText(sourceFile);

          if (!isTargetResponse(typeName)) continue;
          if (!member.type || !ts.isTypeLiteralNode(member.type)) continue;

          results.push({
            name: typeName,
            fields: extractFields(member.type, sourceFile),
          });
        }
      }
    }

    // 2) interface XxxResponse { ... }
    if (ts.isInterfaceDeclaration(node) && isTargetResponse(node.name.text)) {
      results.push({
        name: node.name.text,
        fields: extractFieldsFromMembers(node.members, sourceFile),
      });
    }

    // 3) type XxxResponse = { ... }
    if (
      ts.isTypeAliasDeclaration(node) &&
      isTargetResponse(node.name.text) &&
      ts.isTypeLiteralNode(node.type)
    ) {
      results.push({
        name: node.name.text,
        fields: extractFields(node.type, sourceFile),
      });
    }
  });

  return results;
}

/** Response 접미사를 가지며 제외 목록에 없는지 확인 */
function isTargetResponse(name: string): boolean {
  if (!name.endsWith(RESPONSE_SUFFIX)) return false;
  if (EXCLUDED_TYPES.has(name)) return false;
  if (EXCLUDED_PREFIXES.some((prefix) => name.startsWith(prefix))) return false;
  return true;
}

/** TypeLiteralNode에서 필드 정보 추출 */
function extractFields(typeLiteral: ts.TypeLiteralNode, sourceFile: ts.SourceFile): ParsedField[] {
  return extractFieldsFromMembers(typeLiteral.members, sourceFile);
}

/** NodeArray<TypeElement>에서 필드 정보 추출 */
function extractFieldsFromMembers(
  members: ts.NodeArray<ts.TypeElement>,
  sourceFile: ts.SourceFile
): ParsedField[] {
  const fields: ParsedField[] = [];

  for (const member of members) {
    if (!ts.isPropertySignature(member) || !member.name) continue;

    const name = ts.isIdentifier(member.name) ? member.name.text : member.name.getText(sourceFile);

    const optional = member.questionToken !== undefined;
    const typeText = member.type ? member.type.getText(sourceFile) : 'unknown';

    fields.push({ name, optional, typeText });
  }

  return fields;
}
