import axios from 'axios';

export default async function fetchChartData(granularity:string, token:string) {
    try {
        const response = await axios.get('/api/fetchData',{
            params: {
                granularity,
                token
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};