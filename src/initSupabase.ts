import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Tokens } from './constants/namespaces';

// Better put your these secret keys in .env file
export const supabase = createClient(
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
