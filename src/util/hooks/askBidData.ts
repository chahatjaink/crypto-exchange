import { OrderData } from "@/interface";
import fetchBookData from "@/services/fetchBookData";
import { useEffect, useState } from "react";
import { formatOrderBookData } from "../formatOrderBookData";

interface OrderBookResponse {
  askData: OrderData[];
  bidData: OrderData[];
}

export default function useAskBidData(
  selectedCoin: string,
  orderBook: OrderData | undefined
): OrderBookResponse {
  const [bidData, setBidData] = useState<Array<OrderData>>([]);
  const [askData, setAskData] = useState<Array<OrderData>>([]);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders: Array<Array<number>> = await fetchBookData(selectedCoin);
      const orderDataArr: Array<OrderData> = orders.map((order) =>
        formatOrderBookData(order)
      );
      orderDataArr.map((orderData) => setOrderData(orderData, orderCount));
    };
    fetchOrders();
  }, [selectedCoin, orderCount]);

  useEffect(() => {
    if (orderBook) setOrderData(orderBook, orderCount);
  }, [orderBook, orderCount]);

  const getTotalValueAtPrice = (
    totalValue: number,
    price: number,
    orderBook: Array<OrderData>
  ): number => {
    for (const order of orderBook) {
      if (order.price === price) {
        totalValue += order.amount;
      }
    }

    return totalValue;
  };

  function setOrderData(order: OrderData, count: number) {
    setOrderCount((prevCount) => prevCount + 1);

    if (order?.amount > 0 && order?.amount !== 1) {
      setBidData((prevData) => {
        order.total = Number(
          getTotalValueAtPrice(order.total, order.price, prevData).toFixed(2)
        );
        if (prevData.length > 25) prevData.splice(count % 25, 1);
        return [...prevData, order];
      });
    } else if (order?.amount < 0 && order?.amount !== -1) {
      setAskData((prevData) => {
        order.total = Number(
          getTotalValueAtPrice(order.total, order.price, prevData).toFixed(2)
        );
        if (prevData.length > 25) prevData.splice(count % 25, 1);
        return [...prevData, order];
      });
    }
  }

  return { askData, bidData };
}
