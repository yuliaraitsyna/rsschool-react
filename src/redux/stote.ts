import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from "./CardsSlice"

const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});

export default store;
