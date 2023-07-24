import React from 'react';
import { Div, DivProps, Image } from 'react-native-magnus';
import { Heading1Medium } from '../theme/Typography';

type Props = {
  title?: string;
  leftItem?: JSX.Element;
  rightItem?: JSX.Element;
  centerItem?: JSX.Element;
  titleColor?: string;
  showLogo?: boolean;
} & DivProps;

export const CleanHeader: React.FC<Props> = (props) => {
  const { title, leftItem, rightItem, centerItem, showLogo, titleColor, ...divProps } = props;

  return (
    <Div row alignSelf="stretch" alignItems="center" justifyContent="center" {...divProps}>
      {leftItem ? (
        <Div position="absolute" left={0} ml={divProps.mx !== undefined ? divProps.mx : 24}>
          {leftItem}
        </Div>
      ) : null}
      {centerItem ? (
        <Div justifyContent="center" alignItems="center">
          {centerItem}
        </Div>
      ) : (
        <Heading1Medium textAlign="center" color={titleColor || 'text'}>
          {title}
        </Heading1Medium>
      )}
      {rightItem ? (
        <Div position="absolute" right={0} mr={divProps.mx !== undefined ? divProps.mx : 24}>
          {rightItem}
        </Div>
      ) : null}
    </Div>
  );
};
