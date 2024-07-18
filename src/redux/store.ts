import { configureStore } from '@reduxjs/toolkit';
import cardsSlice from './cardsSlice';

const store = configureStore({
  reducer: {
    cards: cardsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
