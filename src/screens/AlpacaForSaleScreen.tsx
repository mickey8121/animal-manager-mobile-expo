import { FC } from 'react';

import { AlpacasForSaleScreenProps } from 'routes/types';

import ScreenLayout from 'components/layout/ScreenLayout';

import AlpacaForSaleProfile from 'components/animals/alpacasForSale/AlpacaForSaleProfile';

const AlpacaForSaleScreen: FC<AlpacasForSaleScreenProps<'AlpacaForSale'>> = ({
  route: {
    params: { alpacaForSale },
  },
}) => (
  <ScreenLayout>
    <AlpacaForSaleProfile alpacaForSale={alpacaForSale} />
  </ScreenLayout>
);

export default AlpacaForSaleScreen;
