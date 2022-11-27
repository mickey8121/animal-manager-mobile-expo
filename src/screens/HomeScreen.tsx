import { FC } from 'react';

import { HomeScreenProps } from 'routes/types';

import ScreenLayout from 'components/layout/ScreenLayout';

import HerdsList from 'components/herds/HerdsList';

const HomeScreen: FC<HomeScreenProps<'Herds'>> = () => (
  <ScreenLayout>
    <HerdsList />
  </ScreenLayout>
);

export default HomeScreen;
