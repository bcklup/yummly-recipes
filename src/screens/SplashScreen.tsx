import { ImageBackground } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import React, { useEffect } from 'react';
import { Div } from 'react-native-magnus';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useUserRequests } from '../hooks/user-hooks';
import { routes } from '../navigation/routes';
import { Tokens } from '../constants/namespaces';

const splash = require('../../assets/splash.png');

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  // const { doLoginNavigations } = useUserRequests();

  const startup = async () => {
    try {
      const fetchRes = await Updates.fetchUpdateAsync();
      if (fetchRes && fetchRes.isNew) {
        await Updates.reloadAsync();
      } else {
        throw new Error();
      }
    } catch {
      navigation.dispatch(StackActions.replace(routes.auth.getStarted));
      // const authData = await getAuth();
      // if (authData) {
      //   doLoginNavigations();
      // } else {
      //   doUnauthenticated();
      // }
    }
  };

  const doUnauthenticated = async () => {
    // try {
    //   const res = await AsyncStorage.getItem(Tokens.DONE_FIRST_TIME_FLOW);
    //   if (res && res === 'true') {
    //     navigation.navigate(routes.auth.login);
    //   } else {
    //     navigation.navigate(routes.auth.getStarted);
    //   }
    // } catch (e) {
    //   navigation.navigate(routes.auth.getStarted);
    // }
  };

  useEffect(() => {
    startup();
  }, []);

  return <ImageBackground source={splash} style={{ flex: 1 }}></ImageBackground>;
};
