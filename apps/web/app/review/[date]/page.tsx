import { SpendingReview } from '@/widgets/spendingReview';
import React, { use } from 'react';

type Props = { params: Promise<{ date: string }> };

export default function ReviewPage({ params }: Props) {
  const { date } = use(params);
  return <SpendingReview date={date} />;
}
