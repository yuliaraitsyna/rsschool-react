import React from 'react';
import { Providers } from './providers';
import '../styles/global.css';
import { starWarsAPI } from '@components/redux/starWarsAPI';

const fetchData = async () => {
    const response = starWarsAPI.endpoints.getDataByPage.initiate(1);
    return response;
}

const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
    const data = await fetchData();
    return (
        <html>
+           <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
};

export default Layout;