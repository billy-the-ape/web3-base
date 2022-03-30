import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import darkTheme from '@/theme/darkTheme';
import { SnackbarOrigin, SnackbarProvider } from 'notistack';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';

const SNACKBAR_ANCHOR_ORIGIN: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider maxSnack={2} anchorOrigin={SNACKBAR_ANCHOR_ORIGIN}>
          <CssBaseline />
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
