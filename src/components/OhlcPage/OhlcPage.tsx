import React from "react";
import Tickers from "@/components/NoSSR/NoSSR";
import { TickerChartContainer } from "./ohlcPage.styles";
import OhlcChartContainer from "./OhlcChartContainer";

export default function OhlcPage() {
  return (
    <TickerChartContainer>
      <Tickers />
      <OhlcChartContainer />
    </TickerChartContainer>
  );
}
