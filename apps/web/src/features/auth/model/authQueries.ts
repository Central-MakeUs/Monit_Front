import { mutationOptions } from '@tanstack/react-query';
import { postLogout } from '../api/postLogout';
import { deleteWithdraw } from '../api/deleteWithdraw';
import { postTerms } from '../api/postTerms';

export const authQueries = {
  logoutMutation: () =>
    mutationOptions({
      mutationFn: () => postLogout(),
    }),

  withdrawMutation: () =>
    mutationOptions({
      mutationFn: () => deleteWithdraw(),
    }),

  termsMutation: () =>
    mutationOptions({
      mutationFn: () => postTerms(),
    }),
};
