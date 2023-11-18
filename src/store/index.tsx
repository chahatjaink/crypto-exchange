import { configureStore } from "@reduxjs/toolkit";
import coinSlice from "./coinSlice";
import tickerSlice from "./tickerSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    coin: coinSlice,
    tickers: tickerSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
