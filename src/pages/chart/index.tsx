import { useState, useEffect } from 'react';
import { OhlcData } from 'lightweight-charts';
import fetchChartData from '@/services/fetchChartData';
import Dropdown from '@/components/Dropdown/Dropdown';
import { Stack } from '@mui/material';
import BasicTable from '@/components/Table/Table';
import { BitfinexResponse } from '@/interface';
import { config } from '../../../configs/ohlcv';
import { formatChartData } from '@/util/formatChartData';
import Chart from '@/components/Chart/Chart';
import { dropdownStackStyles } from '@/util/config.styles';

export default function CandlestickChart() {

    const [ohlcvData, setOhlcvData] = useState<OhlcData[]>([])
    const [granularity, setGranularity] = useState(config.granularity);
    const [token, setToken] = useState(config.token);
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
            const data: OhlcData[] = formatChartData(response)
            setOhlcvData(data);
        }
        fetchData();
    }, [granularity, token]);

    useEffect(() => {
        const wsUrl: any = config.WEBSOCKET_URL ?? 'wss://api-pub.bitfinex.com/ws/2'
        const w = new WebSocket(wsUrl);
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
                if (data.event !== 'info' && data.event !== 'subscribed' && Array.isArray(data[1]))
                    setOrderBook(data);
            }
        }

        return () => {
            return w.close();
        }
    }, [token]);

    return (
        <Stack sx={{ backgroundImage: 'url("/bg.jpg")' }}>
            <Stack width='100vw' height='100vh'>
                <Stack sx={{
                    display: "flex",
                    backgroundColor: "white",
                    alignItems: "flex-start",
                    margin: "auto",
                }}>
                    <Stack sx={dropdownStackStyles}>
                        <Dropdown id='granularity' type='Granularity' onChange={handleGranularityChange} value={granularity} />
                    </Stack>
                    <Stack sx={{ ...dropdownStackStyles, left: "380px" }}>
                        <Dropdown id='token' type='Token' onChange={handleTokenChange} value={token} />
                    </Stack>
                    <Chart ohlcvData={ohlcvData} />
                </Stack>
            </Stack >
            <Stack
                width='100%'
                height='100%'
            >
                <BasicTable token={token} orderBook={orderBook} />
            </Stack>
        </Stack >
    );
}
