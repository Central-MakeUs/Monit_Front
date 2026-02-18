import { AddCategory } from '@/widgets/addCategory';
import React, { Suspense } from 'react';

export default function CategoryPage() {
  return (
    <Suspense>
      <AddCategory />
    </Suspense>
  );
}
