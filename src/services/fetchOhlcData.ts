import axios from 'axios';

export default async function fetchOhlcData(granularity: string, token: string, startTime: number | null) {
    try {
        const response = await axios.get('/api/ohlc', {
            params: {
                granularity,
                token,
                startTime
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};