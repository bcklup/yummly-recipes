import { useEffect, useState } from 'react';
import { supabase } from '../initSupabase';
import { Database } from '../types/supabase';

export enum FeaturedRecipes {
  LATEST = 'latest',
  TRENDING = 'trending',
  BREAKFAST = 'breakfast',
}

export const useFeaturedRecipes = (type: FeaturedRecipes) => {
  const [recipes, setRecipes] = useState<
    | Database['public']['Tables']['recipes']['Row'][]
    | Database['public']['Views']['trending_recipes']['Row'][]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    switch (type) {
      case FeaturedRecipes.LATEST: {
        fetchLatestData();
        break;
      }
      case FeaturedRecipes.TRENDING: {
        fetchTrendingData();
        break;
      }
      case FeaturedRecipes.BREAKFAST: {
        fetchBreakfastData();
      }
    }
  }, [type]);

  const fetchLatestData = async () => {
    setIsLoading(true);
    supabase
      .from('recipes')
      .select()
      .order('created_at')
      .limit(5)
      .then(({ data, error }) => {
        if (error || data.length <= 0) {
          setRecipes([]);
        } else {
          setRecipes(data);
        }
        setIsLoading(false);
      });
  };

  const fetchTrendingData = async () => {
    setIsLoading(true);
    supabase
      .from('trending_recipes')
      .select()
      .limit(5)
      .then(({ data, error }) => {
        if (error || data.length <= 0) {
          setRecipes([]);
        } else {
          setRecipes(data);
        }
        setIsLoading(false);
      });
  };

  const fetchBreakfastData = async () => {
    setIsLoading(true);
    supabase
      .from('recipes')
      .select()
      .in('id', ['4024b37a-cc8a-492f-9bb8-350cd620a045'])
      .order('created_at')
      .limit(5)
      .then(({ data, error }) => {
        if (error || data.length <= 0) {
          setRecipes([]);
        } else {
          setRecipes(data);
        }
        setIsLoading(false);
      });
  };

  return {
    recipes,
    isLoading,
  };
};
