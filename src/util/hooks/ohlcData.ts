import fetchOhlcData from '@/services/fetchOhlcData';
import { useEffect, useState } from 'react';
import { formatChartData } from '../formatChartData';
import { OhlcData } from 'lightweight-charts';

function useOhlcData(granularity: string, coin: string, timeFrame: number | null) {
  const [ohlcvData, setOhlcvData] = useState<OhlcData[]>([]);

  useEffect(() => {
    const ohlcData = async () => {

      const response = await fetchOhlcData(granularity, coin, timeFrame);
      const data: OhlcData[] = formatChartData(response);
      setOhlcvData(data);
    }
    ohlcData();
  }, [granularity, coin, timeFrame]);

  return ohlcvData;
}

export default useOhlcData;
