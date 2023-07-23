import { yupResolver } from '@hookform/resolvers/yup';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Div, Icon, Image, ScrollDiv } from 'react-native-magnus';
import * as yup from 'yup';

import { Keyboard, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';

import Graphic from '../../../assets/images/getstarted/intro-1.svg';
import Button from '../../components/Button';
import FormInput from '../../components/Form/FormInput';
import { useAmplifyAuth } from '../../hooks/auth-hooks';
import { useUserRequests } from '../../hooks/user-hooks';
import { routes } from '../../navigation/routes';
import { Heading2, Heading3, Heading4, Paragraph } from '../../theme/Typography';
import { globalSnackbarRef } from '../../utils/globalSnackbar';
const logo = require('../../../assets/logo-text.png');

export const LoginScreen: React.FC = () => {
  // const navigation = useNavigation();
  // const { signIn, forgotPassword } = useAmplifyAuth();
  // const { doLoginNavigations } = useUserRequests();
  // const [showPassword, setShowPassword] = useState<boolean>(true);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const queryClient = useQueryClient();

  // const schema = yup
  //   .object({
  //     email: yup.string().email('Invalid email').required('Email required'),
  //     password: yup.string().required('Password required'),
  //   })
  //   .required();

  // const { handleSubmit, control } = useForm({
  //   resolver: yupResolver(schema),
  //   mode: 'onChange',
  // });

  // const { isValid, errors } = useFormState({ control });

  // useEffect(() => {
  //   queryClient.clear();
  // }, []);

  // const handleForgot = useCallback(async () => {
  //   navigation.dispatch(StackActions.replace(routes.auth.resetPasswordRequest));
  // }, []);

  // const hanldeSignIn = useCallback(
  //   async (data: any) => {
  //     setIsLoading(true);
  //     Keyboard.dismiss();
  //     if (!data || !isValid) return;

  //     const user = await signIn(data);
  //     setIsLoading(false);
  //     if (user.success) {
  //       doLoginNavigations();
  //     } else if (user.data.code === 'UserNotConfirmedException') {
  //       navigation.navigate(routes.auth.twoFactorConfirm, {
  //         email: data.email || '',
  //         resume: true,
  //         password: data.password || '',
  //       });
  //     } else {
  //       globalSnackbarRef.current?.show(user.data.message || 'Login failed. Please try again');
  //     }
  //   },
  //   [isValid],
  // );

  // const hanldeRegister = useCallback(() => {
  //   navigation.dispatch(StackActions.replace(routes.auth.registration));
  // }, []);

  // const handleShowPassword = useCallback(() => {
  //   setShowPassword(!showPassword);
  // }, [showPassword]);

  // const handleHelp = useCallback(() => {
  //   navigation.dispatch(StackActions.replace(routes.auth.getStarted));
  // }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : undefined}
      style={{ flex: 1, backgroundColor: '#ECECEC' }}
      keyboardVerticalOffset={-200}
    >
      {/* <ScrollDiv bg="light3" h="100%">
        <Div bg="light3" alignItems="center" justifyContent="flex-start" pb={40}>
          <Graphic width="70%" height={250} style={{ marginTop: '15%', alignSelf: 'center' }} />
          <Image source={logo} w={200} h={50} resizeMode="contain" />

          <Div alignItems="center" px={12} mt={30} w="100%">
            <Heading2>Sign In</Heading2>
            <Heading4 color="text3">Enter Your Login Credentials</Heading4>

            <Div mx={21} my={18} mt={30}>
              <FormInput
                control={control}
                fontSize="md"
                name="email"
                placeholder="Email Address"
                w="100%"
                mb={14}
                px={10}
                autoCapitalize="none"
                py={9}
                focusBorderColor="main"
                prefix={
                  <Div
                    alignItems="center"
                    justifyContent="center"
                    bg="light4"
                    rounded={100}
                    p={6}
                    mr={10}
                  >
                    <Icon fontSize="md" name="mail" color="text" fontFamily="Feather" />
                  </Div>
                }
              />
              <FormInput
                control={control}
                name="password"
                placeholder="Password"
                w="100%"
                mb={10}
                px={10}
                py={9}
                secureTextEntry={showPassword}
                focusBorderColor="main"
                prefix={
                  <Div
                    alignItems="center"
                    justifyContent="center"
                    bg="light4"
                    rounded={100}
                    p={6}
                    mr={10}
                  >
                    <Icon
                      fontSize="md"
                      name="lock-closed-outline"
                      color="text"
                      fontFamily="Ionicons"
                    />
                  </Div>
                }
                suffix={
                  <Pressable onPress={handleShowPassword}>
                    <Icon
                      fontSize="2xl"
                      name={showPassword ? 'eye' : 'eye-off'}
                      color="main"
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
                  Sign In
                </Heading3>
                <Div bg="light1" alignItems="center" justifyContent="center" p={6} rounded={100}>
                  <Icon name="arrowright" fontFamily="AntDesign" fontSize="md" color="main" />
                </Div>
              </Button>

              <Paragraph mt={30} color="main" textAlign="center" onPress={handleForgot}>
                Forgot Password?
              </Paragraph>

              <Paragraph mt={8} fontWeight="300" textAlign="center">
                Don't have an account?{' '}
                <Paragraph color="main" onPress={hanldeRegister}>
                  Register now
                </Paragraph>
              </Paragraph>
            </Div>
          </Div>
        </Div>
      </ScrollDiv>
      <Pressable onPress={handleHelp}>
        <Div bg="main" rounded="circle" p={8} position="absolute" bottom={30} right={34}>
          <Icon name="help-circle" fontFamily="Feather" color="light1" fontSize="4xl" />
        </Div>
      </Pressable> */}
    </KeyboardAvoidingView>
  );
};
