import React, { memo, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { Div, ScrollDiv } from 'react-native-magnus';
import HorizontalRecipeCard from '../components/HorizontalRecipeCard';
import { ScreenLayout } from '../components/ScreenLayout';
import { useRecentRecipes } from '../hooks/recipes.hooks';
import { Body } from '../theme/Typography';

type Props = {};

const RecentRecipesScreen: React.FC<Props> = () => {
  const { recipes, isLoading } = useRecentRecipes();

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
            You have not viewed any recipes yet.
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

  return <ScreenLayout title="Recently Viewed">{Content}</ScreenLayout>;
};

export default memo(RecentRecipesScreen);
