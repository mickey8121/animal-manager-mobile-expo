import { FC } from 'react';

import { AuthScreenProps } from 'routes/types';

import AuthForm from 'components/auth/AuthForm';

const SignInScreen: FC<AuthScreenProps<'SignIn'>> = () => <AuthForm type='signIn' />;

export default SignInScreen;
