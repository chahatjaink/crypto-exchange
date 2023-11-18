import { useEffect, useState } from "react";
import { OrderData } from "@/interface";
import { Stack } from "@mui/material";
import OrderTable from "./OrderTable";
import fetchBookData from "@/services/fetchBookData";
import { formatOrderBookData } from "@/util/formatOrderBookData";
import useOrderBook from "@/util/hooks/orderBook";
import { setOrderData } from "@/util/setOrderData";

export default function OrderBookTable(props: { coin: string }) {
  const [bidData, setBidData] = useState<Array<OrderData>>([]);
  const [askData, setAskData] = useState<Array<OrderData>>([]);
  const [count, setCount] = useState(0);
  const orderBook: OrderData | undefined = useOrderBook(props.coin);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders: Array<Array<number>> = await fetchBookData(props.coin);
      const orderDataArr: Array<OrderData> = orders.map((order) =>
        formatOrderBookData(order)
      );
      orderDataArr.map((orderData) =>
        setOrderData(orderData, count, setBidData, setAskData, setCount, true)
      );
    };
    fetchOrders();
  }, [props.coin]);

  useEffect(() => {
    if (orderBook)
      setOrderData(orderBook, count, setBidData, setAskData, setCount,false);
  }, [orderBook]);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        margin: "auto",
      }}
    >
      <Stack sx={{ margin: "auto", paddingRight: 1 }}>
        <OrderTable orderData={bidData} count={count} type="bid" />
      </Stack>
      <Stack sx={{ margin: "auto" }}>
        <OrderTable orderData={askData} count={count} type="ask" />
      </Stack>
    </Stack>
  );
}
