import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { phone } from 'phone';
import React, { useCallback, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { Div, Icon, Image, ScrollDiv } from 'react-native-magnus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import Button from '../../components/Button';

import FormInput from '../../components/Form/FormInput';
import { useAmplifyAuth } from '../../hooks/auth-hooks';
import { useUserRequests } from '../../hooks/user-hooks';
import { routes } from '../../navigation/routes';
import { Heading2, Heading3, Heading4, Paragraph, ParagraphLight } from '../../theme/Typography';
import { globalSnackbarRef } from '../../utils/globalSnackbar';
import { openLink } from '../../utils/helpers';
import { validatePassword } from '../../utils/validations';

const logo = require('../../../assets/icon.png');

export const RegistrationScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { signUp } = useAmplifyAuth();
  const { top } = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const schema = yup
    .object({
      firstName: yup.string().required('First Name required'),
      lastName: yup.string().required('Last Name required'),
      email: yup.string().email('Invalid email').required('Email required'),
      phoneNumber: yup
        .string()
        .min(4, 'Invalid phone number')
        .max(15, 'Invalid phone number')
        .matches(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/g, 'Invalid phone number')
        .required('Phone Number required'),
      password: yup
        .string()
        .test(
          'is-valid-password',
          'Your password must contain uppercase and lowercase letters, at least one number, and at least one symbol.',
          validatePassword,
        )
        .required('Password required'),
    })
    .required();

  const { handleSubmit, control, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
  });

  const formValues = watch();

  const { isValid, errors } = useFormState({ control });

  const handleSignUp = useCallback(
    async (data: any) => {
      if (!data || !isValid) return;
      setIsLoading(true);
      Keyboard.dismiss();

      data.phoneNumber = phone(data.phoneNumber, {
        country: 'AUS',
        validateMobilePrefix: false,
      }).phoneNumber;

      if (!data.phoneNumber) {
        setIsLoading(false);
        return;
      }

      const user = await signUp(data);
      setIsLoading(false);
      console.log('[Log] user', { user });
      if (user && !user.error) {
        navigate(routes.auth.twoFactorConfirm, { email: data.email || '' });
      } else {
        if (user?.error?.code === 'UsernameExistsException') {
          globalSnackbarRef.current?.show(
            'This email address is active. Please login or reset password',
          );
        } else {
          globalSnackbarRef.current?.show('Error occured. Please try again.');
        }
      }
    },
    [isValid],
  );

  const hanldeSignIn = useCallback(() => {
    navigate(routes.auth.login);
  }, []);

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : undefined}
      style={{ flex: 1, backgroundColor: '#ECECEC' }}
      keyboardVerticalOffset={-200}
    >
      <ScrollDiv h="100%" bg="light3">
        <Div bg="light3" alignItems="center" justifyContent="flex-start" pb={40}>
          <Image source={logo} w={60} h={60} mt={top + 40} />
          <Div alignItems="center" mt={8} p={12} w="100%">
            <Heading2>Create Account</Heading2>
            <Heading4 color="text3">Enter New Credentials</Heading4>

            <Div mx={16} my={30}>
              <FormInput
                control={control}
                name="firstName"
                placeholder="Enter First Name"
                autoCapitalize="words"
                w="100%"
                mb={10}
                px={10}
                py={9}
                focusBorderColor="main"
                errorMessage={errors?.firstName?.message}
                prefix={
                  <Div
                    alignItems="center"
                    justifyContent="center"
                    bg="light4"
                    rounded={100}
                    p={4}
                    mr={10}
                  >
                    <Icon
                      fontSize="2xl"
                      name="account-outline"
                      color="text"
                      fontFamily="MaterialCommunityIcons"
                    />
                  </Div>
                }
                // suffix={
                //   formValues.firstName === '' && (
                //     <Icon fontSize="2xl" name="info" color="main" fontFamily="Feather" />
                //   )
                // }
              />
              <FormInput
                control={control}
                name="lastName"
                placeholder="Enter Last Name"
                autoCapitalize="words"
                w="100%"
                mb={10}
                px={10}
                py={9}
                focusBorderColor="main"
                errorMessage={errors?.lastName?.message}
                prefix={
                  <Div
                    alignItems="center"
                    justifyContent="center"
                    bg="light4"
                    rounded={100}
                    p={4}
                    mr={10}
                  >
                    <Icon
                      fontSize="2xl"
                      name="account-outline"
                      color="secondary"
                      fontFamily="MaterialCommunityIcons"
                    />
                  </Div>
                }
                // suffix={
                //   formValues.lastName === '' && (
                //     <Icon fontSize="2xl" name="info" color="main" fontFamily="Feather" />
                //   )
                // }
              />
              <FormInput
                control={control}
                name="email"
                placeholder="Enter Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                w="100%"
                mb={10}
                px={10}
                py={9}
                focusBorderColor="main"
                errorMessage={errors?.email?.message}
                prefix={
                  <Div
                    alignItems="center"
                    justifyContent="center"
                    bg="light4"
                    rounded={100}
                    p={6}
                    mr={10}
                  >
                    <Icon fontSize="lg" name="mail" color="secondary" fontFamily="Feather" />
                  </Div>
                }
                // suffix={
                //   formValues.email === '' && (
                //     <Icon fontSize="2xl" name="info" color="main" fontFamily="Feather" />
                //   )
                // }
              />
              <FormInput
                control={control}
                name="phoneNumber"
                placeholder="Enter Phone Number"
                keyboardType="phone-pad"
                w="100%"
                mb={10}
                px={10}
                py={9}
                focusBorderColor="main"
                errorMessage={errors?.phoneNumber?.message}
                prefix={
                  <Div
                    alignItems="center"
                    justifyContent="center"
                    bg="light4"
                    rounded={100}
                    p={6}
                    mr={10}
                  >
                    <Icon fontSize="lg" name="phone" color="text" fontFamily="Feather" />
                  </Div>
                }
                // suffix={
                //   formValues.phoneNumber === '' && (
                //     <Icon fontSize="2xl" name="info" color="main" fontFamily="Feather" />
                //   )
                // }
              />
              <FormInput
                control={control}
                name="password"
                placeholder="Password"
                keyboardType="visible-password"
                w="100%"
                mb={10}
                px={10}
                py={9}
                secureTextEntry={showPassword}
                focusBorderColor="main"
                errorMessage={errors?.password?.message}
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
                      fontSize="lg"
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
                mt={24}
                disabled={!isValid || isLoading}
                loading={isLoading}
                onPress={handleSubmit(handleSignUp)}
              >
                <Heading3 fontWeight="500" color="light1" mr={20}>
                  Create Account
                </Heading3>
                <Div bg="light1" alignItems="center" justifyContent="center" p={6} rounded={100}>
                  <Icon name="arrowright" fontFamily="AntDesign" fontSize="md" color="main" />
                </Div>
              </Button>

              <Paragraph mt={24} fontWeight="300" textAlign="center">
                Already have an Account?{' '}
                <Paragraph color="main" onPress={hanldeSignIn}>
                  Sign In
                </Paragraph>
              </Paragraph>

              <ParagraphLight color="dark3" textAlign="center" mt={24}>
                By Creating an account you agree to our terms and conditions and privacy policy as
                documented{' '}
                <ParagraphLight color="main" onPress={handleTermsLink}>
                  here.
                </ParagraphLight>
              </ParagraphLight>
            </Div>
          </Div>
        </Div>
      </ScrollDiv>
    </KeyboardAvoidingView>
  );
};
