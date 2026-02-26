import { SpendingReview } from '@/widgets/spendingReview';
import React from 'react';

type Props = { params: { date: string } };

export default function ReviewPage({ params }: Props) {
  return <SpendingReview date={params.date} />;
}
