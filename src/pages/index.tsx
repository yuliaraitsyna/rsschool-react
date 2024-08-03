import React from 'react';
import App from '../components/home/App';
import { GetServerSideProps } from 'next';
import { wrapper } from '../components/redux/store';
import { starWarsAPI } from '../components/redux/starWarsAPI';

const HomePage = () => {
  return <App></App>
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
      await store.dispatch(starWarsAPI.endpoints.getDataByPage.initiate(1));
      return { props: {} };
    }
);