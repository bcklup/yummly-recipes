import { useNavigation, useRoute } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Div, Icon, Button as MagnusButton, ScrollDiv } from 'react-native-magnus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ResizeMode, Video } from 'expo-av';
import { format } from 'date-fns';

import { supabase } from '../initSupabase';
import {
  Body,
  Heading1,
  Heading2,
  Heading4,
  Highlight,
  Paragraph,
  Small,
  SmallHighlight,
} from '../theme/Typography';
import { Database } from '../types/supabase';
import { DateTimeFormats } from '../utils/parsers';
import useMainStore from '../store/main';
import { globalSnackbarRef } from '../utils/globalSnackbar';
import { ActivityIndicator, RefreshControl } from 'react-native';
import CommentsSection from '../components/CommentsSection';
import { StatusBar } from 'expo-status-bar';

const placeholderImage = require('../../assets/images/thumb-placeholder.png');

const RecipeScreen: React.FC = () => {
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();
  const { session, setAuthModalVisible } = useMainStore();
  const [fullRecipe, setFullRecipe] = useState<
    Database['public']['Tables']['recipes']['Row'] | undefined
  >();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Database['public']['Tables']['comments']['Row'][]>([]);
  const [savedCount, setSavedCount] = useState<number>(0);
  const recipe = useMemo(() => fullRecipe || params?.recipe || undefined, [params, fullRecipe]);

  console.log('[Log] comments', { comments });

  useEffect(() => {
    if (recipe && recipe.id) {
      fetchFullRecipeData();
      fetchIsSaved();
    }
  }, [params?.recipe, isSaved]);

  const fetchFullRecipeData = async () => {
    setIsLoading(true);
    supabase
      .from(`recipes`)
      .select(`*, saved(count), comments(*, profiles(id, first_name, last_name))`)
      .eq('id', recipe.id)
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => {
        console.log('[Log] data', { data });
        if (error || !data) {
          setFullRecipe(undefined);
          setComments([]);
          setSavedCount(0);
        } else {
          setFullRecipe(data);
          setComments(data.comments);
          setSavedCount(data.saved[0].count || 0);
        }
        setIsLoading(false);
      });
  };

  const fetchIsSaved = async () => {
    if (session && recipe) {
      supabase
        .from('saved')
        .select()
        .eq('recipe_id', recipe.id)
        .eq('user_id', session?.user.id)
        .limit(1)
        .single()
        .then(({ error }) => {
          if (!error) {
            setIsSaved(true);
          } else {
            console.log('[Log] fetchIsSaved error', { error });
            setIsSaved(false);
          }
        });
    }
  };

  const recipePhoto = useMemo(
    () =>
      recipe.hero_img
        ? supabase.storage.from('recipe_photos').getPublicUrl(`hero/${recipe.hero_img}`).data
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

  const handleSave = useCallback(async () => {
    if (!session) {
      setAuthModalVisible(true);
    } else {
      if (isSaved) {
        supabase
          .from('saved')
          .delete()
          .eq('recipe_id', recipe.id)
          .eq('user_id', session.user.id)
          .then(({ error }) => {
            if (!error) {
              setIsSaved(false);
            } else {
              console.log('[Log] error', { error });
              globalSnackbarRef.current?.show('Error. Please try again later.');
            }
          });
      } else {
        supabase
          .from('saved')
          .insert({
            recipe_id: recipe.id,
            user_id: session.user.id,
          })
          .then(({ error }) => {
            if (!error) {
              setIsSaved(true);
            } else {
              globalSnackbarRef.current?.show('Error. Please try again later.');
            }
          });
      }
    }
  }, [session, isSaved]);

  if (!recipe) return <></>;
  return (
    <ScrollDiv
      flex={1}
      bg="light"
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl onRefresh={fetchFullRecipeData} refreshing={isLoading} />}
    >
      <StatusBar translucent={true} />
      <Div bgImg={recipePhoto ? { uri: recipePhoto } : placeholderImage} h={360} w="100%">
        <Div row w="100%" alignItems="center" justifyContent="space-between" mt={top + 10}>
          <Div mx={24}>
            <MagnusButton onPress={handleBack} bg="light" rounded="circle" p={6}>
              <Icon color="text" fontFamily="AntDesign" fontSize="4xl" name="arrowleft" />
            </MagnusButton>
          </Div>

          <Div mx={24}>
            <MagnusButton onPress={handleSave} bg="light" rounded="circle" p={8}>
              <Icon
                color={!isSaved || !session ? 'text' : 'main'}
                fontFamily="Octicons"
                fontSize="3xl"
                name={!isSaved || !session ? 'heart' : 'heart-fill'}
              />
            </MagnusButton>
          </Div>
        </Div>
      </Div>

      <Div flex={1} bg="light" roundedTop={30} mt={-30} shadow="sm" shadowColor="dark5">
        <Div w="30%" h={6} bg="light4" alignSelf="center" mt={10} rounded="circle" mb={24} />
        <Div mx={20} row justifyContent="space-between" alignItems="flex-start">
          <Div>
            <Heading1 fontWeight="800" flex={1}>
              {recipe?.title}
            </Heading1>

            <Paragraph color="text4" mt={4}>
              Updated on {datePosted}
            </Paragraph>
          </Div>

          <Div justifyContent="center" alignItems="center">
            <Div row alignItems="center" justifyContent="center">
              <Icon color="main" fontFamily="Octicons" fontSize="4xl" name="heart-fill" />
              {savedCount ? (
                <Highlight color="main" ml={6}>
                  {savedCount}
                </Highlight>
              ) : null}
            </Div>
          </Div>
        </Div>

        <Div mt={30} mx={20}>
          <Heading2 fontWeight="700">Description</Heading2>
          <Body color="text4" mt={6}>
            {recipe?.description}
          </Body>
        </Div>

        {recipe.video ? (
          <Div mt={14} px={20} pt={14} pb={24} bg="light" shadow="md" shadowColor="dark5">
            <Div flex={1} position="relative">
              {isVideoLoading ? (
                <Div position="absolute" top={90} alignSelf="center" zIndex={3}>
                  <ActivityIndicator />
                </Div>
              ) : null}
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
                onLoad={() => {
                  setIsVideoLoading(false);
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
          <Heading2 fontWeight="700">Ingredients</Heading2>
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
                      <Body py={8}>{ingredient.item}</Body>
                      <Body py={8}>{ingredient.quantity}</Body>
                    </Div>
                  );
                })
              : null}
          </Div>
        </Div>

        <Div mt={30} mx={20}>
          <Heading2 fontWeight="700">Directions</Heading2>
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
                        <SmallHighlight position="absolute" lineHeight={0} p={0} color="light">
                          {i + 1}
                        </SmallHighlight>
                      </Div>
                      <Body flex={1} py={8}>
                        {step}
                      </Body>
                    </Div>
                  );
                })
              : null}
          </Div>
        </Div>

        {fullRecipe && comments.length ? (
          <CommentsSection recipeId={recipe.id} comments={comments} refresh={fetchFullRecipeData} />
        ) : null}
        <Div h={50} />
      </Div>
    </ScrollDiv>
  );
};

export default memo(RecipeScreen);
