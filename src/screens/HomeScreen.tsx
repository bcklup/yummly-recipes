import React, { memo, useCallback, useMemo } from 'react';
import { Div, Icon, Button as MagnusButton, ScrollDiv } from 'react-native-magnus';

import { CommonActions, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeaturedRecipesWidget from '../components/Home/FeaturedRecipesWidget';
import ShortcutWidget from '../components/Home/ShortcutWidget';
import { FeaturedRecipes } from '../hooks/recipes.hooks';
import { supabase } from '../initSupabase';
import { routes } from '../navigation/routes';
import useMainStore from '../store/main';
import { BodyMedium, Heading1, Highlight } from '../theme/Typography';

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
      mt={top + 10}
      px={24}
      bg="light"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Div mr="20%">
        <BodyMedium color="text4">Hello{!firstName ? '!' : `, ${firstName}`}</BodyMedium>
        <Heading1 fontWeight="600">What would you like to cook today?</Heading1>
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
        <BodyMedium color="text5">Search any recipes</BodyMedium>
      </MagnusButton>

      <FeaturedRecipesWidget type={FeaturedRecipes.LATEST} />
      <FeaturedRecipesWidget type={FeaturedRecipes.TRENDING} />
      <FeaturedRecipesWidget type={FeaturedRecipes.BREAKFAST} />
      <ShortcutWidget />
      <Div h={50} />
    </ScrollDiv>
  );
};

export default memo(HomeScreen);
