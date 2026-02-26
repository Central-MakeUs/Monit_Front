import { mutationOptions } from '@tanstack/react-query';
import { deleteWithdraw } from '../api/deleteWithdraw';

export const authQueries = {
  withdrawMutation: () =>
    mutationOptions({
      mutationFn: () => deleteWithdraw(),
    }),
};
