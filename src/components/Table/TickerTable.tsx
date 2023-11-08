import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Stack, TableSortLabel } from '@mui/material';
import { useState } from 'react';
import { config } from '@/configs/ohlcv.constant';
import { GroupedData, Tickers } from '@/interface';

interface Column {
    id: 'name' | 'last' | '24h' | 'vol_usd' | 'levarage';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}


const columns: readonly Column[] = [
    { id: 'name', label: 'NAME', minWidth: 60 },
    { id: 'last', label: 'LAST', minWidth: 60 },
    {
        id: '24h',
        label: '24H',
        minWidth: 60,
        align: 'right',
    },
    {
        id: 'vol_usd',
        label: 'VOL USD',
        minWidth: 60,
        align: 'right',
    },
    {
        id: 'levarage',
        label: '',
        minWidth: 60,
        align: 'right',
    },
];

interface Data {
    name: string;
    last: string;
    change: string;
    vol_usd: number;
    levarage: string;
}

export default function TickersTable(props: { tickers: GroupedData | undefined }) {

    const [orderBy, setOrderBy] = useState<string>('name');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const coinsArr: Array<string> = props.tickers ? Object.keys(props.tickers) : []

    const handleSort = (columnId: string) => {
        if (orderBy === columnId) {
            setOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setOrderBy(columnId);
            setOrder('asc');
        }
    };
    return (
        <div style={{ width: '30%', overflow: 'auto', maxHeight: '600px' }}>
            <Paper sx={{ width: '100%', borderRadius: 2 }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{ minWidth: 10 }}>
                                <TableCell
                                    key={columns[0].id}
                                    align={columns[0].align}
                                    sx={{ minWidth: 10, color: 'white', backgroundColor: config.defaultColor }}
                                >
                                    <TableSortLabel
                                        direction={order}
                                        onClick={() => handleSort(columns[0].id)}
                                    >
                                        {columns[0].label}
                                    </TableSortLabel>
                                </TableCell>
                                {columns.slice(1).map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        sx={{ minWidth: 10, color: 'white', backgroundColor: config.defaultColor }}
                                    >
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={order}
                                            onClick={() => handleSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {coinsArr.map((coin, coinIndex) => {
                                const tickers = props?.tickers?.[coin] || [];
                                return (
                                    <React.Fragment key={coinIndex}>
                                        <TableRow>
                                            <TableCell>{coin}</TableCell>
                                            <TableCell>{tickers[0].ticker.last_price} {tickers[0].currency}</TableCell>
                                            <TableCell>{tickers[0].ticker.change24H}</TableCell>
                                            <TableCell>{tickers[0].ticker.volume}</TableCell>
                                        </TableRow>
                                        {tickers.slice(1).map((ticker, tickerIndex) => {
                                            // console.log("TCL: TickersTable -> ticker", ticker)
                                            return (
                                                <TableRow key={tickerIndex}>
                                                    <TableCell></TableCell>
                                                    <TableCell>{ticker.ticker.last_price} {ticker.currency}</TableCell>
                                                    <TableCell>{ticker.ticker.change24H}</TableCell>
                                                    <TableCell>{ticker.ticker.volume}</TableCell>
                                                </TableRow>)
                                        }
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

