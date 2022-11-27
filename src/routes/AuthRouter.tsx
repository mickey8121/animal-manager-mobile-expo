import { FC } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from 'routes/types';

import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthRouter: FC = () => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name='SignIn' options={{ title: 'Sign In' }} component={SignInScreen} />
    <AuthStack.Screen name='SignUp' options={{ title: 'Sign Up' }} component={SignUpScreen} />
  </AuthStack.Navigator>
);

export default AuthRouter;
