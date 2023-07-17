import React from 'react';

import { Div, DivProps, Icon, IconProps, Text, TextProps } from 'react-native-magnus';

import { theme } from './theme';

interface CustomTextProps extends TextProps {
  children: any;
}

interface BaseTextProps extends CustomTextProps {
  lineHeightMultiple: number;
}

const TextWithMultipliedLineHeight = ({
  children,
  fontSize,
  lineHeightMultiple,
  ...props
}: BaseTextProps) => {
  const lineHeight = React.useMemo(
    () => (theme.fontSize[fontSize] || fontSize) * lineHeightMultiple,
    [fontSize, lineHeightMultiple],
  );

  return (
    <Text color="text" fontSize={fontSize} letterSpacing={-0.1} lineHeight={lineHeight} {...props}>
      {children}
    </Text>
  );
};

export const BigMain = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="7xl"
      fontWeight="800"
      lineHeightMultiple={1.3}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const Heading1Heavy = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="4xl"
      fontWeight="800"
      lineHeightMultiple={1.3}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const Heading1 = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="4xl"
      fontWeight="600"
      lineHeightMultiple={1.3}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const Heading1Medium = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="4xl"
      fontWeight="500"
      lineHeightMultiple={1.3}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const Heading2 = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="2xl"
      fontWeight="600"
      lineHeightMultiple={1.3}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const Heading3 = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="xl"
      fontWeight="500"
      lineHeightMultiple={1.3}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const Heading4 = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="lg"
      fontWeight="400"
      lineHeightMultiple={1.3}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const BodyMedium = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="lg"
      fontWeight="500"
      lineHeightMultiple={1.5}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const Body = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="lg"
      fontWeight="400"
      lineHeightMultiple={1.5}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const BodyLight = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="lg"
      fontWeight="300"
      lineHeightMultiple={1.5}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const BodyHeavy = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="lg"
      fontWeight="800"
      lineHeightMultiple={1.5}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const Paragraph = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="md"
      fontWeight="400"
      lineHeightMultiple={1.5}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const ParagraphLight = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="md"
      fontWeight="300"
      lineHeightMultiple={1.5}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const Highlight = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="md"
      fontWeight="500"
      lineHeightMultiple={1.5}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const SmallHighlight = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="sm"
      fontWeight="800"
      lineHeightMultiple={1.5}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const Small = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="sm"
      fontWeight="400"
      lineHeightMultiple={1.5}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};
export const ExtraSmall = ({ children, ...props }: CustomTextProps) => {
  return (
    <TextWithMultipliedLineHeight
      fontSize="xs"
      fontWeight="400"
      lineHeightMultiple={1.5}
      {...props}
    >
      {children}
    </TextWithMultipliedLineHeight>
  );
};

interface TextWithIconProps extends CustomTextProps {
  leftIconProps: IconProps;
  containerProps?: DivProps;
}

export const TextWithIcon = ({
  children,
  containerProps = {},
  leftIconProps,
  ...props
}: TextWithIconProps) => {
  return (
    <Div alignItems="center" flexDir="row" {...containerProps}>
      <Icon {...leftIconProps} />
      <Text {...props}>{children}</Text>
    </Div>
  );
};
