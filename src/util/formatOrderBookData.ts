import { OrderData, OrderDataIndex } from "@/interface";

export const formatOrderBookData = (data: Array<number>): OrderData => {
    return {
        price: data[OrderDataIndex.Price],
        count: data[OrderDataIndex.Count],
        amount: data[OrderDataIndex.Amount]
    }
}