import { useCallback, useMemo } from 'react';

import { QueryResult } from '@apollo/client';

import {
  AnimalForSaleMainFragmentFragment,
  AnimalsForSaleQuery,
  Maybe,
  useAnimalsForSaleQuery,
} from 'generated/graphql';

import uniqBy from 'lodash/uniqBy';

type UseAnimalsForSale = (variables?: { take?: number; skip?: number }) => Omit<
  QueryResult<AnimalsForSaleQuery>,
  'data' | 'fetchMore'
> & {
  animalsForSale: Maybe<AnimalForSaleMainFragmentFragment[]>;
  totalCount: number;
  refreshing: boolean;
  loadMore: () => void;
};

const useAnimalsForSale: UseAnimalsForSale = (variables = {}) => {
  const {
    data: {
      animalsForSale: {
        nodes: animalsForSale = null,
        totalCount = 0,
        pageInfo: { hasNextPage = false } = {},
      } = {},
    } = {},
    fetchMore,
    networkStatus,
    ...animalsForSaleQueryResult
  } = useAnimalsForSaleQuery({ variables, notifyOnNetworkStatusChange: true });

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      const skip = (variables?.skip || 0) + (animalsForSale?.length || 0);

      void fetchMore({
        variables: { ...variables, skip },
        updateQuery: (
          prev: any,
          { fetchMoreResult: { animalsForSale: newAnimalsForSale = {} } = {} },
        ) => ({
          ...prev,
          animalsForSale: {
            ...newAnimalsForSale,
            nodes: uniqBy([...prev.animalsForSale.nodes, ...(newAnimalsForSale.nodes || [])], 'id'),
          },
        }),
      });
    }
  }, [animalsForSale?.length, fetchMore, hasNextPage, variables]);

  const refreshing = useMemo(() => networkStatus === 4, [networkStatus]);

  return {
    animalsForSale,
    totalCount,
    hasNextPage,
    loadMore,
    refreshing,
    networkStatus,
    ...animalsForSaleQueryResult,
  };
};

export default useAnimalsForSale;
