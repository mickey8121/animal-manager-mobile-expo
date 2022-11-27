import { FC } from 'react';

import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer';
import * as Device from 'expo-device';

import HomeRouter from 'routes/AppDrawerNavigator/drawerRoutes/HomeRouter';
import LibraryRouter from 'routes/AppDrawerNavigator/drawerRoutes/LibraryRouter';
import { AppDrawerParamList } from 'routes/types';

import AlpacasForSaleRouter from './drawerRoutes/AlpacasForSaleRouter';

const AppDrawer = createDrawerNavigator<AppDrawerParamList>();

const screenOptions: DrawerNavigationOptions = {
  headerShown: false,
  drawerType: 'front',
  swipeEnabled: Device.osName === 'Android',
};

const AppDrawerNavigator: FC = () => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <AppDrawer.Navigator screenOptions={screenOptions}>
    <AppDrawer.Screen name='HomeRouter' component={HomeRouter} options={{ title: 'My Herds' }} />
    <AppDrawer.Screen
      name='LibraryRouter'
      component={LibraryRouter}
      options={{ title: 'Library' }}
    />
    <AppDrawer.Screen
      name='AlpacasForSaleRouter'
      component={AlpacasForSaleRouter}
      options={{ title: 'Alpacas For Sale' }}
    />
  </AppDrawer.Navigator>
);

export default AppDrawerNavigator;
