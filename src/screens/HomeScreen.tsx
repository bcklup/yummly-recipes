import React, { memo, useCallback, useMemo } from 'react';
import { Div, ScrollDiv, Button as MagnusButton, Icon } from 'react-native-magnus';

import useMainStore from '../store/main';
import { Heading1Heavy, Heading2, Heading3, Heading4, Highlight, Small } from '../theme/Typography';
import Button from '../components/Button';
import { supabase } from '../initSupabase';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { routes } from '../navigation/routes';
import { ScreenLayout } from '../components/ScreenLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LatestRecipes from '../components/Home/LatestRecipes';
import TrendingRecipes from '../components/Home/TrendingRecipes';

const HomeScreen: React.FC = () => {
  const { session, clearSession, profile } = useMainStore();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();

  const logout = useCallback(() => {
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

  const goToSearch = useCallback(() => {
    navigation.navigate(routes.tabs.search);
  }, []);

  const openSettingsModal = useCallback(() => {}, []);

  const firstName = useMemo(() => profile?.first_name || '', [session]);

  return (
    <ScrollDiv
      flex={1}
      pt={top + 10}
      px={24}
      bg="light"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Div mr="20%">
        <Highlight color="text4">Hello{!firstName ? '!' : `, ${firstName}`}</Highlight>
        <Heading2 fontWeight="600">What would you like to cook today?</Heading2>
      </Div>

      <MagnusButton
        bg="light2"
        rounded="circle"
        block
        mt={18}
        onPress={goToSearch}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Icon name="search-outline" fontFamily="Ionicons" fontSize="4xl" color="text5" mr={12} />
        <Highlight color="text5">Search any recipes</Highlight>
      </MagnusButton>

      <LatestRecipes />
      <TrendingRecipes />
    </ScrollDiv>
  );
};

export default memo(HomeScreen);
