import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const fetchData = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await axios.get('https://api-pub.bitfinex.com/v2/candles/trade%3A1m%3AtBTCUSD/hist?sort=1');
        const data = response.data;
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
};

export default fetchData;

