import { useState, use } from 'react';
import { SelectChangeEvent, Stack } from '@mui/material';
import { dropdownStackStyles } from '@/util/config.styles';
import { OhlcData } from 'lightweight-charts';
import Dropdown from '@/components/Dropdown/Dropdown';
import BasicTable from '@/components/Table/Table';
import { OrderData } from '@/interface';
import { config } from '@/configs/ohlcv.constant';
import OhlcChart from '@/components/OhlcChart/OhlcChart';
import useOhlcData from '@/util/hooks/ohlcData';
import useOrderBook from '@/util/hooks/orderBook';
import { ChartContainer } from '@/util/ohlc.styles';
import ResponsiveAppBar from '@/components/AppBar/AppBar';
import TimeFrameChips from '@/components/TimeFrameChip/TimeFrameChip';
import { calculateUnixTimestampForTimeFrame } from '@/util/calculateTimestamp';
import TickersTable from '@/components/Table/TickerTable';

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
    const orderBook = useOrderBook(coin);

    return (
        <Stack sx={{ backgroundColor: config.defaultColor }}>
            <ResponsiveAppBar />
            <Stack width='120vw' height='100vh'>
                <Stack sx={dropdownStackStyles}>
                    <Dropdown id='granularity' type='Granularity' options={config.granularityOptions} onChange={handleGranularityChange} value={granularity} />
                </Stack>
                <Stack sx={{ ...dropdownStackStyles, left: "480px" }}>
                    <Dropdown id='coin' type='Token' options={config.coinOptions} onChange={handleTokenChange} value={coin} />
                </Stack>
                <Stack sx={{ width: "20%", top: "50%", left: "0px" }}>
                    <TickersTable />
                </Stack>
                <ChartContainer>
                    <OhlcChart ohlcvData={ohlcvData} />
                    <TimeFrameChips onSelect={handleTimeChange} selectedLabel={timeLabel} />
                </ChartContainer>
            </Stack >
            <Stack
                width='100%'
                height='100%'
            >
                <BasicTable coin={coin} orderBook={orderBook} />
            </Stack>
        </Stack >
    );
}
