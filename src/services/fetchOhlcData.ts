import axios from "axios";

export default async function fetchOhlcData(
  granularity: string,
  selectedCoin: string,
  startTime: number | null
) {
  try {
    const response = await axios.get("/api/ohlc", {
      params: {
        granularity,
        selectedCoin,
        startTime,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
