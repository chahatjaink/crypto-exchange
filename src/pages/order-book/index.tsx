import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import OrderBookTable from "@/components/Table/OrderBookTable";
import Header from "@/components/Header/Header";
import Tickers from "@/components/NoSSR/NoSSR";
import { useDispatch, useSelector } from "react-redux";
import { coinActions } from "@/store/coinSlice";
import { TickersState } from "@/interface";

export default function OrderBookPage() {
  const router = useRouter();
  const { query } = router;
  const coin: string = query.coin as string;
  const dispatch = useDispatch();

  const tickers = useSelector((state: TickersState) => state.tickers.tickers);

  const handleTokenFromTicker = (symbol: string) => {
    dispatch(coinActions.setCoin(symbol));
  };

  return (
    <Stack>
      <Header />
      <Tickers tickers={tickers} onClick={handleTokenFromTicker}/>
      <OrderBookTable coin={coin} />
    </Stack>
  );
}
