import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import OrderBookTable from "@/components/Table/OrderBookTable";
import Header from "@/components/Header/Header";
import Tickers from "@/components/NoSSR/NoSSR";
import useTickersData from "@/util/hooks/tickersData";

export default function OrderBookPage() {
    const router = useRouter()
    const { query } = router
    const coin: string = query.coin as string
    const { tickers, isLoading } = useTickersData();

    return (
        <Stack>
            <Header />
            <Tickers tickers={tickers} />
            <OrderBookTable coin={coin} />
        </Stack>
    )
}