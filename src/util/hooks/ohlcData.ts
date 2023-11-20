import fetchOhlcData from "@/services/fetchOhlcData";
import { useEffect, useState } from "react";
import { formatChartData } from "../formatChartData";
import { OhlcData } from "lightweight-charts";

function useOhlcData(
  granularity: string,
  selectedCoin: string,
  timeFrame: number | null
) {
  const [ohlcvData, setOhlcvData] = useState<OhlcData[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const ohlcData = async () => {
      setIsFetching(true);
      const response = await fetchOhlcData(
        granularity,
        selectedCoin,
        timeFrame
      );
      const data: OhlcData[] = formatChartData(response);
      setOhlcvData(data);
      setIsFetching(false);
    };
    ohlcData();
  }, [granularity, selectedCoin, timeFrame]);

  return { ohlcvData, isFetching };
}

export default useOhlcData;
