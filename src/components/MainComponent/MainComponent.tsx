import { useState } from 'react';
import { SelectChangeEvent, Stack } from '@mui/material';
import Dropdown from '@/components/Dropdown/Dropdown';
import { config } from '@/configs/ohlcv.constant';
import OhlcChart from '@/components/OhlcChart/OhlcChart';
import useOhlcData from '@/util/hooks/ohlcData';
import { ChartContainer, MainStack, TickerChartContainer } from '@/util/ohlc.styles';
import TimeFrameChips from '@/components/TimeFrameChip/TimeFrameChip';
import { calculateUnixTimestampForTimeFrame } from '@/util/calculateTimestamp';
import useTickersData from '@/util/hooks/tickersData';
import { OhlcLabelType } from '@/interface';
import Tickers from '@/components/NoSSR/NoSSR';
import { useDispatch, useSelector } from 'react-redux';
import { coinActions } from '@/store/coinSlice';

export default function MainComponent() {
    const [granularity, setGranularity] = useState(config.defaultGranularity);
    const coin = useSelector((state:any)=> state.coin.coin);
    const dispatch = useDispatch();
    const [timeFrame, setTimeFrame] = useState<number | null>(null);
    const [timeLabel, setTimeLabel] = useState<string | null>(null);

    const handleGranularityChange = (event: SelectChangeEvent) => {
        setGranularity(event.target.value);
    };

    const handleTokenFromTicker = (symbol: string) => {
        dispatch(coinActions.setCoin(symbol));
    };

    const handleTimeChange = (label: string) => {
        setTimeLabel(label);
        const timeFrame = label ? calculateUnixTimestampForTimeFrame(label) : null;
        if (timeFrame) {
            setTimeFrame(timeFrame.timestamp);
            if (timeFrame.granularity !== granularity)
                setGranularity(timeFrame.granularity);
        }
    };

    const { ohlcvData } = useOhlcData(granularity, coin, timeFrame);
    const { tickers, isLoading } = useTickersData();
    const defaultOhlcLabel: OhlcLabelType = ohlcvData[ohlcvData.length - 1]

    return (
        <TickerChartContainer>
            <Tickers tickers={tickers} onClick={handleTokenFromTicker} isLoading={isLoading} />
            <ChartContainer>
                <Stack direction={'row'}>
                    <Dropdown id='granularity' type='Granularity' options={config.granularityOptions}
                        onChange={handleGranularityChange} value={granularity} />
                </Stack>
                <OhlcChart ohlcvData={ohlcvData} label={defaultOhlcLabel} />
                <TimeFrameChips onSelect={handleTimeChange} selectedLabel={timeLabel} />
            </ChartContainer>
        </TickerChartContainer>
    );
}
