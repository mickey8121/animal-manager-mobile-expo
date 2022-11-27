import { MutationUpdaterFn, MutationHookOptions, MutationTuple } from '@apollo/client';

import authUpdateCache from 'helpers/authUpdateCache';

import {
  SignInMutation,
  useSignInMutation,
  SignInMutationVariables,
  useMeLazyQuery,
} from 'generated/graphql';

export type UseSignInHook = (
  options?: MutationHookOptions<SignInMutation, SignInMutationVariables>,
) => MutationTuple<SignInMutation, SignInMutationVariables>;

const useSignIn: UseSignInHook = options => {
  const [fetchMeQuery] = useMeLazyQuery({ fetchPolicy: 'cache-and-network' });

  return useSignInMutation({
    update: authUpdateCache(fetchMeQuery) as MutationUpdaterFn<SignInMutation>,
    onError: () => null,
    ...options,
  });
};

export default useSignIn;
