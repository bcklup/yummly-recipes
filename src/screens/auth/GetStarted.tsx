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
const imageHeading = require('../../../assets/images/login-heading.png');

const GetStarted = () => {
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
    <Div style={{ flex: 1 }}>
      <ImageBackground source={hero} resizeMode="cover" style={{ flex: 2, width: '100%' }}>
        <GradientDiv
          flex={2}
          w="100%"
          colors={[
            'transparent',
            colorWithOpacity(theme.colors.bgLight1, 10),
            colorWithOpacity(theme.colors.bgLight1, 95),
          ]}
        >
          <Div justifyContent="center" alignItems="center" mt={top + 10}>
            <Image w={200} h={60} source={textLogo} />
          </Div>
        </GradientDiv>
      </ImageBackground>

      <Div flex={1.3} pb={40} bg={colorWithOpacity(theme.colors.bgLight1, 95)} px={24}>
        <Div flex={1} position="relative">
          <Div position="absolute" top={-150} alignItems="center">
            <Image w={340} h={300} resizeMode="contain" source={imageHeading} />

            <Div w="80%" alignItems="center">
              <Button onPress={handleLogin} bg="main" mt={0}>
                <Heading4 fontWeight="500" color="light1">
                  LOGIN
                </Heading4>
              </Button>
            </Div>
            <Div w="80%" alignItems="center">
              <Button onPress={handleLogin} bg="dark" mt={10}>
                <Heading4 fontWeight="500" color="light1">
                  SIGN UP
                </Heading4>
              </Button>
            </Div>

            <Button bg="transparent" onPress={handleSkip}>
              <Heading4 color="text" fontWeight="500">
                Or Start to
                <Heading4 color="main" fontWeight="500">
                  {' '}
                  Search Now
                </Heading4>
              </Heading4>
            </Button>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default GetStarted;
