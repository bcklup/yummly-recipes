import React, { memo, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { debounce } from 'lodash';
import { Div, Icon, Input, ScrollDiv } from 'react-native-magnus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecipeSearch } from '../hooks/recipes.hooks';
import { Body } from '../theme/Typography';
import HorizontalRecipeCard from '../components/HorizontalRecipeCard';

const SearchRecipeScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { recipes, isLoading } = useRecipeSearch(searchTerm);

  console.log('[Log] recipes, isLoading', { recipes, isLoading });

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
            Your search returned no results.{'\n'}Try using other terms.
          </Body>
        </Div>
      );
    }

    return (
      <ScrollDiv flex={1} bg="light2" contentContainerStyle={{ paddingVertical: 10 }}>
        {recipes.map((recipe, i) => (
          <HorizontalRecipeCard recipe={recipe} key={i} />
        ))}
      </ScrollDiv>
    );
  }, [recipes, isLoading]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const handleChange = (e: string) => {
    if (searchTerm === '' || (searchTerm && searchTerm?.length >= 3)) {
      setSearchTerm(e);
    }
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 500);
  }, []);

  return (
    <ScrollDiv
      flex={1}
      scrollEnabled={false}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Div mt={top + 20} flex={1}>
        <Div bg="light" px={20}>
          <Input
            placeholder="Search recipes"
            w="100%"
            fontSize="lg"
            fontWeight="normal"
            bg="light2"
            rounded="circle"
            mb={14}
            autoCapitalize="none"
            onChangeText={debouncedResults}
            prefix={
              <Icon fontSize="2xl" name="search" color="text" fontFamily="Ionicons" mr={10} />
            }
          />
        </Div>
        {Content}
      </Div>
    </ScrollDiv>
  );
};

export default memo(SearchRecipeScreen);
