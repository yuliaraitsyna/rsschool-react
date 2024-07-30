import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Person } from '../../models/Person';

export const starWarsAPI = createApi({
  reducerPath: 'starWarsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people/' }),
  endpoints: (builder) => ({
    getDataByPage: builder.query<{ results: Person[]; count: number }, number>({
      query: (page) => `?page=${page}`,
    }),
    getDataByName: builder.query<{ results: Person[]; }, string>({
      query: (name) => `?search=${name}`,
    }),
    getDetailsById: builder.query<Person, number>({
      query: (id) => `${id}/`,
    }),
  }),
});

export const { useGetDataByPageQuery, useGetDataByNameQuery, useGetDetailsByIdQuery } = starWarsAPI;
