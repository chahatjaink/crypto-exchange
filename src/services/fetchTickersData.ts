import axios from 'axios';

export default async function fetchTickersData() {
    try {
        const response = await axios.get('/api/tickers');
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};