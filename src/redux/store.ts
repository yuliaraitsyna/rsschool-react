import { configureStore } from '@reduxjs/toolkit';
import cardsSlice from './cardsSlice';
import pageSlice from './pageSlice';

const store = configureStore({
  reducer: {
    cards: cardsSlice.reducer,
    pages: pageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
