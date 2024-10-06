import React from 'react';
import { Provider } from 'react-redux';
import { wrapper } from '../components/redux/store';
import ThemeProvider from '../components/theme/ThemeProvider';
import '../styles/global.css';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { starWarsAPI } from '../components/redux/starWarsAPI';
import { AppProps } from 'next/app';
import ErrorBoundary from '../components/error_handling/ErrorBoundary';


const MyApp = ({ Component, pageProps }: AppProps) => {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ApiProvider api={starWarsAPI}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ApiProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default MyApp;