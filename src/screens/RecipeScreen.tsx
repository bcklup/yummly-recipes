import { useNavigation, useRoute } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Div, Icon, Button as MagnusButton, ScrollDiv } from 'react-native-magnus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { format } from 'date-fns';
import { supabase } from '../initSupabase';
import { Heading2, Heading4, Paragraph, Small, SmallHighlight } from '../theme/Typography';
import { Database } from '../types/supabase';
import { DateTimeFormats } from '../utils/parsers';
import { ResizeMode, Video } from 'expo-av';

const placeholderImage = require('../../assets/images/thumb-placeholder.png');

const RecipeScreen: React.FC = () => {
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();
  const [fullRecipe, setFullRecipe] = useState<
    Database['public']['Tables']['recipes']['Row'] | undefined
  >();
  const [comments, setComments] = useState<Database['public']['Tables']['comments']['Row'][]>([]);
  const [savedCount, setSavedCount] = useState<number>(0);
  const recipe = useMemo(() => fullRecipe || params?.recipe || undefined, [params, fullRecipe]);

  useEffect(() => {
    if (recipe && recipe.id) {
      fetchFullRecipeData();
    }
  }, [params?.recipe]);

  const fetchFullRecipeData = async () => {
    supabase
      .from(`recipes`)
      .select(
        `*, saved(count), comments(id, comment, is_approved, profiles(id, first_name, last_name))`,
      )
      .eq('id', recipe.id)
      .limit(1)
      .then(({ data, error }) => {
        console.log('[Log] data', { data });
        if (error || !data || data.length <= 0) {
          setFullRecipe(undefined);
          setComments([]);
          setSavedCount(0);
        } else {
          setFullRecipe(data[0]);
          setComments(data[0].comments);
          setSavedCount(data[0].saved[0].count || 0);
        }
      });
  };

  const recipePhoto = useMemo(
    () =>
      recipe.hero_img
        ? supabase.storage.from('recipe_photos').getPublicUrl(`hero/${recipe.hero_img}.jpeg`).data
            .publicUrl
        : undefined,
    [recipe.hero_img],
  );

  const datePosted = useMemo(
    () =>
      recipe?.created_at
        ? format(new Date(recipe?.created_at), DateTimeFormats.DisplayDateShort)
        : 'unknown',
    [recipe.created_at],
  );

  const handleBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSave = useCallback(() => {
    goBack();
  }, [goBack]);

  if (!recipe) return <></>;
  return (
    <ScrollDiv flex={1} bg="light" contentContainerStyle={{ flexGrow: 1 }}>
      <Div bgImg={recipePhoto ? { uri: recipePhoto } : placeholderImage} h={330} w="100%">
        <Div row w="100%" alignItems="center" justifyContent="space-between" mt={top}>
          <Div mx={24}>
            <MagnusButton onPress={handleBack} bg="light" rounded="circle" p={5}>
              <Icon color="text" fontFamily="AntDesign" fontSize="3xl" name="arrowleft" />
            </MagnusButton>
          </Div>

          <Div mx={24}>
            <MagnusButton onPress={handleSave} bg="light" rounded="circle" p={8}>
              <Icon color="text" fontFamily="Octicons" fontSize="2xl" name="heart" />
            </MagnusButton>
          </Div>
        </Div>
      </Div>

      <Div flex={1} bg="light" roundedTop={30} mt={-30} shadow="sm" shadowColor="dark5">
        <Div w="30%" h={6} bg="light4" alignSelf="center" mt={10} rounded="circle" mb={24} />
        <Div mx={20} row justifyContent="space-between" alignItems="flex-start">
          <Div>
            <Heading2 fontWeight="800" flex={1}>
              {recipe?.title}
            </Heading2>

            <Small color="text4" mt={4}>
              Updated on {datePosted}
            </Small>
          </Div>

          <Div justifyContent="center" alignItems="center">
            <Div row alignItems="center" justifyContent="center">
              <Icon color="main" fontFamily="Octicons" fontSize="2xl" name="heart-fill" />
              {savedCount ? (
                <SmallHighlight color="main" ml={6}>
                  {savedCount}
                </SmallHighlight>
              ) : null}
            </Div>
          </Div>
        </Div>

        <Div mt={30} mx={20}>
          <Heading4 fontWeight="700">Description</Heading4>
          <Paragraph color="text4" mt={6}>
            {recipe?.description}
          </Paragraph>
        </Div>

        {recipe.video ? (
          <Div mt={14} px={20} pt={14} pb={24} bg="light" shadow="md" shadowColor="dark5">
            <Div flex={1}>
              <Video
                // ref={video}
                style={{
                  height: 200,
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 10,
                }}
                source={{
                  uri: recipe?.video,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </Div>
          </Div>
        ) : null}

        <Div mt={16} mx={20}>
          <Heading4 fontWeight="700">Ingredients</Heading4>
          <Div mt={4}>
            {recipe?.ingredients?.ingredients && fullRecipe?.ingredients?.ingredients.length > 0
              ? fullRecipe?.ingredients?.ingredients.map((ingredient, i) => {
                  return (
                    <Div
                      key={i}
                      borderBottomColor="light4"
                      borderBottomWidth={i == fullRecipe.ingredients.ingredients.length - 1 ? 0 : 1}
                      row
                      w="100%"
                      justifyContent="space-between"
                    >
                      <Paragraph py={8}>{ingredient.item}</Paragraph>
                      <Paragraph py={8}>{ingredient.quantity}</Paragraph>
                    </Div>
                  );
                })
              : null}
          </Div>
        </Div>

        <Div mt={30} mx={20}>
          <Heading4 fontWeight="700">Directions</Heading4>
          <Div mt={4}>
            {recipe?.instructions?.steps && fullRecipe?.instructions?.steps.length > 0
              ? fullRecipe?.instructions?.steps.map((step, i) => {
                  return (
                    <Div
                      key={i}
                      borderBottomColor="light4"
                      borderBottomWidth={i == fullRecipe.instructions.steps.length - 1 ? 0 : 1}
                      row
                      w="100%"
                      alignItems="flex-start"
                    >
                      <Div
                        rounded="circle"
                        bg="dark"
                        p={10}
                        position="relative"
                        justifyContent="center"
                        alignItems="center"
                        mt={14}
                        mr={10}
                      >
                        <Small position="absolute" lineHeight={0} p={0} color="light">
                          {i + 1}
                        </Small>
                      </Div>
                      <Paragraph flex={1} py={8}>
                        {step}
                      </Paragraph>
                    </Div>
                  );
                })
              : null}
          </Div>
        </Div>
        <Div h={50} />
      </Div>
    </ScrollDiv>
  );
};

export default memo(RecipeScreen);
