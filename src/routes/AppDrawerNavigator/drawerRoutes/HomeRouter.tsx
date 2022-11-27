import { FC } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppDrawerScreenProps, HomeStackParamList } from 'routes/types';
import drawerRoutesScreenOptions from 'helpers/routes/drawerRoutesScreenOptions';

import HomeScreen from 'screens/HomeScreen';
import HerdScreen from 'screens/HerdScreen';
import EditHerdScreen from 'screens/EditHerdScreen';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeRouter: FC<AppDrawerScreenProps<'HomeRouter'>> = () => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <HomeStack.Navigator screenOptions={drawerRoutesScreenOptions}>
    <HomeStack.Screen name='Herds' component={HomeScreen} options={{ title: 'My Herds' }} />
    <HomeStack.Screen
      name='Herd'
      component={HerdScreen}
      options={({ route }) => ({ title: route.params.herdName })}
    />
    <HomeStack.Screen name='EditHerd' component={EditHerdScreen} options={{ title: 'Edit Herd' }} />
  </HomeStack.Navigator>
);

export default HomeRouter;
