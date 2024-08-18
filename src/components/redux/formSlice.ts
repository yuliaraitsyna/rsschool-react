import { createSlice, isAction, PayloadAction } from "@reduxjs/toolkit";
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
        updatedFields: [] as string[]
    },
    reducers: {
        setData: (state, action: PayloadAction<Person>) => {
            state.updatedFields = [];

            Object.keys(action.payload).forEach((key) => {
                if(state.data[key as keyof Person] !== action.payload[key as keyof Person]) {
                    if (!state.updatedFields.includes(key)) {
                        state.updatedFields.push(key);
                    }
                }
            })

            state.data = action.payload;
        },
    }
});

export default formSlice;
export const {setData} = formSlice.actions;