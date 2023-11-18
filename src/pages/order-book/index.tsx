import { MainStack, TickerChartContainer } from "@/util/ohlc.styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, useAppDispatch } from "@/store";
import { getTickersData } from "@/store/ticker-actions";
import OrderBookTable from "@/components/Table/OrderBookTable";
import Header from "@/components/Header/Header";
import Tickers from "@/components/NoSSR/NoSSR";
import { CoinState, TickersState } from "@/interface";

export default function OrderBookPage() {
  const dispatch: AppDispatch = useAppDispatch();
  const coin = useSelector((state: CoinState) => state.coin.coin);
  const tickers = useSelector((state: TickersState) => state.tickers);

  useEffect(() => {
    dispatch(getTickersData());
  }, [dispatch]);

  return (
    <MainStack>
      <Header />
      <TickerChartContainer>
        <Tickers tickers={tickers} />
        <OrderBookTable coin={coin} />
      </TickerChartContainer>
    </MainStack>
  );
}
