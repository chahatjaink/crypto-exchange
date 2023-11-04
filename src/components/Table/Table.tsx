/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { OrderData } from '@/interface';
import fetchOrdersData from '@/services/fetchOrdersData';
import { Stack } from '@mui/material';
import OrderTable from './OrderTable';

export default function BasicTable(props: { orderBook: any, token: string }) {
    const [bidData, setBidData] = useState<Array<OrderData>>([]);
    const [askData, setAskData] = useState<Array<OrderData>>([]);
    const [count, setCount] = useState(0);

    function setOrderData(orders: Array<OrderData>) {
        setCount(prevCount => prevCount + 1)
        orders.forEach(order => {
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
        })
    }

    useEffect(() => {
        async function fetchOrders() {
            const orders: Array<Array<number>> = await fetchOrdersData(props.token);
            const orderData: Array<OrderData> = orders.map(order => {
                return {
                    price: order[0],
                    count: order[1],
                    amount: order[2]
                }
            })
            setOrderData(orderData)
        }
        fetchOrders();
    }, [props.token])

    useEffect(() => {
        const orderArr = props.orderBook?.[1]
        const orders: Array<OrderData> = [
            {
                price: orderArr?.[0],
                count: orderArr?.[1],
                amount: orderArr?.[2],
            }
        ]
        setOrderData(orders)
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

