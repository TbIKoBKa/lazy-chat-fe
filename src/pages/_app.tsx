import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';

import { RouterTransition, GlobalStyles } from '@/components';
import { theme } from '@/static/theme';
import { store } from '@/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <Provider store={store}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <GlobalStyles />
          <RouterTransition />
          <Component {...pageProps} />
        </MantineProvider>
      </Provider>
    </>
  );
}
