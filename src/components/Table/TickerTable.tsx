import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableSortLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { config } from '@/configs/ohlcv.constant';
import { GroupedData } from '@/interface';
import { StyledTableCell } from './styles/TickerTable.styles';

interface Column {
    id: 'name' | 'last' | '24h' | 'vol_usd';
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
    },
    {
        id: 'vol_usd',
        label: 'VOL USD',
        minWidth: 60,
    }
];

export default function TickersTable(props: { tickers: GroupedData | undefined, onClick: any }) {

    const [orderBy, setOrderBy] = useState<string>('');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const coinsArr: Array<string> = props.tickers ? Object.keys(props.tickers) : []

    const handleSort = (columnId: string) => {
        const isAsc = orderBy === columnId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(columnId);
    };

    useEffect(() => {
        switch (orderBy) {
            case 'name':
                coinsArr.sort((a: string, b: string) => {
                    if (order === 'asc')
                        return a.localeCompare(b)
                    else
                        return b.localeCompare(a)
                })
                break;

            default:
                break;
        }
    }, [orderBy, order])

    return (
        <TableContainer>
            <Table stickyHeader aria-label="sticky table" size='small'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell key={columns[0].id}>
                            <TableSortLabel
                                active={orderBy === columns[0].id}
                                direction={orderBy === columns[0].id ? order : 'asc'}
                                onClick={() => handleSort(columns[0].id)}
                            >
                                {columns[0].label}
                            </TableSortLabel>
                        </StyledTableCell>
                        {columns.slice(1).map((column) => (
                            <StyledTableCell
                                key={column.id}
                                align={column.align}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'}
                                    onClick={() => handleSort(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {coinsArr.map((coin, coinIndex) => {
                    const tickers = props.tickers?.[coin] || [];
                    const changeFirstColor = { color: tickers[0].ticker.change24H > 0 ? config.upColor : config.downColor }
                    return (
                        <TableBody key={coinIndex} sx={{ cursor: 'pointer' }}>
                            <TableRow sx={{ color: 'white', backgroundColor: config.defaultColor, border: 'none' }} onClick={() => props.onClick(tickers[0].ticker.symbol)}>
                                <StyledTableCell>{coin}</StyledTableCell>
                                <StyledTableCell>{tickers[0].ticker.last_price} <span style={{ color: 'grey' }}>{tickers[0].currency}</span></StyledTableCell>
                                <StyledTableCell sx={changeFirstColor}>{tickers[0].ticker.change24H}%</StyledTableCell>
                                <StyledTableCell>{tickers[0].ticker.volume}</StyledTableCell>
                            </TableRow>
                            {tickers.slice(1).map((ticker, tickerIndex) => {
                                const changeColor = { color: ticker.ticker.change24H > 0 ? config.upColor : config.downColor }
                                return (
                                    <TableRow key={tickerIndex} sx={{
                                        color: 'white', backgroundColor: config.defaultColor,
                                        border: 'none', hover: {
                                            border: '1px solid black',
                                        },
                                    }} onClick={() => props.onClick(ticker.ticker.symbol)}>
                                        <StyledTableCell></StyledTableCell>
                                        <StyledTableCell>{ticker.ticker.last_price} <span style={{ color: 'grey' }}>{ticker.currency}</span></StyledTableCell>
                                        <StyledTableCell sx={changeColor} >{ticker.ticker.change24H}%</StyledTableCell>
                                        <StyledTableCell>{ticker.ticker.volume}</StyledTableCell>
                                    </TableRow>)
                            }
                            )}
                        </TableBody>
                    );
                })}
            </Table>
        </TableContainer>
    );
}

