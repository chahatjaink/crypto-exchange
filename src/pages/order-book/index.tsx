import { Stack } from "@mui/material";
import ResponsiveAppBar from "@/components/AppBar/AppBar";
import { useRouter } from "next/router";
import OrderBookTable from "@/components/Table/OrderBookTable";

export default function OrderBookPage() {
    const router = useRouter()
    const { query } = router
    const coin: string = query.coin as string

    return (
        <Stack>
            <ResponsiveAppBar coin={coin} />
            <Stack
                width='100%'
                height='100%'
            >
                <OrderBookTable coin={coin} />
            </Stack>
        </Stack>
    )
}