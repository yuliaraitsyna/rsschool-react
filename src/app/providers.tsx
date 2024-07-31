'use client';

import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../components/redux/store';
import ThemeProvider from '../components/theme/ThemeProvider';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <ReduxProvider store={store}>
          {children}
      </ReduxProvider>
    </ThemeProvider>
  );
};