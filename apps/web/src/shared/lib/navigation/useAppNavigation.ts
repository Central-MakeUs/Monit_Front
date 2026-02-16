'use client';

import { useRouter, usePathname } from 'next/navigation';
import { NavToggleOption } from '@/shared/ui/navToggle';
import { useExpenseFormStore } from '@/widgets/expenseRecordFunnel/model/store';

export const useAppNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (tab: NavToggleOption) => {
    if (tab === 'home') {
      router.push('/');
    } else if (tab === 'report') {
      router.push('/report');
    }
  };

  const handleAddExpense = () => {
    useExpenseFormStore.getState().reset();
    router.push('/expense');
  };

  const getActiveTab = (): NavToggleOption => {
    if (pathname === '/' || pathname === '/home') return 'home';
    if (pathname?.startsWith('/report')) return 'report';
    return 'home';
  };

  return {
    handleNavigate,
    handleAddExpense,
    activeTab: getActiveTab(),
  };
};
