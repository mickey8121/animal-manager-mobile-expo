/* eslint-disable prefer-destructuring */
import { Alert } from 'react-native';
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NextLink,
  NormalizedCacheObject,
  Operation,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition, removeDirectivesFromDocument } from '@apollo/client/utilities';

import cacheOptions from 'startup/apollo/cache-options';

import { createClient } from 'graphql-ws';
import { OperationDefinitionNode, StringValueNode } from 'graphql';

const API_URL = process.env.API_URL;
const SANITY_API_URL = process.env.SANITY_API_URL;
const SUBSCRIPTION_URL = process.env.SUBSCRIPTION_URL;
const APP_NAME = process.env.APP_NAME;
const ENV_NAME = process.env.ENV_NAME;

const getApolloClient = async (): Promise<ApolloClient<NormalizedCacheObject>> => {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: SUBSCRIPTION_URL as string,
      connectionParams: async (): Promise<any> => {
        const token = await AsyncStorage.getItem('authToken');

        return {
          Authorization: token,
          app: APP_NAME?.toUpperCase() || '',
        };
      },
    }),
  );

  const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('authToken');

    return {
      headers: {
        ...headers,
        app: APP_NAME?.toUpperCase() || '',
        authorization: token || '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        // Without this check there Unauthorized Error
        // will be displayed every time user login and logout
        // because we are querying ME_QUERY
        if (message !== 'Unauthorized') {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          );
          Alert.alert('Error', `${message}`);
        }
      });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
      Alert.alert('Error', `${networkError}`);
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);

      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    (operation: Operation, forward: NextLink) => {
      const httpLink = new HttpLink();

      const apiName: string = (
        (
          operation.query.definitions.find(
            definition => definition.kind === 'OperationDefinition',
          ) as OperationDefinitionNode
        )?.directives
          ?.find(directive => directive.name?.value === 'api')
          ?.arguments?.find(argument => argument.name?.value === 'name')?.value as StringValueNode
      )?.value;

      const query = removeDirectivesFromDocument([{ name: 'api', remove: true }], operation.query);

      if (!query) throw new Error('Error while removing directive api');

      operation.query = query;

      switch (apiName) {
        case 'sanity': {
          operation.setContext({
            uri: SANITY_API_URL,
            headers: {},
          });

          break;
        }

        default: {
          const headers = operation.getContext().headers;

          operation.setContext({
            uri: API_URL,
            headers,
          });
        }
      }

      return httpLink.request(operation, forward);
    },
  );

  const cache = new InMemoryCache({ ...cacheOptions });

  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
  });

  const client = new ApolloClient({
    link: from([errorLink, authLink, splitLink]),
    cache,
    name: ENV_NAME,
    version: '1.0.0',
  });

  return client;
};

export default getApolloClient;
