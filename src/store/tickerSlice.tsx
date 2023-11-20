import { TickerData } from "@/interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TickerData = {};

const tickersSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {
    setTickers: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const tickersActions = tickersSlice.actions;

export default tickersSlice.reducer;
