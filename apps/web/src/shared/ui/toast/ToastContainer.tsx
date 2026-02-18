'use client';

import React, { useEffect, useState } from 'react';
import { Toast } from './Toast';
import { toastContainer, toastItem, toastItemExiting } from './Toast.css';
import { toastEmitter, type ToastItem } from './useToast';

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleAdd = (toast: ToastItem) => {
      setToasts((prev) => [...prev, toast]);
    };

    const handleRemove = (id: string) => {
      // 페이드아웃 애니메이션 시작
      setToasts((prev) =>
        prev.map((toast) => (toast.id === id ? { ...toast, isExiting: true } : toast))
      );

      // 애니메이션 완료 후 실제 제거
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 300);
    };

    toastEmitter.on('add', handleAdd);
    toastEmitter.on('remove', handleRemove);

    return () => {
      toastEmitter.off('add', handleAdd);
      toastEmitter.off('remove', handleRemove);
    };
  }, []);

  return (
    <div className={toastContainer}>
      {toasts.map((toast) => (
        <div key={toast.id} className={toast.isExiting ? toastItemExiting : toastItem}>
          <Toast variant={toast.variant} message={toast.message} />
        </div>
      ))}
    </div>
  );
};
