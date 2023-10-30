import axios, { AxiosResponse } from 'axios';
import { config } from '../../configs/ohlcv';

// Define your API endpoint URL
const API_URL: string = config.API_URL ?? '';

// Create a function to make the API call
export const fetchOhlcvData = async (): Promise<AxiosResponse> => {
    try {
        const response = await axios.get(API_URL);
        return response;
    } catch (error) {
        console.log("TCL: error", error)
        throw error;
    }
};
