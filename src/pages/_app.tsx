import React from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../components/redux/store';
import ErrorBoundary from '../components/error_handling/ErrorBoundary';
import ThemeProvider from '../components/theme/ThemeProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default wrapper.withRedux(MyApp);
