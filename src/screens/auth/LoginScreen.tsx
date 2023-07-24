import { yupResolver } from '@hookform/resolvers/yup';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Div, Icon, ScrollDiv } from 'react-native-magnus';
import * as yup from 'yup';

import { useQueryClient } from '@tanstack/react-query';
import { Keyboard, Pressable } from 'react-native';

import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import { ScreenLayout } from '../../components/ScreenLayout';
import { routes } from '../../navigation/routes';
import { Heading3, Highlight, Paragraph } from '../../theme/Typography';
const logo = require('../../../assets/logo-text.png');

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const schema = yup
    .object({
      email: yup.string().email('Invalid email').required('Email required'),
      password: yup.string().required('Password required'),
    })
    .required();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { isValid, errors } = useFormState({ control });

  useEffect(() => {
    queryClient.clear();
  }, []);

  const handleForgot = useCallback(async () => {
    navigation.dispatch(StackActions.replace(routes.auth.resetPasswordRequest));
  }, []);

  const hanldeSignIn = useCallback(
    async (data: any) => {
      setIsLoading(true);
      Keyboard.dismiss();
      if (!data || !isValid) return;

      // const user = await signIn(data);
      // setIsLoading(false);
      // if (user.success) {
      //   doLoginNavigations();
      // } else if (user.data.code === 'UserNotConfirmedException') {
      //   navigation.navigate(routes.auth.twoFactorConfirm, {
      //     email: data.email || '',
      //     resume: true,
      //     password: data.password || '',
      //   });
      // } else {
      //   globalSnackbarRef.current?.show(user.data.message || 'Login failed. Please try again');
      // }
    },
    [isValid],
  );

  const hanldeRegister = useCallback(() => {
    navigation.dispatch(StackActions.replace(routes.auth.registration));
  }, []);

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  // const handleHelp = useCallback(() => {
  //   navigation.dispatch(StackActions.replace(routes.auth.getStarted));
  // }, [navigation]);

  return (
    <ScreenLayout title="Login">
      <ScrollDiv
        flex={1}
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <FormInput
          control={control}
          name="email"
          label="Email Address"
          placeholder="Enter Email Address"
          w="100%"
          mb={14}
          autoCapitalize="none"
          focusBorderColor="main"
          prefix={
            <Icon fontSize="2xl" name="mail-outline" color="text" fontFamily="Ionicons" mr={10} />
          }
        />
        <FormInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter Password"
          w="100%"
          mb={10}
          secureTextEntry={showPassword}
          focusBorderColor="main"
          prefix={
            <Icon
              fontSize="2xl"
              name="lock-closed-outline"
              color="text"
              fontFamily="Ionicons"
              mr={10}
            />
          }
          suffix={
            <Pressable onPress={handleShowPassword}>
              <Icon
                fontSize="2xl"
                name={showPassword ? 'eye' : 'eye-off'}
                color={showPassword ? 'dark4' : 'main'}
                fontFamily="Feather"
              />
            </Pressable>
          }
        />

        <Button
          block
          bg="main"
          py={10}
          mt={20}
          disabled={isLoading}
          loading={isLoading}
          onPress={handleSubmit(hanldeSignIn)}
        >
          <Heading3 fontWeight="500" color="light1" mr={20}>
            Continue
          </Heading3>
        </Button>

        <Highlight mt={30} color="main" textAlign="center" onPress={handleForgot}>
          Forgot Password?
        </Highlight>

        <Paragraph mt={8} fontWeight="300" textAlign="center">
          Don't have an account?{' '}
          <Highlight color="main" onPress={hanldeRegister}>
            Register now
          </Highlight>
        </Paragraph>
      </ScrollDiv>
    </ScreenLayout>
  );
};
