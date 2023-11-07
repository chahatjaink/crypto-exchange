import axios from 'axios';

export default async function fetchBookData(token: string) {
    try {
        const response = await axios.get('/api/book', {
            params: {
                token
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching book data");
    }
};