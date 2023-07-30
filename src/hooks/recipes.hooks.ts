import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../initSupabase';
import { Database } from '../types/supabase';
import useMainStore from '../store/main';

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

  const refetch = () => {
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
  };

  const fetchLatestData = async () => {
    setIsLoading(true);
    supabase
      .from('recipes')
      .select('*, saved(count)')
      .order('created_at', { ascending: false })
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
      .select('*, saved(count)')
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
    refetch,
  };
};

export const useRecipeSearch = (searchTerm?: string) => {
  const [recipes, setRecipes] = useState<Database['public']['Tables']['recipes']['Row'][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (searchTerm === '' || (searchTerm && searchTerm.length >= 3)) fetchSearchData();
  }, [searchTerm]);

  const fetchSearchData = async () => {
    setIsLoading(true);
    supabase
      .from('trending_recipes')
      .select()
      .or(`or(title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%)`)
      .order('saved_count')
      .limit(10)
      .then(({ data, error }) => {
        if (error || data.length <= 0) {
          setRecipes([]);
        } else {
          setRecipes(data);
        }
        setIsLoading(false);
      });
  };

  return { recipes, isLoading };
};

export const useSavedRecipes = () => {
  const { session } = useMainStore();
  const [recipes, setRecipes] = useState<Database['public']['Tables']['recipes']['Row'][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRecentsData();
  }, []);

  const fetchRecentsData = async () => {
    setIsLoading(true);
    supabase
      .from('saved')
      .select('*, recipes(*, saved(count))')
      .eq('user_id', session?.user.id)
      .order('created_at')
      .limit(15)
      .then(({ data, error }) => {
        if (error || data.length <= 0) {
          setRecipes([]);
        } else {
          setRecipes(
            data.map((ret) => ({
              ...(ret.recipes as Database['public']['Tables']['recipes']['Row']),
            })),
          );
        }
        setIsLoading(false);
      });
  };

  return { recipes, isLoading };
};

export const useRecentRecipes = () => {
  const { session } = useMainStore();
  const [recipes, setRecipes] = useState<Database['public']['Tables']['recipes']['Row'][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRecentsData();
  }, []);

  const fetchRecentsData = async () => {
    setIsLoading(true);
    supabase
      .from('history')
      .select('*, recipes(*)')
      .eq('user_id', session?.user.id)
      .order('created_at', { ascending: false })
      .limit(15)
      .then(({ data, error }) => {
        if (error || data.length <= 0) {
          setRecipes([]);
        } else {
          setRecipes(
            data.map((ret) => ({
              ...(ret.recipes as Database['public']['Tables']['recipes']['Row']),
            })),
          );
        }
        setIsLoading(false);
      });
  };

  return { recipes, isLoading };
};
