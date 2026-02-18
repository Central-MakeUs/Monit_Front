'use client';

import React from 'react';
import { ExpenseRecordFunnel } from '@/widgets/expenseRecordFunnel';
import { useClientOnly } from '@/shared/hooks/useClientOnly';

export default function ExpensePage(): React.ReactElement | null {
  const isMounted = useClientOnly();

  if (!isMounted) return null;

  return <ExpenseRecordFunnel />;
}
