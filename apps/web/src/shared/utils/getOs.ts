const getOs = () => {
  if (typeof window === 'undefined') {
    return 'Unknown';
  }

  const userAgent = window.navigator.userAgent;

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'iOS';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  if (/Windows|Macintosh|Linux/.test(userAgent)) {
    return 'Desktop';
  }

  return 'Unknown';
};

export { getOs };
