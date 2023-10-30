import axios from 'axios';

export default async function fetchChartData() {
    try {
        const response = await axios.get('/api/fetchData');
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};