import { FC } from 'react';

import { HomeScreenProps } from 'routes/types';

import HerdProvider from 'providers/HerdProvider';

import ScreenLayout from 'components/layout/ScreenLayout';

import AnimalsList from 'components/animals/AnimalsList';

import useFragmentFromCache from 'hooks/useFragmentFromCache';

import HERD_MAIN_FRAGMENT from 'graphql/fragments/herds/herdMain';
import { HerdMainFragmentFragment } from 'generated/graphql';

const HerdScreen: FC<HomeScreenProps<'Herd'>> = ({
  route: {
    params: { herdId },
  },
}) => {
  const herd = useFragmentFromCache({
    id: `Herd:${herdId}`,
    fragment: HERD_MAIN_FRAGMENT,
    fragmentName: 'herdMainFragment',
  }) as HerdMainFragmentFragment;

  return (
    <ScreenLayout>
      <HerdProvider value={herd}>
        <AnimalsList />
      </HerdProvider>
    </ScreenLayout>
  );
};

export default HerdScreen;
