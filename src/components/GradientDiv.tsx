import React, { memo, PropsWithChildren } from 'react';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { Div, DivProps } from 'react-native-magnus';

type Props = {
  colors?: LinearGradientProps['colors'];
  wrapperFlex?: number | undefined;
} & PropsWithChildren &
  DivProps;

const GradientDiv: React.FC<Props> = ({ wrapperFlex, colors, children, ...divProps }) => {
  return (
    <Div {...divProps} row p={0} px={0} py={0} pt={0} pr={0} pb={0} pl={0} overflow="hidden">
      <LinearGradient
        colors={colors}
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
      />
      <Div
        flex={wrapperFlex || divProps.flex}
        alignItems={divProps.alignItems}
        justifyContent={divProps.justifyContent}
        p={divProps.p}
        px={divProps.px}
        py={divProps.py}
        pt={divProps.pt}
        pr={divProps.pr}
        pb={divProps.pb}
        pl={divProps.pl}
      >
        {children}
      </Div>
    </Div>
  );
};

export default memo(GradientDiv);
