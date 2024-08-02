import React, { Suspense } from 'react';
import App from '../components/home/App';
import { Person } from '@models/Person';

const fetchData = async (page: number): Promise<{ results: Person[]; count: number }> => {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const Page: React.FC = async () => {
  const data = await fetchData(1);

  return (
    <Suspense>
      <App initialData={data.results} />
    </Suspense>
  );
};

export default Page;
