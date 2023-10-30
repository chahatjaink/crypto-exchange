import { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { fetchOhlcvData } from '@/services/ohlcv';
import { CandlestickData } from '@/interface';

export default function CandlestickChart() {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [ohlcvData, setOhlcvData] = useState<CandlestickData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const ohlcvData = await fetchOhlcvData();
            setOhlcvData(ohlcvData.data);
            console.log("TCL: fetchOhlcvData -> ohlcvData", ohlcvData.data);
            const data = [
                { time: '2023-10-01', open: 100, high: 110, low: 90, close: 105 },
            ];
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