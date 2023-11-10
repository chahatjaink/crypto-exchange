import { useState } from 'react';
import { SelectChangeEvent, Stack } from '@mui/material';
import { OhlcData } from 'lightweight-charts';
import Dropdown from '@/components/Dropdown/Dropdown';
import { config } from '@/configs/ohlcv.constant';
import OhlcChart from '@/components/OhlcChart/OhlcChart';
import useOhlcData from '@/util/hooks/ohlcData';
import { ChartContainer } from '@/util/ohlc.styles';
import ResponsiveAppBar from '@/components/AppBar/AppBar';
import TimeFrameChips from '@/components/TimeFrameChip/TimeFrameChip';
import { calculateUnixTimestampForTimeFrame } from '@/util/calculateTimestamp';
import useTickersData from '@/util/hooks/tickersData';
import { GroupedData, OhlcLabelType } from '@/interface';
import Tickers from '@/components/NoSSR/NoSSR';

export default function OhlcChartPage() {
    const [granularity, setGranularity] = useState(config.defaultGranularity);
    const [coin, setCoin] = useState(config.defaultCoin);
    const [timeFrame, setTimeFrame] = useState<number | null>(null);
    const [timeLabel, setTimeLabel] = useState<string | null>(null);

    const handleGranularityChange = (event: SelectChangeEvent) => {
        setGranularity(event.target.value);
    };

    const handleTokenFromTicker = (symbol: string) => {
        setCoin(symbol);
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

    const tickersData: GroupedData | undefined = useTickersData(coin);
    const defaultOhlcLabel: OhlcLabelType = ohlcvData[ohlcvData.length - 1]

    return (
        <Stack sx={{ backgroundColor: "black" }} height={'100vh'}>
            <ResponsiveAppBar coin={coin} />
            <Stack direction={'row'} gap={1} height={'88vh'} paddingTop={1}>
                <Tickers tickers={tickersData} onClick={handleTokenFromTicker} />
                <ChartContainer>
                    <Stack direction={'row'}>
                        <Dropdown id='granularity' type='Granularity' options={config.granularityOptions} onChange={handleGranularityChange} value={granularity} />
                    </Stack>
                    <OhlcChart ohlcvData={ohlcvData} label={defaultOhlcLabel} coin={coin} />
                    <TimeFrameChips onSelect={handleTimeChange} selectedLabel={timeLabel} />
                </ChartContainer>
            </Stack>
        </Stack>
    );
}
