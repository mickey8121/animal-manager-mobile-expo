import { useEffect, useMemo } from 'react';

import { QueryResult } from '@apollo/client';

import queryUpdater from 'helpers/queryUpdater';

import { HerdMainFragmentFragment, HerdsQuery, Maybe, useHerdsQuery } from 'generated/graphql';
import HERDS_MAIN_SUBSCRIPTION from 'graphql/subscriptions/herds/herdsMain';

type UseHerds = () => Omit<
  QueryResult<HerdsQuery>,
  'data' | 'subscribeToMore' | 'networkStatus'
> & { herds: Maybe<HerdMainFragmentFragment[]>; refreshing: boolean };

const useHerds: UseHerds = () => {
  const {
    data: { herds = null } = {},
    subscribeToMore,
    networkStatus,
    ...herdsQueryResult
  } = useHerdsQuery({
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    subscribeToMore({ document: HERDS_MAIN_SUBSCRIPTION, updateQuery: queryUpdater('herds') });
  }, [subscribeToMore]);

  // networkStatus equal to 4 is a refresh
  const refreshing = useMemo(() => networkStatus === 4, [networkStatus]);

  return { herds, refreshing, ...herdsQueryResult };
};

export default useHerds;
