import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { OrderData } from '@/interface';
import fetchOrdersData from '@/services/fetchOrdersData';

export default function BasicTable(props: { orderBook: any, token: string }) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="caption table">
                <caption>Order Book</caption>
                <TableHead>
                    <TableRow>
                        <TableCell >Price</TableCell>
                        <TableCell >Count</TableCell>
                        <TableCell >Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.orderBook ? props.orderBook[1].map((row: any) => (
                            <TableCell key={`${props.orderBook[0]}${row}`}>
                                <TableRow key={`${props.orderBook[1][2]}`}>{row}</TableRow>
                            </TableCell>
                        )):null 
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
