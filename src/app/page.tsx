"use client";
import React, { useEffect } from 'react';
import '../styles/global.css';
import { Providers } from '../components/redux/providers';
import App from '../components/home/App';
import { useGetDataByPageQuery } from '../components/redux/starWarsAPI';

const Page: React.FC = () => {
  return (
    <h1>Hello</h1>
  );
};

export default Page;
