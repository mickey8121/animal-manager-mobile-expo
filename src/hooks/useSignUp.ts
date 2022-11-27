import { MutationUpdaterFn, MutationHookOptions, MutationTuple } from '@apollo/client';

import authUpdateCache from 'helpers/authUpdateCache';

import {
  SignUpMutation,
  useSignUpMutation,
  SignUpMutationVariables,
  useMeLazyQuery,
} from 'generated/graphql';

export type UseSignUpHook = (
  options?: MutationHookOptions<SignUpMutation, SignUpMutationVariables>,
) => MutationTuple<SignUpMutation, SignUpMutationVariables>;

const useSignUp: UseSignUpHook = options => {
  const [fetchMeQuery] = useMeLazyQuery({ fetchPolicy: 'cache-and-network' });

  return useSignUpMutation({
    update: authUpdateCache(fetchMeQuery) as MutationUpdaterFn<SignUpMutation>,
    onError: () => null,
    ...options,
  });
};

export default useSignUp;
