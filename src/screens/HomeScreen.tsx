import React, { memo } from 'react';
import { Div } from 'react-native-magnus';
import { Heading1Heavy } from '../theme/Typography';

type Props = {};

const HomeScreen: React.FC<Props> = () => {
  return (
    <Div>
      <Heading1Heavy>Welcome!</Heading1Heavy>
    </Div>
  );
};

export default memo(HomeScreen);
