import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Div, ScrollDiv } from 'react-native-magnus';
import useMainStore from '../store/main';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSavedRecipes } from '../hooks/recipes.hooks';
import { Body, Heading1, Heading1Heavy, Heading3 } from '../theme/Typography';
import { ActivityIndicator } from 'react-native';
import HorizontalRecipeCard from '../components/HorizontalRecipeCard';
import Button from '../components/Button';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { routes } from '../navigation/routes';

type Props = {};

const SavedRecipesScreen: React.FC<Props> = () => {
  const { session } = useMainStore();
  const { top } = useSafeAreaInsets();
  const { recipes, isLoading } = useSavedRecipes();
  const navigation = useNavigation();

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

  const Content = useMemo(() => {
    if (isLoading) {
      return (
        <Div bg="light" flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Div>
      );
    }

    if (!recipes || recipes.length <= 0) {
      return (
        <Div bg="light" flex={1} justifyContent="center" alignItems="center" mx={20}>
          <Body textAlign="center" color="text5">
            You have no Saved Recipes yet.
          </Body>
        </Div>
      );
    }

    return (
      <ScrollDiv scrollEnabled flex={1} bg="light1">
        {recipes.map((recipe, i) => (
          <HorizontalRecipeCard recipe={recipe} key={i} />
        ))}
      </ScrollDiv>
    );
  }, [recipes, isLoading]);

  if (!session) {
    return (
      <Div flex={1} bg="light" justifyContent="center" alignItems="center" mx={24}>
        <Heading1Heavy>You are not logged in</Heading1Heavy>
        <Body color="text4" textAlign="center">
          It only takes a few minutes to unlock the full features of Yummly Recipes!
        </Body>
        <Div w="80%">
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
      </Div>
    );
  }

  return (
    <Div flex={1}>
      <Div bg="light" px={20} pt={top + 20} pb={14}>
        <Heading1>Your Saved Recipes</Heading1>
      </Div>
      {Content}
    </Div>
  );
};

export default memo(SavedRecipesScreen);
