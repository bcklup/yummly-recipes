import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Div, Image } from 'react-native-magnus';
import { Database } from '../types/supabase';
import { BodyHeavy, BodyMedium, Highlight } from '../theme/Typography';
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
        ? supabase.storage.from('recipe_photos').getPublicUrl(`thumb/${recipe.hero_img}.jpeg`).data
            .publicUrl
        : undefined,
    [recipe.hero_img],
  );

  if (!recipe) return <></>;

  return (
    <Pressable style={{ maxWidth: 120 }} onPress={handlePress}>
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
      <BodyMedium ml={4} fontWeight="600" mt={8} ellipsizeMode="tail" numberOfLines={2}>
        {recipe.title}
      </BodyMedium>
    </Pressable>
  );
};

export default memo(VerticalRecipeCard);
