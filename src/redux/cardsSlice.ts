import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../models/Person";
import extractIdFromUrl from "../models/extractIdFromUrl";

export interface CardsState {
    cards: Person[],
    selectedCards: Person[],
}

const initialState: CardsState = {
    cards: [],
    selectedCards: [],
}

const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        setCards: (state, action: PayloadAction<Person[]>) => {
            state.cards = action.payload;
        },
        selectCard: (state, action: PayloadAction<Person>) => {
            state.selectedCards.push(action.payload);
        },
        unselectCard: (state, action: PayloadAction<number>) => {
            state.selectedCards = state.selectedCards.filter(card => extractIdFromUrl(card.url) !== action.payload);
        },
        unselectAll: (state) => {
            state.selectedCards = [];
        },
    },
});

export const { setCards, selectCard, unselectCard, unselectAll } = cardsSlice.actions;
export default cardsSlice.reducer;
