import { configureStore } from '@reduxjs/toolkit';
import cardsSlice from './cardsSlice';
import pageSlice from './pageSlice';
import { starWarsAPI } from './starWarsAPI';
import { createWrapper } from 'next-redux-wrapper';

const store = () => configureStore({
  reducer: {
    [starWarsAPI.reducerPath]: starWarsAPI.reducer,
    cards: cardsSlice.reducer,
    pages: pageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsAPI.middleware),
});

export type RootState = ReturnType<ReturnType<typeof store>['getState']>;
export const wrapper = createWrapper(store, {debug: true});
export default store;
