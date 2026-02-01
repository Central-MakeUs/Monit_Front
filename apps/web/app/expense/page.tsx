'use client';

import React, { useState, useEffect } from 'react';
import { ExpenseRecordFunnel } from '@/widgets/expenseRecordFunnel';

export default function ExpenseRecordPage(): React.ReactElement | null {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <ExpenseRecordFunnel />;
}
