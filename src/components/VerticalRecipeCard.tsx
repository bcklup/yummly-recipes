import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Div, Icon, Image } from 'react-native-magnus';
import { Database } from '../types/supabase';
import { Body, BodyHeavy, BodyMedium, Highlight, Small } from '../theme/Typography';
import { supabase } from '../initSupabase';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../navigation/routes';
import useMainStore from '../store/main';
const placeholderImage = require('../../assets/images/thumb-placeholder.png');

type Props = {
  recipe:
    | Database['public']['Tables']['recipes']['Row']
    | Database['public']['Views']['trending_recipes']['Row'];
};

const VerticalRecipeCard: React.FC<Props> = ({ recipe }) => {
  const { navigate } = useNavigation();
  const { session } = useMainStore();

  const handlePress = useCallback(async () => {
    if (recipe) {
      if (session) {
        await supabase
          .from('history')
          .delete()
          .eq('recipe_id', recipe.id)
          .eq('user_id', session.user.id);
        await supabase.from('history').insert({ user_id: session.user.id, recipe_id: recipe.id! });
      }
      navigate(routes.home.recipeDetails, { recipe });
    }
  }, [recipe]);

  const recipePhoto = useMemo(
    () =>
      recipe.hero_img
        ? supabase.storage.from('recipe_photos').getPublicUrl(`thumb/${recipe.hero_img}`).data
            .publicUrl
        : undefined,
    [recipe.hero_img],
  );

  if (!recipe) return <></>;

  return (
    <Button py={0} pl={0} pr={24} bg="transparent" onPress={handlePress}>
      <Div>
        <Image
          source={
            recipePhoto
              ? {
                  uri: recipePhoto || '',
                }
              : placeholderImage
          }
          resizeMode="cover"
          rounded="xl"
          w={140}
          h={170}
        />
        <Body fontWeight="600" ellipsizeMode="tail" numberOfLines={2}>
          {recipe.title}
        </Body>
        <Div row alignItems="center">
          <Icon color="text5" fontFamily="Octicons" fontSize="lg" name="heart-fill" />
          <Small fontWeight="500" color="text5" ml={6}>
            {recipe.saved_count || (recipe.saved && recipe.saved[0]?.count) || 0}
          </Small>
        </Div>
      </Div>
    </Button>
  );
};

export default memo(VerticalRecipeCard);
