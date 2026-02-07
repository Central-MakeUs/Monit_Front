'use client';

import React from 'react';
import { BottomNav } from '@/shared/ui/bottomNav';
import { useAppNavigation } from '@/shared/lib/navigation';

export default function WithBottomNavLayout({ children }: { children: React.ReactNode }) {
  const { handleNavigate, handleAddExpense, activeTab } = useAppNavigation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>{children}</div>
      <BottomNav
        defaultTab={activeTab}
        onTabChange={handleNavigate}
        onPlusClick={handleAddExpense}
      />
    </div>
  );
}
