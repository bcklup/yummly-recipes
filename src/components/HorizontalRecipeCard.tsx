import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useMemo } from 'react';
import { Pressable } from 'react-native';
import { Div, Icon, Image } from 'react-native-magnus';
import { supabase } from '../initSupabase';
import { routes } from '../navigation/routes';
import { BodyMedium, Paragraph, Small, SmallHighlight } from '../theme/Typography';
import { Database } from '../types/supabase';

const placeholderImage = require('../../assets/images/thumb-placeholder.png');

type Props = {
  recipe:
    | Database['public']['Tables']['recipes']['Row']
    | Database['public']['Views']['trending_recipes']['Row'];
};

const HorizontalRecipeCard: React.FC<Props> = ({ recipe }) => {
  console.log('[Log] recipe', { recipe });
  const { navigate } = useNavigation();

  const handlePress = useCallback(() => {
    if (recipe) {
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
    <Pressable onPress={handlePress}>
      <Div row my={8} maxH={200} px={20} py={10} bg="light" alignItems="center">
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
          w={110}
          h={90}
        />
        <Div ml={12} flex={1}>
          <Div flex={1}>
            <BodyMedium fontWeight="600" ellipsizeMode="tail" numberOfLines={2}>
              {recipe.title}
            </BodyMedium>
            <Paragraph mt={4} flex={1} numberOfLines={2} lineHeight={18} ellipsizeMode="tail">
              {recipe.description}
            </Paragraph>
          </Div>
          <Div row alignItems="center">
            <Icon color="text5" fontFamily="Octicons" fontSize="lg" name="heart-fill" />
            <Small fontWeight="500" color="text5" ml={6}>
              {recipe.saved_count || (recipe.saved && recipe.saved[0]?.count) || 0}
            </Small>
          </Div>
        </Div>
      </Div>
    </Pressable>
  );
};

export default memo(HorizontalRecipeCard);
