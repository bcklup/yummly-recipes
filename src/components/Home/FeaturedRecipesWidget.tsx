import React, { memo, useEffect, useMemo } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { Div, ScrollDiv } from 'react-native-magnus';
import { FeaturedRecipes, useFeaturedRecipes } from '../../hooks/recipes.hooks';
import { Body, Heading2 } from '../../theme/Typography';
import VerticalRecipeCard from '../VerticalRecipeCard';
import useMainStore from '../../store/main';

type Props = {
  type: FeaturedRecipes;
};

const FeaturedRecipesWidget: React.FC<Props> = ({ type }) => {
  const { recipes, isLoading, refetch } = useFeaturedRecipes(type);
  const { refresh } = useMainStore();

  useEffect(() => {
    refetch();
  }, [refresh, type]);

  const title = useMemo(() => {
    switch (type) {
      case FeaturedRecipes.LATEST:
        return 'Latest Recipes ';
      case FeaturedRecipes.TRENDING:
        return 'Trending Recipes';
      case FeaturedRecipes.FESTIVE:
        return 'Festive';
    }
  }, [type]);

  const Content = useMemo(() => {
    if (isLoading) {
      return (
        <Div w="100%" minH={100} alignItems="center" justifyContent="center">
          <ActivityIndicator size="small" />
        </Div>
      );
    }

    if (recipes.length <= 0) {
      return (
        <Div w="100%" minH={100} alignItems="center" justifyContent="center">
          <Body>No recipes to show.</Body>
        </Div>
      );
    }

    return (
      <ScrollView
        horizontal
        scrollEnabled
        style={{ paddingHorizontal: 24, marginTop: 14 }}
        showsHorizontalScrollIndicator={false}
        // decelerationRate="fast"
        // snapToAlignment="start"
        // scrollEventThrottle={16}
        // snapToInterval={140}
        // contentInset={{ left: 24 }}
        // bounces={false}
      >
        {recipes.map((recipe, i) => (
          <VerticalRecipeCard recipe={recipe} key={i} />
        ))}
      </ScrollView>
    );
  }, [recipes, isLoading]);

  return (
    <Div mt={28} w="100%">
      <Heading2 fontWeight="700" mx={24}>
        {title}
      </Heading2>
      {Content}
    </Div>
  );
};

export default memo(FeaturedRecipesWidget);
