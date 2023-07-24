import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ExpoSecureStoreAdapter } from '../initSupabase';

interface States {
  session: Session | null;
}

interface Actions {
  setSession: (param: Session | null) => void;
  clearSession: () => void;
}

const initialState: States = {
  session: null,
};

const AsyncStorageAdapter = {
  getItem: (key: string) => {
    return AsyncStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    AsyncStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    AsyncStorage.removeItem(key);
  },
};

export default create<States & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setSession: (param) => set(() => ({ session: param })),
      clearSession: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'auth-store', // unique name
      storage: createJSONStorage(() => ExpoSecureStoreAdapter),
    },
  ),
);
