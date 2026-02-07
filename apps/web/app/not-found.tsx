'use client';

import { useRouter } from 'next/navigation';
import { NotFoundPage } from '@/widgets/error/ui/NotFoundPage';

export default function NotFound(): React.JSX.Element {
  const router = useRouter();

  const handleBack = () => {
    // 스택이 없을 경우 홈으로 이동
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return <NotFoundPage onBack={handleBack} />;
}
