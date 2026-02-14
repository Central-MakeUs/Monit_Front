export const getPlatform = (): 'ios' | 'android' | 'web' => {
  if (typeof window === 'undefined') return 'web';

  const ua = navigator.userAgent || '';
  const maxTouchPoints = navigator.maxTouchPoints || 0;

  const isAndroid = /Android/i.test(ua);

  const isIPad = /iPad/i.test(ua) || (ua.includes('Macintosh') && maxTouchPoints > 1);
  const isIPhone = /iPhone|iPod/i.test(ua);

  if (isAndroid) return 'android';
  if (isIPad || isIPhone) return 'ios';
  return 'web';
};
