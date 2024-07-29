import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../components/redux/store';
import ThemeProvider from '../components/theme/ThemeProvider';
import ErrorBoundary from '../components/error_handling/ErrorBoundary';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default MyApp;