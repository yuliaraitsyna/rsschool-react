import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../models/Person";
import extractIdFromUrl from "../models/extractIdFromUrl";

export interface CardsState {
    selectedCards: Person[],
}

const initialState: CardsState = {
    selectedCards: [],
}

export const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
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

export const { selectCard, unselectCard, unselectAll } = cardsSlice.actions;
export default cardsSlice;
