import { FC } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppDrawerScreenProps, LibraryStackParamList } from 'routes/types';
import drawerRoutesScreenOptions from 'helpers/routes/drawerRoutesScreenOptions';

import LibraryScreen from 'screens/LibraryScreen';
import ArticleScreen from 'screens/ArticleScreen';

const Stack = createNativeStackNavigator<LibraryStackParamList>();

const LibraryRouter: FC<AppDrawerScreenProps<'LibraryRouter'>> = () => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <Stack.Navigator screenOptions={drawerRoutesScreenOptions}>
    <Stack.Screen name='Library' component={LibraryScreen} />
    <Stack.Screen
      name='Article'
      component={ArticleScreen}
      options={({ route }) => ({ title: route.params.post.title || 'Article' })}
    />
  </Stack.Navigator>
);

export default LibraryRouter;
