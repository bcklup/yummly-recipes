import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { Snackbar, ThemeProvider } from 'react-native-magnus';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from './src/navigation/Navigation';
import { theme } from './src/theme/theme';
import { globalSnackbarRef } from './src/utils/globalSnackbar';

export default function App() {
  LogBox.ignoreAllLogs(); // TODO:L Temporary

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: 3,
        refetchInterval: 10000,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar backgroundColor="#FFFFFF" style="dark" />
          <Navigation />
          <Snackbar
            ref={globalSnackbarRef}
            w="80%"
            rounded="2xl"
            opacity={0.8}
            minH={50}
            bg="highlightRed"
            color="light1"
            alignItems="center"
          />
        </SafeAreaProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
