import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const fetchCoins = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const url = `${apiUrl}/conf/pub:list:pair:exchange`;
    const response = await axios.get(url);
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

export default fetchCoins;
