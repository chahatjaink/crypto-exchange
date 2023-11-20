import { Stack } from "@mui/material";
import { OhlcData } from "lightweight-charts";
import { OhlcLabelType } from "@/interface";
import OhlcLabel from "../OhlcLabel/OhlcLabel";
import useOhlcChart from "@/util/hooks/ohlcChart";
import React from "react";

export default function OhlcChart(props: {
  ohlcvData: OhlcData[];
  label: OhlcLabelType;
  selectedCoin: string;
}) {
  const { chartContainerRef, ohlcLabel } = useOhlcChart(
    props.label,
    props.selectedCoin,
    props.ohlcvData
  );

  return (
    <>
      {ohlcLabel && (
        <OhlcLabel label={ohlcLabel} selectedCoin={props.selectedCoin} />
      )}
      <Stack ref={chartContainerRef} sx={{ cursor: "crosshair" }} />
    </>
  );
}
