'use client';

import { useEffect, useMemo, useState } from 'react';

import { getOs } from '@/shared/utils';

declare const window: Window & {
  visualViewport?: {
    addEventListener: (type: string, callback: () => void) => void;
    removeEventListener: (type: string, callback: () => void) => void;
    height: number;
    offsetTop: number;
  };
};

const detectIOS = getOs() === 'iOS';
const detectAOS = getOs() === 'Android';
const isMobileDevice = detectIOS || detectAOS;

function determineViewportHeight() {
  if (window.visualViewport) {
    return window.visualViewport.height;
  } else if (window.outerHeight) {
    return window.outerHeight;
  } else {
    return window.screen.availHeight;
  }
}

export default function useViewport() {
  const [height, setHeight] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const createPlaceholderElement = useMemo(() => {
    if (!isMobileDevice || typeof document === 'undefined') {
      return null;
    }

    const hiddenDiv = document.createElement('div');
    hiddenDiv.style.cssText =
      'position: fixed; top: 0; bottom: 0; left: 0; right: 0; visibility: hidden;';
    return hiddenDiv;
  }, []);

  useEffect(() => {
    if (createPlaceholderElement) {
      document.body.appendChild(createPlaceholderElement);
    }

    return () => {
      if (createPlaceholderElement) {
        document.body.removeChild(createPlaceholderElement);
      }
    };
  }, [createPlaceholderElement]);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport || !createPlaceholderElement) {
      return;
    }

    const handleViewportChange = () => {
      const viewportHeight = determineViewportHeight();
      const calculatedOffset =
        viewport.height -
        createPlaceholderElement.getBoundingClientRect().height +
        viewport.offsetTop;

      setOffsetY(calculatedOffset);
      setHeight(viewportHeight);
    };

    handleViewportChange();

    const addListeners = (target: Window | typeof viewport) => {
      target.addEventListener('resize', handleViewportChange);
      target.addEventListener('scroll', handleViewportChange);
    };

    const removeListeners = (target: Window | typeof viewport) => {
      target.removeEventListener('resize', handleViewportChange);
      target.removeEventListener('scroll', handleViewportChange);
    };

    if (detectIOS) {
      addListeners(viewport);
      return () => removeListeners(viewport);
    } else {
      addListeners(window);
      addListeners(viewport);
      return () => {
        removeListeners(window);
        removeListeners(viewport);
      };
    }
  }, [createPlaceholderElement]);

  return useMemo(() => ({ offset: offsetY, height }), [height, offsetY]);
}
