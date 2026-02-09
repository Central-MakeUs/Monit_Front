import { useEffect, useState } from 'react';

import { getKakaoCallback } from '../api/getKakaoCallback';

export const useKakaoCode = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [invalidAccess, setInvalidAccess] = useState(false);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      login(code);
    } else {
      setInvalidAccess(true);
    }
  }, []);

  const login = async (code: string) => {
    try {
      const response = await getKakaoCallback(code);

      if (response.isSuccess) {
        setIsSuccess(true);
      } else {
        throw new Error(response.message || '로그인에 실패했습니다.');
      }
    } catch (err) {
      setError(true);
      console.error('Login failed:', err);
    }
  };

  return { isSuccess, error, invalidAccess };
};
