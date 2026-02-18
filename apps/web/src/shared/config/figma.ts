export const FIGMA_FILE_URL =
  'https://www.figma.com/design/i9b1tE5MPjHIXwIYula2K6/%EB%94%94%EC%9E%90%EC%9D%B8';

export const getFigmaUrl = (nodeId: string) => `${FIGMA_FILE_URL}?node-id=${nodeId}`;
