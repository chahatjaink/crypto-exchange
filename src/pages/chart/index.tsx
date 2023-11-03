import { useState, useEffect, useRef } from 'react';
import { createChart, CrosshairMode, IChartApi, ISeriesApi, LineStyle, OhlcData } from 'lightweight-charts';
import fetchChartData from '@/services/fetchChartData';
import Dropdown from '@/components/Dropdown/Dropdown';
import { ClassNames } from '@emotion/react';
import { Stack } from '@mui/material';

export default function CandlestickChart() {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [ohlcvData, setOhlcvData] = useState<OhlcData[]>([])
    const [granularity, setGranularity] = useState('30m');
    const [token, setToken] = useState('BTC');

    const handleGranularityChange = (event: any) => {
        setGranularity(event.target.value);
    };

    const handleTokenChange = (event: any) => {
        setToken(event.target.value);
    };
    useEffect(() => {
        async function fetchData() {
            const response = await fetchChartData(granularity, 'BTC');
            console.log("TCL: fetchData -> response", response)
            const data: OhlcData[] = response.map((item: Array<OhlcData>) =>
            ({
                time: Number(item[0]) / 1000,
                open: item[1],
                close: item[2],
                high: item[3],
                low: item[4],
            })
            )
                .sort((a: OhlcData, b: OhlcData) => Number(a.time) - Number(b.time));
            setOhlcvData(data);
        }
        fetchData();
    }, [granularity]);

    useEffect(() => {
        if (chartContainerRef.current) {
            const chart: IChartApi = createChart(chartContainerRef.current, {
                width: 1200, height: 600, layout: {
                    background: { color: '#222' },
                    textColor: '#DDD',
                },
                grid: {
                    vertLines: { color: '#444' },
                    horzLines: { color: '#444' },
                },
            });
            chart.applyOptions({
                crosshair: {
                    mode: CrosshairMode.Magnet,
                    vertLine: {
                        width: 2,
                        color: '#C3BCDB44',
                        style: LineStyle.Solid,
                        labelBackgroundColor: '#9B7DFF',
                    },
                    horzLine: {
                        color: '#9B7DFF',
                        labelBackgroundColor: '#9B7DFF',
                    },
                },
            })
            // Setting the border color for the horizontal axis
            chart.timeScale().applyOptions({
                ticksVisible: true,
                timeVisible: true,
                borderColor: '#71649C',
                barSpacing: 10,
                fixRightEdge: true,
                rightBarStaysOnScroll: true
            });
            const candlestickSeries: ISeriesApi<"Candlestick"> = chart.addCandlestickSeries();
            candlestickSeries.setData(ohlcvData);
            candlestickSeries.applyOptions({
                wickUpColor: 'rgb(156, 204, 0)',
                upColor: 'rgb(156, 204, 0)',
                wickDownColor: 'rgb(225, 50, 85)',
                downColor: 'rgb(225, 50, 85)',
                borderVisible: false,
            });
            candlestickSeries.priceScale().applyOptions({
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.2,
                },
            });
            return () => {
                chart.remove();
            };
        }
    }, [ohlcvData]);


    return (
        <Stack width='100vw' height='100vh'>
            <Stack sx={{
                display: "flex",
                backgroundColor: "white",
                alignItems: "flex-start",
                margin: "auto",
            }}>
                <Stack sx={{
                    position: "absolute",
                    backgroundColor: "white",
                    zIndex: 10,
                    marginTop: "20px",
                }}>
                    <Dropdown id='granularity' onChange={handleGranularityChange} value={granularity} />
                    <Dropdown id='token' onChange={handleTokenChange} value={token} />
                </Stack>
                <Stack ref={chartContainerRef} />
            </Stack>
        </Stack >
    );
}
