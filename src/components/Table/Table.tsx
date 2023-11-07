/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { OrderData } from '@/interface';
import { Stack } from '@mui/material';
import OrderTable from './OrderTable';
import fetchBookData from '@/services/fetchBookData';
import { formatOrderBookData } from '@/util/formatOrderBookData';

//OrderBookTable component
export default function BasicTable(props: { orderBook: OrderData | undefined, coin: string }) {
    const [bidData, setBidData] = useState<Array<OrderData>>([]);
    const [askData, setAskData] = useState<Array<OrderData>>([]);
    const [count, setCount] = useState(0);

    //util 
    function setOrderData(order: OrderData) {
        setCount(prevCount => prevCount + 1)
        if (order?.amount > 0 && order?.amount != 1) {
            setBidData((prevData) => {
                if (prevData.length > 20) prevData.splice(count % 20, 1)
                return [...prevData, order];
            });
        } else if (order?.amount < 0 && order?.amount != -1) {
            setAskData(prevData => {
                if (prevData.length > 20) prevData.splice(count % 20, 1)
                return [...prevData, order];
            });
        }
    }
    //arrow function everywhere
    useEffect(() => {
        const fetchOrders = async () => {
            const orders: Array<Array<number>> = await fetchBookData(props.coin);
            const orderDataArr: Array<OrderData> = orders.map(order => formatOrderBookData(order))
            orderDataArr.forEach(orderData => setOrderData(orderData))
        }
        fetchOrders();
    }, [props.coin])

    useEffect(() => {
        if (props?.orderBook)
            setOrderData(props.orderBook)
    }, [props.orderBook])

    return (
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Stack >
                <OrderTable orderData={bidData} count={count} />
            </Stack>
            <Stack >
                <OrderTable orderData={askData} count={count} />
            </Stack>
        </Stack>
    );
}

