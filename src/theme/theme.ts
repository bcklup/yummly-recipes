import { ThemeType } from 'react-native-magnus';

export const theme: ThemeType = {
  colors: {
    main: 'main100',
    main20: '##fcb588',
    main80: '##ffa166',
    main100: '#FF914D',
    main120: '#f57b2f',
    main140: '#ff7724',

    secondary: 'secondary100',
    secondary100: '#201E1E',
    secondary80: '#3d3028',

    text: 'text1',
    text1: '#201E1E',
    text2: '#272727',
    text3: '#525252',
    text4: '#746F6F',
    text5: '#AAAAAA',

    dark: 'dark1',
    dark1: '#000000',
    dark2: '#151515',
    dark3: '#666666',
    dark4: '#999999',
    dark5: '#CFCFCF',

    light: 'light1',
    light1: '#ffffff',
    light2: '#F6F6F6',
    light3: '#F2F2F2',
    light4: '#DFDFDF',

    gray400: '#EFEFEF',

    bgLight1: '#f4f0e8',

    highlightBlue: 'highlightBlue100',
    highlightBlue100: '#0063f7',
    highlightBlue90: '#1271ff',
    highlightBlue80: '#2c80ff',
    highlightBlue70: '#4690ff',
    highlightBlue60: '#61a0fe',
    highlightBlue50: '#7bb0ff',
    highlightBlue40: '#95bfff',
    highlightBlue30: '#b0cfff',
    highlightBlue20: '#cadfff',
    highlightBlue10: '#e4effe',

    highlightPurple: 'highlightPurple100',
    highlightPurple100: '#c144e0',
    highlightPurple50: '#e0a1ef',
    highlightPurple20: '#f2d9f8',

    highlightRed: '#ff5c5c',

    highlightOrange: 'highlightOrange100',
    highlightOrange100: '#ebbb3f',
    highlightOrange80: '#eec865',
    highlightOrange60: '#f3d68b',
    highlightOrange40: '#f7e3b2',
    highlightOrange20: '#faf1d8',

    lightBlue: 'lightBlue100',
    lightBlue100: '#56aefe',
    lightBlue90: '#66b6fe',
    lightBlue80: '#77befe',
    lightBlue70: '#88c6fe',
    lightBlue60: '#99cefe',
    lightBlue50: '#aad6fe',
    lightBlue40: '#bbdefe',
    lightBlue30: '#cce6fe',
    lightBlue20: '#ddeefe',
    lightBlue10: '#eef6fe',

    middleBlue80: '#7ac9ea',
    middleBlue10: '#ecf6fa',

    errorRed: '#ff5c5c',

    success: 'success100',
    success100: '#4ca86c',
  },

  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 22,
    '4xl': 24,
    '5xl': 27,
    '6xl': 32,
    '7xl': 36,
    '8xl': 40,
  },

  shadow: {
    '3xl': {
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.8,
      shadowRadius: 14,

      elevation: 25,
    },
    equal: {
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: 0.9,
      shadowRadius: 10,
      elevation: 20,
    },
    verylight: {
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: 0.9,
      shadowRadius: 3,
      elevation: 5,
    },
  },
};

export const PAGE_SIDE_PADDING = 15;
