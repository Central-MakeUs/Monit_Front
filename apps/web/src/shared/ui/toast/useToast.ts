import type { ToastProps } from './Toast';

export interface ToastItem extends ToastProps {
  id: string;
  isExiting?: boolean;
}

type ToastListener = (toast: ToastItem) => void;
type RemoveListener = (id: string) => void;

class ToastEmitter {
  private addListeners: ToastListener[] = [];
  private removeListeners: RemoveListener[] = [];

  on(event: 'add', listener: ToastListener): void;
  on(event: 'remove', listener: RemoveListener): void;
  on(event: 'add' | 'remove', listener: ToastListener | RemoveListener): void {
    if (event === 'add') {
      this.addListeners.push(listener as ToastListener);
    } else {
      this.removeListeners.push(listener as RemoveListener);
    }
  }

  off(event: 'add', listener: ToastListener): void;
  off(event: 'remove', listener: RemoveListener): void;
  off(event: 'add' | 'remove', listener: ToastListener | RemoveListener): void {
    if (event === 'add') {
      this.addListeners = this.addListeners.filter((l) => l !== listener);
    } else {
      this.removeListeners = this.removeListeners.filter((l) => l !== listener);
    }
  }

  emit(event: 'add', toast: ToastItem): void;
  emit(event: 'remove', id: string): void;
  emit(event: 'add' | 'remove', data: ToastItem | string): void {
    if (event === 'add') {
      this.addListeners.forEach((listener) => listener(data as ToastItem));
    } else {
      this.removeListeners.forEach((listener) => listener(data as string));
    }
  }
}

export const toastEmitter = new ToastEmitter();

const addToast = (variant: 'success' | 'attention', message: string, duration: number = 3000) => {
  const id = `${Date.now()}-${Math.random()}`;
  const newToast: ToastItem = { id, variant, message, isExiting: false };

  toastEmitter.emit('add', newToast);

  setTimeout(() => {
    toastEmitter.emit('remove', id);
  }, duration);
};

export const useToast = () => {
  return {
    success: (message: string, duration?: number) => {
      addToast('success', message, duration);
    },
    attention: (message: string, duration?: number) => {
      addToast('attention', message, duration);
    },
  };
};
