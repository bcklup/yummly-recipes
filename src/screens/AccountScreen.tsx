import React, { memo, useCallback } from 'react';
import { Div, Icon, Button as MagnusButton } from 'react-native-magnus';
import useMainStore from '../store/main';
import { Body, Heading1, Heading1Heavy, Heading2, Heading3 } from '../theme/Typography';
import Button from '../components/Button';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { routes } from '../navigation/routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../initSupabase';
type Props = {};

const AccountScreen: React.FC<Props> = () => {
  const { session, profile, setAuthModalVisible, clearSession } = useMainStore();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const goToSaved = useCallback(() => {
    if (!session) {
      setAuthModalVisible(true);
    } else {
      navigation.navigate(routes.tabs.saved);
    }
  }, [session]);

  const goToRecents = useCallback(() => {
    if (!session) {
      setAuthModalVisible(true);
    } else {
      navigation.navigate(routes.account.recent);
    }
  }, [session]);

  const handleLogin = useCallback(async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routes.auth.getStarted }, { name: routes.auth.login }],
      }),
    );
  }, []);

  const handleSignUp = useCallback(async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routes.auth.getStarted }, { name: routes.auth.registration }],
      }),
    );
  }, []);

  const handleLogout = useCallback(() => {
    supabase.auth.signOut().then(() => {
      clearSession();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routes.auth.getStarted }],
        }),
      );
    });
  }, []);

  if (!session) {
    return (
      <Div flex={1} bg="light" justifyContent="center" alignItems="center" mx={24}>
        <Heading1Heavy>You are not logged in</Heading1Heavy>
        <Body color="text4" textAlign="center">
          It only takes a few minutes to unlock the full features of Yummly Recipes!
        </Body>

        <Button block bg="main" onPress={handleLogin} mt={40}>
          <Heading3 fontWeight="500" color="light1">
            LOGIN
          </Heading3>
        </Button>
        <Button block bg="dark" onPress={handleSignUp} mt={10}>
          <Heading3 fontWeight="500" color="light1">
            SIGN UP
          </Heading3>
        </Button>
      </Div>
    );
  }

  return (
    <Div flex={1} bg="light" pt={top + 10} pb={20} px={24}>
      <Heading1Heavy textAlign="center">Account</Heading1Heavy>

      <Div flex={1}>
        <Div bg="light2" rounded="2xl" w="100%" mt={36} px={16} py={14}>
          <Heading2>
            {profile?.first_name} {profile?.last_name}
          </Heading2>
          <Body color="text4">{session?.user.email}</Body>
        </Div>

        <MagnusButton
          bg="light2"
          rounded="2xl"
          w="100%"
          mt={12}
          px={16}
          py={14}
          justifyContent="space-between"
          alignItems="center"
          onPress={goToSaved}
        >
          <Heading3 flex={1}>Saved Recipes</Heading3>
          <Icon name="chevron-right" fontFamily="Feather" color="text4" fontSize="4xl" />
        </MagnusButton>

        <MagnusButton
          bg="light2"
          rounded="2xl"
          w="100%"
          mt={12}
          px={16}
          py={14}
          justifyContent="space-between"
          alignItems="center"
          onPress={goToRecents}
        >
          <Heading3 flex={1}>Recently Viewed</Heading3>
          <Icon name="chevron-right" fontFamily="Feather" color="text4" fontSize="4xl" />
        </MagnusButton>
      </Div>

      <MagnusButton
        bg="light2"
        rounded="2xl"
        w="100%"
        mt={12}
        px={16}
        py={14}
        justifyContent="space-between"
        alignItems="center"
        onPress={handleLogout}
      >
        <Heading3 flex={1}>Log Out</Heading3>
        <Icon name="exit-outline" fontFamily="Ionicons" color="main" fontSize="4xl" />
      </MagnusButton>
    </Div>
  );
};

export default memo(AccountScreen);
