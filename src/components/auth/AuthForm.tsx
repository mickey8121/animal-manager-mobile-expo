import React, { FC, useCallback, useMemo, useState } from 'react';

import { KeyboardAvoidingView, Linking, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { UseNavigation } from 'routes/types';

import Input from 'components/common/Input';
import Button from 'components/common/Button';

import useDeviceInfo from 'hooks/useDeviceInfo';
import useSignIn from 'hooks/useSignIn';
import useSignUp from 'hooks/useSignUp';

interface Props {
  type: 'signIn' | 'signUp';
}

const AuthForm: FC<Props> = ({ type }) => {
  const { navigate } = useNavigation<UseNavigation<'AuthRouter'>>();
  const { keyboardVerticalOffset, isAndroid } = useDeviceInfo();

  const [data, setData] = useState<{ email: null | string; password: null | string }>({
    email: null,
    password: null,
  });

  const [signIn, { loading: signInLoading }] = useSignIn();
  const [signUp, { loading: signUpLoading }] = useSignUp();

  const isSignIn = useMemo(() => type === 'signIn', [type]);

  const handleChangeInputText = useCallback(
    name => (value: string) => setData({ ...data, [name]: value }),
    [data],
  );

  const handleForgotPassword = useCallback(
    () => Linking.openURL(`${process.env.WEB_URL}/forgot-password`),
    [],
  );
  const handleOppositePress = useCallback(
    () => navigate(isSignIn ? 'SignUp' : 'SignIn'),
    [isSignIn, navigate],
  );

  const handleSubmit = useCallback(() => {
    if (isSignIn) void signIn({ variables: { data } });
    else void signUp({ variables: { data } });
  }, [data, isSignIn, signIn, signUp]);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={isAndroid ? 'height' : 'padding'}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.form}>
          <Input
            placeholder='Email'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            onChangeText={handleChangeInputText('email')}
            style={styles.input}
          />
          <Input
            placeholder='Password'
            secureTextEntry
            autoCorrect={false}
            autoCapitalize='none'
            textContentType='password'
            onChangeText={handleChangeInputText('password')}
            style={styles.input}
          />

          <View style={styles.secondaryBtnsWrapper}>
            <Button
              label={isSignIn ? 'No account?' : 'Have account?'}
              style={styles.secondaryBtn}
              onPress={handleOppositePress}
            />

            {isSignIn && (
              <Button
                label='Forgot Password'
                style={styles.secondaryBtn}
                onPress={handleForgotPassword}
              />
            )}
          </View>
        </View>

        <Button
          label={isSignIn ? 'Sign In' : 'Sign Up'}
          style={styles.loginBtn}
          loading={!!(signInLoading || signUpLoading)}
          onPress={handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: '50%',
  },
  input: {
    marginBottom: 20,
  },
  secondaryBtnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  secondaryBtn: {
    marginBottom: 5,
  },
  loginBtn: {
    marginBottom: 20,
  },
});

export default AuthForm;
