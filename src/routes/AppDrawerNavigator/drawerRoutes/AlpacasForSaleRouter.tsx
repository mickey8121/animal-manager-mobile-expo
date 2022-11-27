import { FC } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import drawerRoutesScreenOptions from 'helpers/routes/drawerRoutesScreenOptions';

import AlpacasForSaleScreen from 'screens/AlpacasForSaleScreen';
import AlpacaForSaleScreen from 'screens/AlpacaForSaleScreen';

const AlpacasForSaleStack = createNativeStackNavigator();

const AlpacasForSaleRouter: FC = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <AlpacasForSaleStack.Navigator screenOptions={drawerRoutesScreenOptions}>
      <AlpacasForSaleStack.Screen
        name='AlpacasForSale'
        component={AlpacasForSaleScreen}
        options={{ title: 'Alpacas For Sale' }}
      />
      <AlpacasForSaleStack.Screen
        name='AlpacaForSale'
        component={AlpacaForSaleScreen}
        options={{ title: 'Alpaca For Sale' }}
      />
    </AlpacasForSaleStack.Navigator>
  );
};

export default AlpacasForSaleRouter;
