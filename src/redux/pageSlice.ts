import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface PageState {
    currentPage: number;
    totalPages: number;
}

const initialState: PageState = {
    currentPage: 1,
    totalPages: 1,
}

export const pageSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        nextPage: (state) => {
            if(state.currentPage < state.totalPages) {
                state.currentPage++;
            }
        },
        prevPage: (state) => {
            if(state.currentPage > 1) {
                state.currentPage--;
            }
        }
    },
});

export const { setTotalPages, nextPage, prevPage } = pageSlice.actions;
export default pageSlice;
