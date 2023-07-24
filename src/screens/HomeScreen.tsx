import React, { memo, useCallback } from 'react';
import { Div } from 'react-native-magnus';

import useMainStore from '../store/main';
import { Heading1Heavy, Heading4 } from '../theme/Typography';
import Button from '../components/Button';
import { supabase } from '../initSupabase';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { routes } from '../navigation/routes';

const HomeScreen: React.FC = () => {
  const clearSession = useMainStore((state) => state.clearSession);
  const navigation = useNavigation();

  const logout = useCallback(() => {
    supabase.auth.signOut().then(() => {
      clearSession();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routes.auth.getStarted }],
        }),
      );
    });
  }, []);

  return (
    <Div>
      <Heading1Heavy>Welcome!</Heading1Heavy>
      <Button block onPress={logout}>
        <Heading4>Log Out</Heading4>
      </Button>
    </Div>
  );
};

export default memo(HomeScreen);
