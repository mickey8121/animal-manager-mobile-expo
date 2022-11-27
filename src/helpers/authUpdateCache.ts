import { MutationUpdaterFn, QueryLazyOptions } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Exact, SignInMutation, SignUpMutation } from 'generated/graphql';
import ME_QUERY from 'graphql/queries/user/me';

type AuthUpdateCache = (
  fetchMeQuery: (
    options?:
      | QueryLazyOptions<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined,
  ) => void,
) => MutationUpdaterFn<SignInMutation & SignUpMutation>;

const authUpdateCache: AuthUpdateCache = fetchMeQuery => {
  return async (cache, { data }) => {
    if (!data) return null;

    const result = data.signIn || data.signUp;

    if (result?.accessToken) {
      await AsyncStorage.setItem('authToken', result.accessToken);

      if (result.user) {
        cache.writeQuery({
          query: ME_QUERY,
          data: { me: result.user },
        });
      } else {
        fetchMeQuery();
      }
    }
  };
};

export default authUpdateCache;
