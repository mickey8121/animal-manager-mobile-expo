import { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AppRouter from 'routes/AppRouter';
import AuthRouter from 'routes/AuthRouter';

import useCurrentUser from 'hooks/useCurrentUser';

const Router: FC = () => {
  const user = useCurrentUser();

  return <NavigationContainer>{user ? <AppRouter /> : <AuthRouter />}</NavigationContainer>;
};

export default Router;
