import React, { memo, useCallback, useMemo, useState } from 'react';
import { Div, Icon, Button as MagnusButton, ScrollDiv } from 'react-native-magnus';

import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeaturedRecipesWidget from '../components/Home/FeaturedRecipesWidget';
import ShortcutWidget from '../components/Home/ShortcutWidget';
import { FeaturedRecipes } from '../hooks/recipes.hooks';
import { routes } from '../navigation/routes';
import useMainStore from '../store/main';
import { BodyMedium, Heading1 } from '../theme/Typography';

const HomeScreen: React.FC = () => {
  const { session, profile } = useMainStore();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const [refresh, setRefresh] = useState<boolean>(false);

  const goToSearch = useCallback(() => {
    navigation.navigate(routes.tabs.search);
  }, []);

  const handleRefresh = () => {
    console.log('[Log] refresh', { refresh });
    setRefresh(!refresh);
  };

  const firstName = useMemo(() => profile?.first_name || '', [session]);

  return (
    <ScrollDiv
      flex={1}
      mt={top + 10}
      bg="light"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={false} />}
    >
      <Div mr="20%" px={24}>
        <BodyMedium color="text4">Hello{!firstName ? '!' : `, ${firstName}`}</BodyMedium>
        <Heading1 fontWeight="600">What would you like to cook today?</Heading1>
      </Div>

      <MagnusButton
        bg="light2"
        rounded="circle"
        block
        mt={18}
        mx={24}
        onPress={goToSearch}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Icon name="search-outline" fontFamily="Ionicons" fontSize="4xl" color="text5" mr={12} />
        <BodyMedium color="text5">Search any recipes</BodyMedium>
      </MagnusButton>

      <FeaturedRecipesWidget refresh={refresh} type={FeaturedRecipes.LATEST} />
      <FeaturedRecipesWidget refresh={refresh} type={FeaturedRecipes.TRENDING} />
      <FeaturedRecipesWidget refresh={refresh} type={FeaturedRecipes.BREAKFAST} />
      <ShortcutWidget />
      <Div h={50} />
    </ScrollDiv>
  );
};

export default memo(HomeScreen);
