import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Tokens } from './constants/namespaces';
import { Database } from './types/supabase';

// Better put your these secret keys in .env file
export const supabase = createClient<Database>(
  '',
  '',
  {
    auth: {
      storage: AsyncStorage as any,
      storageKey: Tokens.SUPABASE_STORAGE,
      detectSessionInUrl: false, // Prevents Supabase from evaluating window.location.href, breaking mobile
    },
  },
);
