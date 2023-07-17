import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { Button as MagnusButton, Div, Image, Button } from 'react-native-magnus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { routes } from '../../navigation/routes';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Img1 from '../../../assets/images/getstarted/intro-1.svg';
import Img2 from '../../../assets/images/getstarted/intro-2.svg';
import Img3 from '../../../assets/images/getstarted/intro-3.svg';
import Img4 from '../../../assets/images/getstarted/intro-4.svg';
import Img5 from '../../../assets/images/getstarted/intro-5.svg';
import Img6 from '../../../assets/images/getstarted/intro-6.svg';
import Img7 from '../../../assets/images/getstarted/intro-7.svg';
import { Tokens } from '../../constants/namespaces';
import { Body, Heading1, Heading3, Heading4 } from '../../theme/Typography';

const logo = require('../../../assets/icon.png');

const lastStep = 7;

const GetStarted = () => {
  const [step, setStep] = useState<number>(1);
  const { navigate } = useNavigation();
  const { top } = useSafeAreaInsets();

  const finish = useCallback(async () => {
    try {
      await AsyncStorage.setItem(Tokens.DONE_FIRST_TIME_FLOW, 'true');
      navigate(routes.auth.login);
    } catch (e) {}
  }, [navigate]);

  const onNext = useCallback(() => {
    if (step >= lastStep) {
      finish();
      return;
    }
    setStep(step + 1);
  }, [finish, step]);

  const onPrev = useCallback(() => {
    if (step <= 1) return;
    setStep(step - 1);
  }, [step]);

  const Title = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <Heading1 textAlign="center">
            <Heading1 color="main">Yummly Recipes</Heading1>
            {'\n'}Pinoy Recipes for you!
          </Heading1>
        );
      case 2:
        return <Heading1 textAlign="center">Sample 1</Heading1>;
      case 3:
        return (
          <Heading1 textAlign="center">
            Sample
            <Heading1 color="main">2</Heading1>
          </Heading1>
        );
      case 4:
        return (
          <Heading1 textAlign="center">
            <Heading1 color="main">Sample</Heading1> 3
          </Heading1>
        );
      case 5:
        return <Heading1 textAlign="center">Sample</Heading1>;
      case 6:
        return <Heading1 textAlign="center">Sample w</Heading1>;
      case 7:
        return <Heading1 textAlign="center">Sample 3</Heading1>;
    }
  }, [step]);

  const Hero = useMemo(() => {
    switch (step) {
      case 1:
        return <Img1 width="90%" />;
      case 2:
        return <Img2 width="90%" />;
      case 3:
        return <Img3 width="90%" />;
      case 4:
        return <Img4 width="90%" />;
      case 5:
        return <Img5 width="90%" />;
      case 6:
        return <Img6 width="90%" />;
      case 7:
        return <Img7 width="90%" />;
    }
  }, [step]);

  const Subtext = useMemo(() => {
    switch (step) {
      case 1:
        return '';
      case 2:
        return '';
      case 3:
        return '';
      case 4:
        return '';
      case 5:
        return '';
      case 6:
        return '';
      case 7:
        return '';
    }
  }, [step]);

  return (
    <Div flex={1} mb={24} mt={top + 20} bg="light1" mx={24}>
      <Div row justifyContent="space-between" alignItems="center">
        <Image w={40} h={40} source={logo} />
        <MagnusButton
          rounded={16}
          bg="transparent"
          py={4}
          px={14}
          borderColor="main"
          borderWidth={1}
          onPress={finish}
        >
          <Body color="main">Skip</Body>
        </MagnusButton>
      </Div>
      <Div flex={1} justifyContent="space-around" alignItems="center">
        {Title}
        {Hero}
        <Div>
          <Heading1 textAlign="center">{step === 1 ? 'Introduction' : `Step ${step - 1}`}</Heading1>
          <Heading4 color="text3" textAlign="center" mt={8}>
            {Subtext}
          </Heading4>
        </Div>
        <Button alignSelf="center" rounded={3} onPress={onNext}>
          <Heading4 fontWeight="500" color="light1">
            {step === 7 ? 'Complete' : 'Continue'}
          </Heading4>
        </Button>
      </Div>
    </Div>
  );
};

export default GetStarted;
