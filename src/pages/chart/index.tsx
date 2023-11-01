import { useState, useEffect, useRef } from 'react';
import { createChart, CrosshairMode, IChartApi, ISeriesApi, LineStyle, OhlcData } from 'lightweight-charts';
import fetchChartData from '@/services/fetchChartData';
import Dropdown from '@/components/Dropdown/Dropdown';
import { Stack } from '@mui/material';
import { dropdownStackStyles } from '@/util/dropdown.styles';
import BasicTable from '@/components/Table/Table';
import { BitfinexResponse } from '@/interface';

export default function CandlestickChart() {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [ohlcvData, setOhlcvData] = useState<OhlcData[]>([])
    const [granularity, setGranularity] = useState('30m');
    const [token, setToken] = useState('BTC');
    const [orderBook, setOrderBook] = useState<BitfinexResponse>();

    const handleGranularityChange = (event: any) => {
        setGranularity(event.target.value);
    };

    const handleTokenChange = (event: any) => {
        setToken(event.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetchChartData(granularity, token);
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
    }, [granularity, token]);

    useEffect(() => {
        const w = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
        w.onopen = () => {
            w.send(
                JSON.stringify({
                    event: 'subscribe',
                    channel: 'book',
                    symbol: `t${token}USD`,
                })
            );
            w.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("TCL: w.onmessage -> data", data)
                setOrderBook(data);
            }
        }

        return () => {
            return w.close();
        }
    }, [token]);

    useEffect(() => {
        if (chartContainerRef.current) {
            const chart: IChartApi = createChart(chartContainerRef.current, {
                width: 1350, height: 750, layout: {
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
        <Stack sx={{ backgroundImage: 'url("/bg.jpg")' }}>
            <Stack width='100vw' height='100vh'>
                <Stack sx={{
                    display: "flex",
                    backgroundColor: "white",
                    alignItems: "flex-start",
                    margin: "auto",
                }}>
                    <Stack sx={{ ...dropdownStackStyles }}>
                        <Dropdown id='granularity' type='Granularity' onChange={handleGranularityChange} value={granularity} />
                    </Stack>
                    <Stack sx={{ ...dropdownStackStyles, left: "380px" }}>
                        <Dropdown id='token' type='Token' onChange={handleTokenChange} value={token} />
                    </Stack>
                    <Stack ref={chartContainerRef} sx={{ cursor: 'crosshair' }} />
                </Stack>
            </Stack >
            <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Stack
                    width='30vw'
                    height='100vh'
                    sx={{ marginRight: '20px' }}
                >
                    <BasicTable key={'profit'} />
                </Stack>
                <Stack
                    width='30vw'
                    height='100vh'
                >
                    <BasicTable key={'loss'} />
                </Stack>
            </Stack>
        </Stack >
    );
}
