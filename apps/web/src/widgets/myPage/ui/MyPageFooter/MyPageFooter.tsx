'use client';

import React from 'react';
import * as styles from './MyPageFooter.css';

const FOOTER_LINES = [
  '모닛',
  '개발팀 : 질소충전소',
  '이메일 : nitrogencharger@gmail.com',
  '© 2026 질소충전소. All rights reserved',
] as const;

export const MyPageFooter = () => (
  <footer className={styles.root}>
    {FOOTER_LINES.map((line, index) => (
      <React.Fragment key={line}>
        {line}
        {index < FOOTER_LINES.length - 1 && <br />}
      </React.Fragment>
    ))}
  </footer>
);
