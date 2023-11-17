import { configureStore } from "@reduxjs/toolkit";
import coinSlice from "./coinSlice";
import tickerSlice from "./tickerSlice";

const store = configureStore({
    reducer: {
        coin: coinSlice,
        tickers: tickerSlice
    },
})

export default store;