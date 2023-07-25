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
import HomeScreen from '../screens/HomeScreen';
import { Icon, IconProps } from 'react-native-magnus';
import SavedRecipesScreen from '../screens/SavedRecipesScreen';
import AccountScreen from '../screens/AccountScreen';
import { theme } from '../theme/theme';
import RecipeScreen from '../screens/RecipeScreen';
import SearchRecipeScreen from '../screens/SearchRecipeScreen';
import RecentRecipesScreen from '../screens/RecentRecipesScreen';

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

const HomeStack = createNativeStackNavigator();

const HomeNavigations = () => (
  <HomeStack.Navigator
    initialRouteName={routes.home.dashboard}
    screenOptions={{ headerShown: false }}
  >
    <HomeStack.Screen component={HomeScreen} name={routes.home.dashboard} />
  </HomeStack.Navigator>
);

const AccountStack = createNativeStackNavigator();

const AccountNavigations = () => (
  <AccountStack.Navigator
    initialRouteName={routes.account.account}
    screenOptions={{ headerShown: false }}
  >
    <AccountStack.Screen component={AccountScreen} name={routes.account.account} />
    <AccountStack.Screen component={RecentRecipesScreen} name={routes.account.recent} />
  </AccountStack.Navigator>
);

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={routes.tabs.home}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors?.main100,
        tabBarInactiveTintColor: theme.colors?.dark4,
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
        },
      }}
    >
      <BottomTab.Screen
        component={HomeNavigations}
        name={routes.tabs.home}
        options={() => ({
          title: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon color={color} fontFamily="Octicons" name="home" />,
        })}
      />

      <BottomTab.Screen
        component={SearchRecipeScreen}
        name={routes.tabs.search}
        options={() => ({
          title: 'Search',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} fontFamily="Ionicons" name="search" fontSize="4xl" />
          ),
        })}
      />

      <BottomTab.Screen
        component={SavedRecipesScreen}
        name={routes.tabs.saved}
        options={() => ({
          title: 'Saved',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} fontFamily="Octicons" name="heart-fill" />
          ),
        })}
      />

      <BottomTab.Screen
        component={AccountNavigations}
        name={routes.tabs.account}
        options={() => ({
          title: 'Account',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} fontFamily="FontAwesome5" name="user-alt" />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
};

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName={routes.splash} screenOptions={{ headerShown: false }}>
      <RootStack.Screen component={SplashScreen} name={routes.splash} />
      <RootStack.Screen component={GetStarted} name={routes.auth.getStarted} />
      <RootStack.Screen component={RegistrationScreen} name={routes.auth.registration} />
      <RootStack.Screen component={LoginScreen} name={routes.auth.login} />
      <RootStack.Screen component={RecipeScreen} name={routes.home.recipeDetails} />
      <RootStack.Screen name={routes.root} options={{ headerShown: false }}>
        {(props) => <BottomTabNavigator {...props} />}
      </RootStack.Screen>
    </RootStack.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationWithAnalytics theme={defaultTheme} onUnhandledAction={onUnhandledAction}>
      <RootNavigator />
    </NavigationWithAnalytics>
  );
};

const TabBarIcon = (props: IconProps) => <Icon fontSize="3xl" mb={-5} {...props} />;
