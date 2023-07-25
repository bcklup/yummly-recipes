import { ImageBackground } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import React, { useEffect } from 'react';
import { Div } from 'react-native-magnus';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useUserRequests } from '../hooks/user-hooks';
import { routes } from '../navigation/routes';
import { Tokens } from '../constants/namespaces';
import useMainStore from '../store/main';
import { supabase } from '../initSupabase';

const splash = require('../../assets/splash.png');

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const { setSession, setProfile, clearSession } = useMainStore();

  const startup = async () => {
    try {
      const fetchRes = await Updates.fetchUpdateAsync();
      if (fetchRes && fetchRes.isNew) {
        await Updates.reloadAsync();
      } else {
        throw new Error();
      }
    } catch {
      supabase.auth
        .getSession()
        .then(async ({ data: { session } }) => {
          if (session) {
            setSession(session);

            const { data: profileData, error } = await supabase
              .from('profiles')
              .select()
              .eq('user_id', session.user.id);

            setProfile(!error && profileData ? profileData[0] : null);

            navigation.dispatch(StackActions.replace(routes.home.dashboard));
          } else throw new Error('Session is null');
        })
        .catch(() => {
          clearSession();
          navigation.dispatch(StackActions.replace(routes.auth.getStarted));
        });
    }
  };

  useEffect(() => {
    startup();
  }, []);

  return <ImageBackground source={splash} style={{ flex: 1 }}></ImageBackground>;
};
