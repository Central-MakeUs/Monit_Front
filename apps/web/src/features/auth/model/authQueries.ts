import { mutationOptions } from '@tanstack/react-query';
import { deleteWithdraw } from '../api/deleteWithdraw';
import { patchTerms } from '../api/patchTerms';

export const authQueries = {
  withdrawMutation: () =>
    mutationOptions({
      mutationFn: () => deleteWithdraw(),
    }),

  termsMutation: () =>
    mutationOptions({
      mutationFn: () => patchTerms(),
    }),
};
