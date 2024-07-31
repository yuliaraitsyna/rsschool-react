import React from 'react';
import { Providers } from './providers';
import '../styles/global.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html>
            <body>
               <Providers>{children}</Providers>
            </body>
        </html>
    );
};

export default Layout;