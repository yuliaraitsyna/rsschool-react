import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cardsSlice from './cardsSlice';
import pageSlice from './pageSlice';
import { starWarsAPI } from './starWarsAPI';
import { createWrapper } from 'next-redux-wrapper';

export const rootReducer = combineReducers({
  [starWarsAPI.reducerPath]: starWarsAPI.reducer,
  cards: cardsSlice.reducer,
  pages: pageSlice.reducer,
});

export const makeStore = () => configureStore({
  reducer: {
    [starWarsAPI.reducerPath]: starWarsAPI.reducer,
    cards: cardsSlice.reducer,
    pages: pageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsAPI.middleware),
});

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore, { debug: true });

export default store;
