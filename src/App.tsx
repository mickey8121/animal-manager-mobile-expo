import { FC, useEffect, useState } from 'react';

import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import Router from 'routes/Router';

import UserProvider from 'providers/UserProvider';

import useCachedResources from 'hooks/useCachedResources';

import getApolloClient from 'startup/apollo';

import { Maybe } from 'generated/graphql';

const App: FC = () => {
  const isLoadingComplete = useCachedResources();
  const [client, setClient] = useState<Maybe<ApolloClient<NormalizedCacheObject>>>(null);

  useEffect(() => {
    void getApolloClient().then(setClient);
  }, []);

  if (!isLoadingComplete || !client) return null;

  return (
    <ApolloProvider client={client}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style='dark' />

      <ActionSheetProvider>
        <SafeAreaProvider>
          <UserProvider>
            <Router />
          </UserProvider>
        </SafeAreaProvider>
      </ActionSheetProvider>
    </ApolloProvider>
  );
};

export default registerRootComponent(App);
