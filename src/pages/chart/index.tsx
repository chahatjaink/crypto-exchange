import { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { CandlestickData } from '@/interface';
import fetchChartData from '@/services/fetchChartData';

export default function CandlestickChart() {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [ohlcvData, setOhlcvData] = useState<CandlestickData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetchChartData();
            const data: CandlestickData[] = response.map((item: CandlestickData[]) => {
                return {
                    time: item[0],
                    open: item[1],
                    high: item[2],
                    low: item[3],
                    close: item[4],
                }
            })
            setOhlcvData(data);
            console.log("TCL: fetchOhlcvData -> response", ohlcvData);
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (chartContainerRef.current) {
            // Create a new candlestick chart
            const chart = createChart(chartContainerRef.current, { width: 800, height: 400 });

            // Create a candlestick series  
            const candlestickSeries = chart.addCandlestickSeries();
            // Add the data to the candlestick series
            candlestickSeries.setData(ohlcvData);

            // Clean up when the component unmounts
            return () => {
                chart.remove();
            };
        }
    }, [ohlcvData]);

    return (
        <div>
            <div ref={chartContainerRef}></div>
        </div>
    );
}