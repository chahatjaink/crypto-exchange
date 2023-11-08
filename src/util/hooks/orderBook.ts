import { OrderData, Order } from '@/interface';
import { useEffect, useState } from 'react';
import { formatOrderBookData } from '../formatOrderBookData';

function useOrderBook(coin: string): OrderData | undefined {
    const [orderBook, setOrderBook] = useState<OrderData>();

    useEffect(() => {
        const wsUrl: string = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "";
        const w = new WebSocket(wsUrl);

        w.onopen = () => {
            w.send(
                JSON.stringify({
                    event: 'subscribe',
                    channel: 'book',
                    symbol: `t${coin}USD`,
                })
            );

            w.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.event !== 'info' && data.event !== 'subscribed' && Array.isArray(data[Order.Book])) {
                    const orderBookData: OrderData = formatOrderBookData(data[Order.Book]);
                    setOrderBook(orderBookData);
                }
            };
        };

        return () => {
            return w.close();
        };
    }, [coin]);

    return orderBook;
}


export default useOrderBook;
