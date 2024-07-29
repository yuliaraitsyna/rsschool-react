import { configureStore } from '@reduxjs/toolkit';
import cardsSlice from './cardsSlice';
import pageSlice from './pageSlice';
import { starWarsAPI } from './starWarsAPI';

const store = configureStore({
  reducer: {
    [starWarsAPI.reducerPath]: starWarsAPI.reducer,
    cards: cardsSlice.reducer,
    pages: pageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
