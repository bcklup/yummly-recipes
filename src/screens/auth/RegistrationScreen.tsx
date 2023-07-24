import { yupResolver } from '@hookform/resolvers/yup';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { Div, Icon, Image, ScrollDiv } from 'react-native-magnus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import Button from '../../components/Button';

import FormInput from '../../components/FormInput';
import { useAmplifyAuth } from '../../hooks/auth-hooks';
import { useUserRequests } from '../../hooks/user-hooks';
import { routes } from '../../navigation/routes';
import { Heading2, Heading3, Heading4, Paragraph, ParagraphLight } from '../../theme/Typography';
import { globalSnackbarRef } from '../../utils/globalSnackbar';
import { openLink } from '../../utils/utilsCommon';
import { validatePassword } from '../../utils/validations';
import { ScreenLayout } from '../../components/ScreenLayout';

const logo = require('../../../assets/logo.png');

export const RegistrationScreen: React.FC = () => {
  const navigation = useNavigation();
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

  const handleTermsLink = useCallback(() => {
    openLink(
      'https://yummly-recipes.notion.site/Terms-and-Conditions-b53138a31e0a45d79433a578034bdf22?pvs=4',
    );
  }, []);

  const handleSignUp = useCallback(
    async (data: any) => {
      if (!data || !isValid) return;
      setIsLoading(true);
      Keyboard.dismiss();

      // const user = await signUp(data);
      // setIsLoading(false);
      // console.log('[Log] user', { user });
      // if (user && !user.error) {
      //   navigate(routes.auth.twoFactorConfirm, { email: data.email || '' });
      // } else {
      //   if (user?.error?.code === 'UsernameExistsException') {
      //     globalSnackbarRef.current?.show(
      //       'This email address is active. Please login or reset password',
      //     );
      //   } else {
      //     globalSnackbarRef.current?.show('Error occured. Please try again.');
      //   }
      // }
    },
    [isValid],
  );

  const hanldeSignIn = useCallback(() => {
    navigation.dispatch(StackActions.replace(routes.auth.login));
  }, []);

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <ScreenLayout title="Sign Up">
      <ScrollDiv
        flex={1}
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Div row alignItems="flex-start" w="100%">
          <Div flex={1}>
            <FormInput
              control={control}
              name="firstName"
              label="First Name"
              placeholder="First Name"
              autoCapitalize="words"
              w="100%"
              mb={10}
              focusBorderColor="main"
              errorMessage={errors?.firstName?.message}
              prefix={
                <Icon
                  fontSize="2xl"
                  name="account-outline"
                  color="text"
                  mr={10}
                  fontFamily="MaterialCommunityIcons"
                />
              }
            />
          </Div>
          <Div w={10} />
          <Div flex={1}>
            <FormInput
              control={control}
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              autoCapitalize="words"
              w="100%"
              mb={10}
              focusBorderColor="main"
              errorMessage={errors?.lastName?.message}
              prefix={
                <Icon
                  fontSize="2xl"
                  name="account-outline"
                  color="secondary"
                  mr={10}
                  fontFamily="MaterialCommunityIcons"
                />
              }
            />
          </Div>
        </Div>
        <FormInput
          control={control}
          name="email"
          label="Email Address"
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
            <Icon
              fontSize="2xl"
              name="mail-outline"
              color="secondary"
              fontFamily="Ionicons"
              mr={10}
            />
          }
          // suffix={
          //   formValues.email === '' && (
          //     <Icon fontSize="2xl" name="info" color="main" fontFamily="Feather" />
          //   )
          // }
        />
        <FormInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter Password"
          keyboardType="visible-password"
          w="100%"
          mb={10}
          px={10}
          py={9}
          secureTextEntry={showPassword}
          focusBorderColor="main"
          errorMessage={errors?.password?.message}
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

        <ParagraphLight color="dark3" textAlign="center" mt={24}>
          By Creating an account you agree to our terms and conditions and privacy policy as
          documented{' '}
          <ParagraphLight color="main" onPress={handleTermsLink}>
            here.
          </ParagraphLight>
        </ParagraphLight>
      </ScrollDiv>
    </ScreenLayout>
  );
};
