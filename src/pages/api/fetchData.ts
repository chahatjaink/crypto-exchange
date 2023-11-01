import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const fetchData = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { granularity, token } = req.query;
        const apiUrl = process.env.API_URL || '';
        const url = `${apiUrl}trade%3A${granularity}%3At${token}USD/hist`;
        const response = await axios.get(url);
        const data = response.data;
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
};


export default fetchData;

