import React, { memo, useCallback } from 'react';
import { Button, Div } from 'react-native-magnus';
import { Heading3, Heading4 } from '../../theme/Typography';
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import { routes } from '../../navigation/routes';

type Props = {};

const ShortcutWidget: React.FC<Props> = () => {
  const navigation = useNavigation();

  const goToSaved = useCallback(() => {
    navigation.navigate(routes.tabs.saved);
  }, []);

  const goToRecents = useCallback(() => {
    navigation.navigate(routes.tabs.account, routes.account.recent);
  }, []);

  return (
    <Div mt={28} w="100%">
      <Heading3 fontWeight="600">Your Lists</Heading3>
      <Button py={6} mt={6} bg="transparent" onPress={goToSaved}>
        <Heading4 color="main">Saved Recipes</Heading4>
      </Button>
      <Button py={6} bg="transparent" onPress={goToRecents}>
        <Heading4 color="main">Recently Viewed</Heading4>
      </Button>
    </Div>
  );
};

export default memo(ShortcutWidget);
