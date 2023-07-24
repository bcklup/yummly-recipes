import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Tokens } from './constants/namespaces';
import { Database } from './types/supabase';

export const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

// Better put your these secret keys in .env file
export const supabase = createClient<Database>(
  '',
  '',
  {
    auth: {
      storage: ExpoSecureStoreAdapter as any,
      storageKey: 'supabase-store',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // Prevents Supabase from evaluating window.location.href, breaking mobile
    },
  },
);
