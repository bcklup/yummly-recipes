import {
  DefaultTheme,
  NavigationAction,
  NavigationContainer,
  NavigationContainerProps,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';

import { routes } from './routes';
import GetStarted from '../screens/auth/GetStarted';
import { SplashScreen } from '../screens/SplashScreen';
import { RegistrationScreen } from '../screens/auth/RegistrationScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';

// import { RegistrationScreen } from '../screens/auth/RegistrationScreen';

const NavigationWithAnalytics: React.FC<NavigationContainerProps> = (props) => {
  return <NavigationContainer {...props}>{props.children}</NavigationContainer>;
};

const defaultTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

const onUnhandledAction = ({ payload, source, type }: NavigationAction) => {
  if (type === 'RESET') {
    console.log(`[ROUTER] reset-error: ${source}`, { ...payload });
  } else {
    console.log(`[ROUTER] route-error NOT FOUND:'${payload?.name}'`, { params: payload?.params });
  }
};

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName={routes.splash} screenOptions={{ headerShown: false }}>
      <MainStack.Screen component={SplashScreen} name={routes.splash} />
      <MainStack.Screen component={GetStarted} name={routes.auth.getStarted} />
      <MainStack.Screen component={RegistrationScreen} name={routes.auth.registration} />
      <MainStack.Screen component={LoginScreen} name={routes.auth.login} />
    </MainStack.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationWithAnalytics theme={defaultTheme} onUnhandledAction={onUnhandledAction}>
      <MainNavigator />
    </NavigationWithAnalytics>
  );
};
