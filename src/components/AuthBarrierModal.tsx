import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { routes } from '../navigation/routes';
import { Body, BodyMedium, Heading1, Heading2, Heading3 } from '../theme/Typography';
import Button from './Button';
import Modal from './Modal';
import { Image } from 'react-native-magnus';

const textLogo = require('../../assets/logo-text.png');

type Props = {
  isVisible: boolean;
  handleClose: () => void;
};

const AuthBarrierModal: React.FC<Props> = ({ isVisible, handleClose }) => {
  const navigation = useNavigation();

  const handleLogin = useCallback(async () => {
    handleClose();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routes.auth.getStarted }, { name: routes.auth.login }],
      }),
    );
  }, []);

  const handleSignUp = useCallback(async () => {
    handleClose();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routes.auth.getStarted }, { name: routes.auth.registration }],
      }),
    );
  }, []);

  return (
    <Modal
      isVisible={isVisible}
      onClose={handleClose}
      py={20}
      pb={40}
      px={20}
      backdropDismissable
      roundedTop={30}
      alignItems="center"
    >
      <Image w={150} h={40} source={textLogo} />

      <Heading1 mt={30} fontWeight="800" textAlign="center">
        JUST A SECOND...
      </Heading1>

      <Body color="text4" mt={14}>
        You need to Login or Sign Up to use that feature. It only takes a few minutes to unlock the
        full features of Yummly Recipes!
      </Body>

      <Button block bg="main" mt={24} onPress={handleLogin}>
        <Heading3 fontWeight="500" color="light1">
          LOGIN
        </Heading3>
      </Button>
      <Button block bg="dark" mt={10} onPress={handleSignUp}>
        <Heading3 fontWeight="500" color="light1">
          SIGN UP
        </Heading3>
      </Button>
      <Button bg="transparent" onPress={handleClose}>
        <Heading2 color="text" fontWeight="500">
          or Continue as Guest
        </Heading2>
      </Button>
    </Modal>
  );
};

export default memo(AuthBarrierModal);
