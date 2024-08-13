import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { countries } from "../../info/countries";

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        selectedCountry: countries[0],
        countries: countries,
    },
    reducers: {
        setSelectedCountry: (state, action: PayloadAction<string>) => {
            state.selectedCountry = action.payload;
        }
    }
});

export default countriesSlice;
export const {setSelectedCountry} = countriesSlice.actions;