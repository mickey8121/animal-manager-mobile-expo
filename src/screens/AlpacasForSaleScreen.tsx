import { FC } from 'react';

import ScreenLayout from 'components/layout/ScreenLayout';

import AlpacasForSaleList from 'components/animals/alpacasForSale/AlpacasForSaleList';

const AlpacasForSaleScreen: FC = () => {
  return (
    <ScreenLayout>
      <AlpacasForSaleList />
    </ScreenLayout>
  );
};

export default AlpacasForSaleScreen;
