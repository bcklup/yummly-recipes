import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { Button as MagnusButton, Div, Image } from 'react-native-magnus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { routes } from '../../navigation/routes';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tokens } from '../../constants/namespaces';
import { Body, Heading1, Heading3, Heading4 } from '../../theme/Typography';
import { ImageBackground } from 'react-native';
import GradientDiv from '../../components/GradientDiv';
import { theme } from '../../theme/theme';
import { colorWithOpacity } from '../../utils/utilsCommon';
import Button from '../../components/Button';

const textLogo = require('../../../assets/logo-text.png');
const hero = require('../../../assets/images/welcome-hero.png');

const lastStep = 7;

const GetStarted = () => {
  const [step, setStep] = useState<number>(1);
  const { navigate } = useNavigation();
  const { top } = useSafeAreaInsets();

  const handleSkip = useCallback(async () => {
    try {
      await AsyncStorage.setItem(Tokens.DONE_FIRST_TIME_FLOW, 'true');
      navigate(routes.auth.login);
    } catch (e) {}
  }, [navigate]);

  const handleLogin = useCallback(async () => {
    try {
      await AsyncStorage.setItem(Tokens.DONE_FIRST_TIME_FLOW, 'true');
      navigate(routes.home.dashboard);
    } catch (e) {}
  }, [navigate]);

  return (
    <ImageBackground source={hero} style={{ flex: 1 }}>
      <GradientDiv
        flex={2}
        w="100%"
        colors={['transparent', colorWithOpacity(theme.colors.dark1, 95)]}
      >
        <Div justifyContent="center" alignItems="center" mt={top + 100}>
          <Image w={250} h={120} source={textLogo} shadow="xl" />
        </Div>
      </GradientDiv>

      <Div flex={1} pb={40} bg={colorWithOpacity(theme.colors.dark1, 95)} px={24}>
        <Div flex={1} alignItems="center">
          <Div flex={1} alignItems="center">
            <Heading1 color="main" textAlign="center">
              Pinoy Recipes
            </Heading1>
            <Heading1 color="light1">for you!</Heading1>
          </Div>

          <Div w="80%" alignItems="center">
            <Button onPress={handleLogin} bg="main" mt={0}>
              <Heading4 fontWeight="500" color="light1">
                LOGIN
              </Heading4>
            </Button>
          </Div>

          <Button bg="transparent" onPress={handleSkip}>
            <Heading4 color="light1">Skip</Heading4>
          </Button>
        </Div>
      </Div>
    </ImageBackground>
  );
};

export default GetStarted;
