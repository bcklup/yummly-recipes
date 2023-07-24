import { Alert, Linking } from 'react-native';

// returns 2 digit hex for opacity value (30% -> '4D')
const percentToHex = (p: number): string => {
  const intValue = Math.round((p / 100) * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
};

export const colorWithOpacity = (color: string, opacity: number) => {
  try {
    return `${color}${percentToHex(opacity)}`;
  } catch (e) {
    return '#FFFFFF';
  }
};

export const openLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Error', 'Something went wrong while opening this link.');
  }
};
