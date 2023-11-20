import { config } from "@/configs/ohlcv.constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState: string = config.defaultCoin;

const coinSlice = createSlice({
  name: "selectedCoin",
  initialState,
  reducers: {
    setCoin: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const coinActions = coinSlice.actions;

export default coinSlice.reducer;
