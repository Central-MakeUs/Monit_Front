'use client';

import { Button, Text, vars } from '@/shared/ui';
import ArrowRight from 'public/icons/ic-right-chevron.svg';
import { useRouter } from 'next/navigation';
import IcAttention from 'public/icons/ic-attention.svg';
import * as styles from './NotFoundPage.css';

export function NotFoundPage(): React.JSX.Element {
  const router = useRouter();

  return (
    <main className={styles.container}>
      <div className={styles.icon}>
        <IcAttention />
      </div>
      <Text variant='t5' color={vars.color.text.secondary} className={styles.title}>
        현재 요청한 페이지를
        <br />
        찾을 수 없어요.
      </Text>
      <Button onClick={() => router.back()} size='sm' variant='secondary'>
        <div className={styles.buttonContent}>
          <Text variant='b3' color={vars.color.text.secondary}>
            이전 화면으로
          </Text>
          <div className={styles.arrowWrapper}>
            <ArrowRight />
          </div>
        </div>
      </Button>
    </main>
  );
}
