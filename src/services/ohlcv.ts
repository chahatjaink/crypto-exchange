import axios, { AxiosResponse } from 'axios';
import { config } from '../../configs/ohlcv';

// Define your API endpoint URL
const API_URL: string = config.API_URL ?? 'https://api-pub.bitfinex.com/v2/candles/trade%3A1m%3AtBTCUSD/hist?sort=-1';

// Create a function to make the API call
export const fetchOhlcvData = async (): Promise<AxiosResponse> => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
        return response;
    } catch (error) {
        console.log("TCL: error", error)
        throw error;
    }
};
