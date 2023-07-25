import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Div, Image } from 'react-native-magnus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { routes } from '../../navigation/routes';

import { ImageBackground } from 'react-native';
import Button from '../../components/Button';
import GradientDiv from '../../components/GradientDiv';
import { Heading4 } from '../../theme/Typography';
import { theme } from '../../theme/theme';
import { colorWithOpacity } from '../../utils/utilsCommon';

const textLogo = require('../../../assets/logo-text.png');
const hero = require('../../../assets/images/welcome-hero.png');
const imageHeading = require('../../../assets/images/login-heading.png');

const GetStarted = () => {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();

  const handleSkip = useCallback(async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routes.root }],
      }),
    );
  }, []);

  const handleLogin = useCallback(async () => {
    navigation.navigate(routes.auth.login);
  }, []);

  const handleSignUp = useCallback(async () => {
    navigation.navigate(routes.auth.registration);
  }, []);

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

            <Div w="90%" alignItems="center">
              <Button onPress={handleLogin} bg="main" mt={0}>
                <Heading4 fontWeight="500" color="light1">
                  LOGIN
                </Heading4>
              </Button>
              <Button onPress={handleSignUp} bg="dark" mt={10}>
                <Heading4 fontWeight="500" color="light1">
                  SIGN UP
                </Heading4>
              </Button>
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
    </Div>
  );
};

export default GetStarted;
