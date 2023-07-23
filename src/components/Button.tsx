import { LinearGradient } from 'expo-linear-gradient';
import React, { memo, PropsWithChildren, useMemo } from 'react';
import { Button as MagnusButton, ButtonProps, Div } from 'react-native-magnus';
import { theme } from '../theme/theme';

type Props = {
  wrapperFlex?: number | undefined;
} & PropsWithChildren &
  ButtonProps;

const Button: React.FC<Props> = ({ wrapperFlex, children, ...btnProps }) => {
  const colors = useMemo(() => {
    switch (btnProps.bg) {
      case 'transparent':
        return ['transparent', 'transparent'];
      case 'dark':
        return [theme.colors.dark3, theme.colors.dark2];
      case 'light':
        return [theme.colors.main20, theme.colors.light1];
      case 'main':
      default:
        return [theme.colors.main120, theme.colors.main100];
    }
  }, [btnProps.bg]);

  return (
    <MagnusButton
      mt={20}
      block
      rounded={18}
      row
      minH={45}
      {...btnProps}
      p={0}
      px={0}
      py={0}
      pt={0}
      pr={0}
      pb={0}
      pl={0}
      style={{ overflow: 'hidden' }}
    >
      <LinearGradient
        colors={colors}
        end={{ x: 1, y: 0 }}
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
      />
      <Div
        row
        flex={wrapperFlex || btnProps.flex}
        alignItems={btnProps.alignItems || 'center'}
        justifyContent={btnProps.justifyContent || 'center'}
        p={btnProps.p}
        px={btnProps.px}
        py={btnProps.py}
        pt={btnProps.pt}
        pr={btnProps.pr}
        pb={btnProps.pb}
        pl={btnProps.pl}
      >
        {children}
      </Div>
    </MagnusButton>
  );
};

export default memo(Button);
