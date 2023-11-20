import React from "react";
import { useSelector } from "react-redux";
import { SelectChangeEvent, Stack } from "@mui/material";
import { config } from "@/configs/ohlcv.constant";
import Dropdown from "../Dropdown/Dropdown";
import OhlcChart from "../OhlcChart/OhlcChart";
import TimeFrameChips from "../TimeFrameChip/TimeFrameChip";
import { ChartContainer } from "./ohlcPage.styles";
import { useState } from "react";
import { CoinState, OhlcLabelType } from "@/interface";
import { calculateUnixTimestampForTimeFrame } from "@/util/calculateTimestamp";
import useOhlcData from "@/util/hooks/ohlcData";

export default function OhlcChartContainer() {
  const [granularity, setGranularity] = useState(config.defaultGranularity);
  const [timeFrame, setTimeFrame] = useState<number | null>(null);
  const [timeLabel, setTimeLabel] = useState<string | null>(null);

  const selectedCoin = useSelector((state: CoinState) => state.selectedCoin);

  const handleGranularityChange = (event: SelectChangeEvent) => {
    setGranularity(event.target.value);
  };

  const handleTimeChange = (label: string) => {
    setTimeLabel(label);
    const timeFrame = label ? calculateUnixTimestampForTimeFrame(label) : null;
    if (timeFrame) {
      setTimeFrame(timeFrame.timestamp);
      if (timeFrame.granularity !== granularity)
        {setGranularity(timeFrame.granularity);}
    }
  };

  const { ohlcvData } = useOhlcData(granularity, selectedCoin, timeFrame);
  const defaultOhlcLabel: OhlcLabelType = ohlcvData[ohlcvData.length - 1];
  return (
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
      <OhlcChart
        ohlcvData={ohlcvData}
        label={defaultOhlcLabel}
        selectedCoin={selectedCoin}
      />
      <TimeFrameChips onSelect={handleTimeChange} selectedLabel={timeLabel} />
    </ChartContainer>
  );
}
