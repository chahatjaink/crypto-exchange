// util.js
import { OrderData } from "@/interface";
import { Dispatch, SetStateAction } from "react";

export function setOrderData(
    order: OrderData,
    count: number,
    setBidData: Dispatch<SetStateAction<OrderData[]>>,
    setAskData: Dispatch<SetStateAction<OrderData[]>>,
    setCount: Dispatch<SetStateAction<number>>
) {
    setCount((prevCount) => prevCount + 1);

    if (order?.amount > 0 && order?.amount !== 1) {
        setBidData((prevData) => {
            if (prevData.length > 20) prevData.splice(count % 20, 1);
            return [...prevData, order];
        });
    } else if (order?.amount < 0 && order?.amount !== -1) {
        setAskData((prevData) => {
            if (prevData.length > 20) prevData.splice(count % 20, 1);
            return [...prevData, order];
        });
    }
}
