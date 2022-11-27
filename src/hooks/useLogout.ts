import { useCallback } from 'react';

import { Alert } from 'react-native';
import { useApolloClient } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ME_QUERY from 'graphql/queries/user/me';

const useLogout = (): (() => void) => {
  const client = useApolloClient();

  const logout = useCallback(
    (): void =>
      Alert.alert(
        'Log Out',
        '',
        [
          {
            text: 'No',
            style: 'default',
          },
          {
            text: 'Yes',
            onPress: async (): Promise<any> => {
              await AsyncStorage.clear();
              void client.resetStore();

              client.writeQuery({
                query: ME_QUERY,
                data: { me: null },
              });
            },
            style: 'destructive',
          },
        ],
        { cancelable: true },
      ),
    [client],
  );

  return logout;
};

export default useLogout;
