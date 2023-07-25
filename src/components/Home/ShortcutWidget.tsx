import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { Button, Div } from 'react-native-magnus';
import { routes } from '../../navigation/routes';
import { Heading2, Heading3 } from '../../theme/Typography';

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
      <Heading2 fontWeight="700">Your Lists</Heading2>
      <Button py={6} mt={6} bg="transparent" onPress={goToSaved}>
        <Heading3 color="main">Saved Recipes</Heading3>
      </Button>
      <Button py={6} bg="transparent" onPress={goToRecents}>
        <Heading3 color="main">Recently Viewed</Heading3>
      </Button>
    </Div>
  );
};

export default memo(ShortcutWidget);
