import { configureStore } from "@reduxjs/toolkit";
import coinSlice from "./coinSlice";

const store = configureStore({
    reducer: {
        coin: coinSlice,
    },
})

export default store;