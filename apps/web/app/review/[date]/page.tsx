import { Review } from '@/widgets/review';
import React, { use } from 'react';

type Props = { params: Promise<{ date: string }> };

export default function ReviewPage({ params }: Props) {
  const { date } = use(params);
  return <Review date={date} />;
}
