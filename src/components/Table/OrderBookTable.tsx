/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { OrderData } from '@/interface';
import { Stack } from '@mui/material';
import OrderTable from './OrderTable';
import fetchBookData from '@/services/fetchBookData';
import { formatOrderBookData } from '@/util/formatOrderBookData';
import useOrderBook from '@/util/hooks/orderBook';
import { setOrderData } from '@/util/setOrderData';

export default function OrderBookTable(props: { coin: string }) {
    const [bidData, setBidData] = useState<Array<OrderData>>([]);
    const [askData, setAskData] = useState<Array<OrderData>>([]);
    const [count, setCount] = useState(0);
    const orderBook: OrderData | undefined = useOrderBook(props.coin);

    useEffect(() => {
        const fetchOrders = async () => {
            const orders: Array<Array<number>> = await fetchBookData(props.coin);
            const orderDataArr: Array<OrderData> = orders.map(order => formatOrderBookData(order))
            orderDataArr.forEach(orderData =>
                setOrderData(orderData, count, setBidData, setAskData, setCount)
            )
        }
        fetchOrders();
    }, [props.coin])

    useEffect(() => {
        if (orderBook)
            setOrderData(orderBook, count, setBidData, setAskData, setCount)
    }, [orderBook])

    return (
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Stack sx={{ display: 'block' }}>
                <OrderTable orderData={bidData} count={count} />
            </Stack>
            <Stack sx={{ display: 'inline-block' }}>
                <OrderTable orderData={askData} count={count} />
            </Stack>
        </Stack>
    );
}

