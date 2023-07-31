import { yupResolver } from '@hookform/resolvers/yup';
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Keyboard, Pressable } from 'react-native';
import { Div, Icon, ScrollDiv } from 'react-native-magnus';
import * as yup from 'yup';
import Button from '../../components/Button';

import FormInput from '../../components/FormInput';
import { ScreenLayout } from '../../components/ScreenLayout';
import { supabase } from '../../initSupabase';
import { routes } from '../../navigation/routes';
import useMainStore from '../../store/main';
import { Heading3, Highlight, ParagraphLight } from '../../theme/Typography';
import { globalSnackbarRef } from '../../utils/globalSnackbar';
import { openLink } from '../../utils/utilsCommon';
import { validatePassword } from '../../utils/validations';

const logo = require('../../../assets/logo.png');

export const RegistrationScreen: React.FC = () => {
  const navigation = useNavigation();
  const { setSession, setProfile } = useMainStore();
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const schema = yup
    .object({
      firstName: yup.string().required('First Name required'),
      lastName: yup.string().required('Last Name required'),
      email: yup.string().email('Invalid email').required('Email required'),
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

  const { handleSubmit, control } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

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

      const { error, data: resData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      // console.log('[Log] error, resData', { error, resData });

      console.log('[Log] resData', { resData });

      if (resData.user && !error) {
        // handle update user data
        const { error: error2, data: resData2 } = await supabase.from('profiles').insert({
          user_id: resData?.user.id,
          first_name: data.firstName,
          last_name: data.lastName,
        });

        console.log('[Log] error2, resData2', { error2, resData2 });

        globalSnackbarRef.current?.show('Please check your email for verification', { bg: 'main' });
        setIsLoading(false);

        navigation.dispatch(StackActions.replace(routes.auth.login));

        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: routes.auth.getStarted }],
        //   }),
        // );

        // console.log('[Log] error2, resData2', { error2, resData2 });

        // const { data: profileData, error: profileError } = await supabase
        //   .from('profiles')
        //   .select()
        //   .eq('user_id', resData.session.user.id);

        // // console.log('[Log] profileData, profileError', { profileData, profileError });

        // setProfile(!profileError && profileData ? profileData[0] : null);

        // setIsLoading(false);
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: routes.root }],
        //   }),
        // );
      } else {
        setIsLoading(false);
        globalSnackbarRef.current?.show(error?.message || 'Login failed. Please try again');
      }
    },
    [isValid],
  );

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
          onPress={handleSubmit(handleSignUp)}
        >
          <Heading3 fontWeight="500" color="light1">
            Continue
          </Heading3>
        </Button>

        <ParagraphLight color="dark3" textAlign="center" mt={24}>
          By Creating an account you agree to our terms and conditions and privacy policy as
          documented{' '}
          <Highlight color="main" onPress={handleTermsLink}>
            here.
          </Highlight>
        </ParagraphLight>
      </ScrollDiv>
    </ScreenLayout>
  );
};
