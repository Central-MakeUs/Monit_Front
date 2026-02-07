import { Button, Text, vars } from '@/shared/ui';
import { IcAttention, IcRightChevron } from 'public/icons';
import * as styles from './NotFoundPage.css';

interface NotFoundPageProps {
  onBack: () => void;
}

export function NotFoundPage({ onBack }: NotFoundPageProps): React.JSX.Element {
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
      <div className={styles.buttonWrapper}>
        <Button onClick={onBack} size='sm' variant='secondary'>
          <div className={styles.buttonContent}>
            <Text variant='b3' color={vars.color.text.secondary}>
              이전 화면으로
            </Text>
            <div className={styles.arrowWrapper}>
              <IcRightChevron />
            </div>
          </div>
        </Button>
      </div>
    </main>
  );
}
