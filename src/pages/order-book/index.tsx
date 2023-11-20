import React from "react";
import OrderBookTable from "@/components/Table/OrderBookTable";
import Header from "@/components/Header/Header";
import Tickers from "@/components/NoSSR/NoSSR";
import {
  MainStack,
  TickerChartContainer,
} from "@/components/OhlcPage/ohlcPage.styles";

export default function OrderBookPage() {
  return (
    <MainStack>
      <Header />
      <TickerChartContainer>
        <Tickers />
        <OrderBookTable />
      </TickerChartContainer>
    </MainStack>
  );
}
