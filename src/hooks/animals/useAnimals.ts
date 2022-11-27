import { useCallback, useEffect, useMemo } from 'react';

import { QueryResult } from '@apollo/client';

import queryUpdater from 'helpers/queryUpdater';

import {
  useAnimalsQuery,
  Maybe,
  Animal,
  AnimalMainFragmentFragment,
  AnimalsQuery,
  AnimalsQueryVariables,
} from 'generated/graphql';
import ANIMALS_MAIN_SUBSCRIPTION from 'graphql/subscriptions/animals/animalsMain';

import uniqBy from 'lodash/uniqBy';

type UseAnimals = (props: { herdId?: string; take?: number; skip?: number }) => Omit<
  QueryResult<AnimalsQuery>,
  'data' | 'subscribeToMore' | 'fetchMore'
> & {
  animals: Maybe<AnimalMainFragmentFragment[]>;
  totalCount: number;
  loadMore: () => void;
};

const useAnimals: UseAnimals = ({ herdId, ...params }) => {
  const variables = useMemo<AnimalsQueryVariables>(
    () => ({
      where: { herdId },
      ...params,
    }),
    [herdId, params],
  );

  const {
    data: {
      animals: {
        nodes: animals = null,
        totalCount = 0,
        pageInfo: { hasNextPage = false } = {},
      } = {},
    } = {},
    subscribeToMore,
    fetchMore,
    ...animalsQueryResult
  } = useAnimalsQuery({
    variables,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    subscribeToMore({
      document: ANIMALS_MAIN_SUBSCRIPTION,
      variables,
      updateQuery: queryUpdater('animal', true),
    });
  }, [subscribeToMore, variables]);

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      const skip = (params.skip || 0) + (animals?.length || 0);

      void fetchMore({
        variables: { ...variables, skip },
        updateQuery: (prev: any, { fetchMoreResult: { animals: newAnimals = {} } = {} }) => ({
          ...prev,
          animals: {
            ...newAnimals,
            nodes: uniqBy([...prev.animals.nodes, ...(newAnimals.nodes || [])], 'id'),
          },
        }),
      });
    }
  }, [animals, fetchMore, hasNextPage, params, variables]);

  return {
    animals: (animals ?? null) as Animal[],
    totalCount,
    hasNextPage,
    loadMore,
    ...animalsQueryResult,
  };
};

export default useAnimals;
