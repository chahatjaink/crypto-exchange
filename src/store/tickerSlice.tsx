import { config } from '@/configs/ohlcv.constant';
import { GroupedData } from '@/interface';
import fetchTickersData from '@/services/fetchTickersData';
import formatTickersData from '@/util/formatTickersData';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     currency: 'USD';
//     ticker: {

//     };
// } 


export const getTickersData = (ticker: any) => {
    return async (dispatch:any) =>{
        const fetchTickers = async () => {
            const tickerData = await fetchTickersData();
            const tickerGroupedData: GroupedData = formatTickersData(tickerData);
            
        };

    }
}