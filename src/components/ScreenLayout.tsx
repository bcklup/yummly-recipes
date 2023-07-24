import { useNavigation } from '@react-navigation/native';
import React, { PropsWithChildren, useCallback } from 'react';
import { Pressable } from 'react-native';
import { Div, Icon, ScrollDiv } from 'react-native-magnus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Heading4 } from '../theme/Typography';
import { CleanHeader } from './CleanHeader';

type Props = {
  title: string;
  scrollable?: boolean;
} & PropsWithChildren;

// Used when screen only has back button and title on header
export const ScreenLayout: React.FC<Props> = ({ title, children, scrollable }) => {
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const handleBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const ContainerComponent = scrollable ? ScrollDiv : Div;

  return (
    <Div bg="light" flex={1}>
      <CleanHeader
        pt={top + 10}
        pb={10}
        title={title}
        leftItem={
          <Pressable onPress={handleBack}>
            <Icon color="text" fontFamily="AntDesign" fontSize="3xl" name="arrowleft" mt={top} />
          </Pressable>
        }
        bg="white"
      />
      <Div flex={1} alignSelf="stretch">
        <ContainerComponent flex={1} py={24}>
          <Div flex={1} px={24}>
            {children}
          </Div>
        </ContainerComponent>
      </Div>
    </Div>
  );
};
