import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./countriesSlice";
import formSlice from "./formSlice";

const store = configureStore({
    reducer: {
        countries: countriesSlice.reducer,
        form: formSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;