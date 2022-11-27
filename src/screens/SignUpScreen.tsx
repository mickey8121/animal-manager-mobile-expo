import { FC } from 'react';

import { AuthScreenProps } from 'routes/types';

import AuthForm from 'components/auth/AuthForm';

const SignUpScreen: FC<AuthScreenProps<'SignUp'>> = () => <AuthForm type='signUp' />;

export default SignUpScreen;
