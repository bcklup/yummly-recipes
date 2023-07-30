import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ExpoSecureStoreAdapter } from '../initSupabase';
import { Database } from '../types/supabase';

interface States {
  session: Session | null;
  profile: Database['public']['Tables']['profiles']['Row'] | null;
  refresh: boolean;
  authModalVisible: boolean;
}

interface Actions {
  setSession: (param: Session | null) => void;
  setProfile: (param: States['profile']) => void;
  setRefresh: (param: boolean) => void;
  clearSession: () => void;
  setAuthModalVisible: (param: boolean) => void;
}

const initialState: States = {
  session: null,
  profile: null,
  refresh: false,
  authModalVisible: false,
};

export default create<States & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setSession: (param) => set((state) => ({ ...state, session: param })),
      setProfile: (param) => set((state) => ({ ...state, profile: param })),
      setRefresh: (param) => set((state) => ({ ...state, refresh: param })),
      setAuthModalVisible: (param) => set((state) => ({ ...state, authModalVisible: param })),
      clearSession: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'auth-store', // unique name
      storage: createJSONStorage(() => ExpoSecureStoreAdapter),
    },
  ),
);
