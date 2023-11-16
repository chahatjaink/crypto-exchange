import { config } from '@/configs/ohlcv.constant';
import { coinInitialState } from '@/interface';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState: coinInitialState = {
    coin: config.defaultCoin,
}

const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        setCoin: (state, action) => {
            state.coin = action.payload;
        },
    },
})

export const coinActions = coinSlice.actions;

export default coinSlice.reducer;