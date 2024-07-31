"use client";
import React, { Suspense } from 'react';
import '../styles/global.css';
import { Providers } from './providers';
import App from '../components/home/App';
import { starWarsAPI, useGetDataByPageQuery, useGetDetailsByIdQuery } from '../components/redux/starWarsAPI';
import { useDispatch } from 'react-redux';

const fetchData = async () => {
    try {
      const response = await starWarsAPI.endpoints.getDataByPage.initiate(1);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
};

const Page: React.FC = async () => {
    const data = useGetDataByPageQuery(1);
    console.log(data)
    
  
    if (!data) {
        return <div>Error fetching data</div>;
    }
    else console.log(data);
    
  return (
        <Suspense>
            <App/>
        </Suspense>
  );
};

export default Page;
