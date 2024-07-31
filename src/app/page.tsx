import React, { Suspense } from 'react';
import '../styles/global.css';
import { Providers } from './providers';
import App from '@components/home/App';

const Page: React.FC = () => {
  return (
    <html>
      <body>
        <Providers>
            <Suspense>
                <App/>
            </Suspense>
        </Providers>
      </body>
    </html>
  );
};

export default Page;
