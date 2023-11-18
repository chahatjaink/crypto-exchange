import { useEffect, useState } from "react";
import { SelectChangeEvent, Stack } from "@mui/material";
import Dropdown from "@/components/Dropdown/Dropdown";
import { config } from "@/configs/ohlcv.constant";
import OhlcChart from "@/components/OhlcChart/OhlcChart";
import useOhlcData from "@/util/hooks/ohlcData";
import { ChartContainer, TickerChartContainer } from "@/util/ohlc.styles";
import TimeFrameChips from "@/components/TimeFrameChip/TimeFrameChip";
import { calculateUnixTimestampForTimeFrame } from "@/util/calculateTimestamp";
import { GroupedData, OhlcLabelType, TickersState } from "@/interface";
import Tickers from "@/components/NoSSR/NoSSR";
import { useSelector } from "react-redux";
import { AppDispatch, useAppDispatch } from "@/store";
import { getTickersData } from "@/store/ticker-actions";

export default function MainComponent() {
  const [granularity, setGranularity] = useState(config.defaultGranularity);
  const [timeFrame, setTimeFrame] = useState<number | null>(null);
  const [timeLabel, setTimeLabel] = useState<string | null>(null);
  const dispatch: AppDispatch = useAppDispatch();
  const tickers = useSelector((state: TickersState) => state.tickers);
  const coin = useSelector((state: any) => state.coin.coin);

  const handleGranularityChange = (event: SelectChangeEvent) => {
    setGranularity(event.target.value);
  };

  useEffect(() => {
    dispatch(getTickersData());
  }, [dispatch]);

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
  const defaultOhlcLabel: OhlcLabelType = ohlcvData[ohlcvData.length - 1];

  return (
    <TickerChartContainer>
      <Tickers tickers={tickers} />
      <ChartContainer>
        <Stack direction={"row"}>
          <Dropdown
            id="granularity"
            type="Granularity"
            options={config.granularityOptions}
            onChange={handleGranularityChange}
            value={granularity}
          />
        </Stack>
        <OhlcChart ohlcvData={ohlcvData} label={defaultOhlcLabel} coin={coin} />
        <TimeFrameChips onSelect={handleTimeChange} selectedLabel={timeLabel} />
      </ChartContainer>
    </TickerChartContainer>
  );
}
