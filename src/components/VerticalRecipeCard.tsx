import React, { memo, useEffect, useMemo, useState } from 'react';
import { Div, Image } from 'react-native-magnus';
import { Database } from '../types/supabase';
import { BodyHeavy, Highlight } from '../theme/Typography';
import { supabase } from '../initSupabase';

const placeholderImage = require('../../assets/images/thumb-placeholder.png');

type Props = {
  recipe: Database['public']['Tables']['recipes']['Row'];
};

const VerticalRecipeCard: React.FC<Props> = ({ recipe }) => {
  if (!recipe) return <></>;

  const recipePhoto = useMemo(
    () =>
      recipe.hero_img
        ? supabase.storage.from('recipe_photos').getPublicUrl(`thumb/${recipe.hero_img}.jpeg`).data
            .publicUrl
        : undefined,
    [recipe.hero_img],
  );

  console.log('[Log] recipePhoto', recipePhoto);

  return (
    <Div maxW={120}>
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
        w={120}
        h={150}
      />
      <Highlight mt={8} fontWeight="600" ellipsizeMode="tail" numberOfLines={2}>
        {recipe.title}
      </Highlight>
    </Div>
  );
};

export default memo(VerticalRecipeCard);
