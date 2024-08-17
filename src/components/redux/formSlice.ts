import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Person, { Gender } from "../model/Person";
import { countries } from "../../info/countries";

const initialState: Person = {
    name: "",
    age: 0,
    gender: Gender.Female,
    email: "",
    password: "",
    repeatPassword: "",
    img: "",
    country: countries[0],
    terms: false
};

const formSlice = createSlice({
    name: 'form',
    initialState: {
        data: initialState,
    },
    reducers: {
        setData: (state, action: PayloadAction<Person>) => {
            state.data = action.payload;
        }
    }
});

export default formSlice;
export const {setData} = formSlice.actions;