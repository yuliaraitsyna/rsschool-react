// components/providers.tsx
'use client';

import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';
import ThemeProvider from '../theme/ThemeProvider';

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
