import React from 'react';
import * as styles from './Spinner.css';

interface SpinnerProps {
  message?: string;
}

export const Spinner = ({ message }: SpinnerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};
