import React, { memo, useMemo } from 'react';
import { Div, ScrollDiv } from 'react-native-magnus';
import { FeaturedRecipes, useFeaturedRecipes } from '../../hooks/recipes.hooks';
import { Heading3, Paragraph } from '../../theme/Typography';
import { ActivityIndicator } from 'react-native';
import VerticalRecipeCard from '../VerticalRecipeCard';

type Props = {};

const LatestRecipes: React.FC<Props> = () => {
  const { recipes, isLoading } = useFeaturedRecipes(FeaturedRecipes.LATEST);

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
          <Paragraph>No recipes to show.</Paragraph>
        </Div>
      );
    }

    return (
      <ScrollDiv horizontal mt={8}>
        {recipes.map((recipe, i) => (
          <VerticalRecipeCard recipe={recipe} key={i} />
        ))}
      </ScrollDiv>
    );
  }, [recipes, isLoading]);

  return (
    <Div mt={24} w="100%">
      <Heading3 fontWeight="600">Latest Recipes</Heading3>
      {Content}
    </Div>
  );
};

export default memo(LatestRecipes);
