import { useState, use } from 'react';
import { SelectChangeEvent, Stack } from '@mui/material';
import { dropdownStackStyles } from '@/util/config.styles';
import { OhlcData } from 'lightweight-charts';
import Dropdown from '@/components/Dropdown/Dropdown';
import BasicTable from '@/components/Table/Table';
import { config } from '@/configs/ohlcv.constant';
import OhlcChart from '@/components/OhlcChart/OhlcChart';
import useOhlcData from '@/util/hooks/ohlcData';
import useOrderBook from '@/util/hooks/orderBook';
import { ChartContainer } from '@/util/ohlc.styles';
import ResponsiveAppBar from '@/components/AppBar/AppBar';
import TimeFrameChips from '@/components/TimeFrameChip/TimeFrameChip';
import { calculateUnixTimestampForTimeFrame } from '@/util/calculateTimestamp';
import TickersTable from '@/components/Table/TickerTable';
import useTickersData from '@/util/hooks/tickersData';
import { GroupedData, OhlcLabelType, OrderData, Tickers } from '@/interface';

export default function OhlcChartPage() {
    const [granularity, setGranularity] = useState(config.defaultGranularity);
    const [coin, setCoin] = useState(config.defaultCoin);
    const [timeFrame, setTimeFrame] = useState<number | null>(null);
    const [timeLabel, setTimeLabel] = useState<string | null>(null);

    const handleGranularityChange = (event: SelectChangeEvent) => {
        setGranularity(event.target.value);
    };

    const handleTokenChange = (event: SelectChangeEvent) => {
        setCoin(event.target.value);
    };

    const handleTimeChange = (label: string) => {
        setTimeLabel(label);
        const timeFrame = label ? calculateUnixTimestampForTimeFrame(label) : null;
        let startTime = null;
        let updatedGranularity = granularity;
        if (timeFrame) {
            startTime = timeFrame.timestamp;
            updatedGranularity = timeFrame.granularity;
        }
        setTimeFrame(startTime);
        if (updatedGranularity !== granularity)
            setGranularity(updatedGranularity);
    };

    const ohlcvData: OhlcData[] = useOhlcData(granularity, coin, timeFrame);
    const orderBook: OrderData | undefined = useOrderBook(coin);
    const tickersData: GroupedData | undefined = useTickersData(coin);
    const defaultOhlcLabel: OhlcLabelType = ohlcvData[ohlcvData.length - 1]

    return (
        <Stack sx={{ backgroundColor: "black" }}>
            <ResponsiveAppBar />
            <Stack paddingTop={1}>
                <Stack direction={'row'} gap={1}>
                    <TickersTable tickers={tickersData} />
                    <ChartContainer>
                        <Stack direction={'row'}>
                            <Dropdown id='granularity' type='Granularity' options={config.granularityOptions} onChange={handleGranularityChange} value={granularity} />
                            <Dropdown id='coin' type='Token' options={config.coinOptions} onChange={handleTokenChange} value={coin} />
                        </Stack>
                        <OhlcChart ohlcvData={ohlcvData} label={defaultOhlcLabel} />
                        <TimeFrameChips onSelect={handleTimeChange} selectedLabel={timeLabel} />
                    </ChartContainer>
                </Stack>
            </Stack >
            <Stack
                width='100%'
                height='100%'
            >
                <BasicTable coin={coin} orderBook={orderBook} />
            </Stack>
        </Stack>
    );
}
