// util.js
import { OrderData } from "@/interface";
import { Dispatch, SetStateAction } from "react";

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

export function setOrderData(
  order: OrderData,
  count: number,
  setBidData: Dispatch<SetStateAction<OrderData[]>>,
  setAskData: Dispatch<SetStateAction<OrderData[]>>,
  setCount: Dispatch<SetStateAction<number>>,
  isInitial: boolean
) {
  setCount((prevCount) => prevCount + 1);

  if (order?.amount > 0 && order?.amount !== 1) {
    setBidData((prevData) => {
      order.total = Number(
        getTotalValueAtPrice(order.total, order.price, prevData).toFixed(2)
      );
      if (prevData.length > 35) prevData.splice(count % 35, 1);
      return [...prevData, order];
    });
  } else if (order?.amount < 0 && order?.amount !== -1) {
    setAskData((prevData) => {
      order.total = Number(
        getTotalValueAtPrice(order.total,order.price, prevData).toFixed(2)
      );
      if (prevData.length > 35) prevData.splice(count % 35, 1);
      return [...prevData, order];
    });
  }
}
