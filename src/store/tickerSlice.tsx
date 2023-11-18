import { GroupedData } from "@/interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GroupedData = {};

const tickersSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {
    setTickers: (state, action) => {
      state = action.payload;
      return state
    },
  },
});

export const tickersActions = tickersSlice.actions;

export default tickersSlice.reducer;
