import React from 'react';
import { Providers } from '../components/redux/providers';
import '../styles/global.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;
