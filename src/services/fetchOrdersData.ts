import axios from 'axios';

export default async function fetchOrdersData(token: string) {
    try {
        const response = await axios.get('/api/fetchOrders', {
            params: {
                token
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};