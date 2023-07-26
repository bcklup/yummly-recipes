import React, { memo, useEffect, useMemo } from 'react';
import { Div, ScrollDiv } from 'react-native-magnus';
import useMainStore from '../store/main';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSavedRecipes } from '../hooks/recipes.hooks';
import { Body, Heading1, Heading1Heavy } from '../theme/Typography';
import { ActivityIndicator } from 'react-native';
import HorizontalRecipeCard from '../components/HorizontalRecipeCard';

type Props = {};

const SavedRecipesScreen: React.FC<Props> = () => {
  const { session, setAuthModalVisible } = useMainStore();
  const { top } = useSafeAreaInsets();
  const { recipes, isLoading } = useSavedRecipes();

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
      <ScrollDiv flex={1} bg="light1">
        {recipes.map((recipe, i) => (
          <HorizontalRecipeCard recipe={recipe} key={i} />
        ))}
      </ScrollDiv>
    );
  }, [recipes, isLoading]);

  useEffect(() => {
    if (!session) {
      setAuthModalVisible(true);
    }
  }, [session]);

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
