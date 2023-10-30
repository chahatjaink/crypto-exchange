import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export default function CandlestickChart() {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartContainerRef.current) {
            // Create a new candlestick chart
            const chart = createChart(chartContainerRef.current, { width: 800, height: 400 });

            // Create a candlestick series  
            const candlestickSeries = chart.addCandlestickSeries();

            // Sample data (you can replace this with your own data)
            const data = [
                { time: '2023-10-01', open: 100, high: 110, low: 90, close: 105 },
                { time: '2023-10-02', open: 105, high: 115, low: 95, close: 110 },
                // Add more data points here  
            ];

            // Add the data to the candlestick series
            candlestickSeries.setData(data);

            // Clean up when the component unmounts
            return () => {
                chart.remove();
            };
        }
    }, []);

    return (
        <div>
            <div ref={chartContainerRef}></div>
        </div>
    );
}