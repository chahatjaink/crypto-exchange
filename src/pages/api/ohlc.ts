import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

//naming convention:
const fetchData = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { granularity, token, startTime } = req.query;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const startQuery = startTime ? `hist?start=${startTime}` : `hist`
        const url = `${apiUrl}/candles/trade%3A${granularity}%3A${token}/${startQuery}`;
        const response = await axios.get(url);
        const data = response.data;
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
};

export default fetchData;

