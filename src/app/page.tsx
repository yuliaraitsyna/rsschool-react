
import React, { Suspense } from 'react';
import App from '../components/home/App';

const Page: React.FC = () => {
  return (
    <Suspense>
      <App/>
    </Suspense>
  );
};

export default Page;
