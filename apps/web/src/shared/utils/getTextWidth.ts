export function getTextWidth({ text, options }: { text: string; options?: { font?: string } }) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context != null) {
    if (options?.font != null) {
      context.font = options.font;
    }
    return context.measureText(text).width;
  }
  return 0;
}
