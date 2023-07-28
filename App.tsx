import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { Snackbar, ThemeProvider } from 'react-native-magnus';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from './src/navigation/Navigation';
import { theme } from './src/theme/theme';
import { globalSnackbarRef } from './src/utils/globalSnackbar';

export default function App() {
  LogBox.ignoreAllLogs(); // TODO:L Temporary
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#FFFFFF" style="dark" />
        <Navigation />
        <Snackbar
          ref={globalSnackbarRef}
          w="80%"
          rounded="2xl"
          opacity={0.9}
          minH={50}
          bg="highlightRed"
          color="light1"
          alignItems="center"
        />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
