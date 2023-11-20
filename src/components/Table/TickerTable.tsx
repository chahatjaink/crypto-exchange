/* eslint-disable no-unused-vars */
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableSortLabel } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { config } from "@/configs/ohlcv.constant";
import { TickerGroupedData, Tickers, TickersState } from "@/interface";
import { StyledTableCell, StyledTableRow } from "./styles/TickerTable.styles";
import { useDispatch } from "react-redux";
import { coinActions } from "@/store/coinSlice";
import { useSelector } from "react-redux";
import { getTickersData } from "@/store/ticker-actions";
import { AppDispatch } from "@/store";

interface Column {
  id: "name" | "last" | "24h" | "vol_usd";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

enum Order {
  Ascending = "asc",
  Descending = "desc",
}

const columns: readonly Column[] = [
  { id: "name", label: "NAME", minWidth: 60 },
  { id: "last", label: "LAST", minWidth: 60 },
  {
    id: "24h",
    label: "24H",
    minWidth: 60,
  },
  {
    id: "vol_usd",
    label: "VOL USD",
    minWidth: 60,
  },
];

export default function TickersTable() {
  const [orderBy, setOrderBy] = useState<string>("");
  const [order, setOrder] = useState<Order>(Order.Ascending);
  const dispatch: AppDispatch = useDispatch();
  const tickers = useSelector((state: TickersState) => state.tickers);

  useEffect(() => {
    dispatch(getTickersData());
  }, [dispatch]);

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrder(isAsc ? Order.Descending : Order.Ascending);
    setOrderBy(columnId);
  };

  const handleTokenFromTicker = (symbol: string) => {
    dispatch(coinActions.setCoin(symbol));
  };

  const sortedCoins = useMemo(() => {
    const coinsArr: Array<string> = tickers ? Object.keys(tickers) : [];
    const sortedArr = [...coinsArr];

    switch (orderBy) {
      case "name":
        sortedArr.sort((a: string, b: string) => {
          return order === Order.Ascending
            ? a.localeCompare(b)
            : b.localeCompare(a);
        });
        break;

      default:
        return sortedArr;
    }

    return sortedArr;
  }, [orderBy, order, tickers]);

  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table" size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id} align={column.align}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : Order.Ascending}
                  onClick={() => handleSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        {sortedCoins.map((selectedCoin, coinIndex) => {
          const tickersArr = tickers?.[selectedCoin] || [];

          const renderTickerRow = (
            ticker: TickerGroupedData,
            index: number
          ) => {
            const change24HColor = {
              color:
                ticker.ticker.change24H > 0 ? config.upColor : config.downColor,
            };
            return (
              <StyledTableRow
                key={index}
                onClick={() => handleTokenFromTicker(ticker.ticker.symbol)}
              >
                <StyledTableCell>
                  {index === 0 ? selectedCoin : ""}
                </StyledTableCell>
                <StyledTableCell>
                  {ticker.ticker.last_price}{" "}
                  <span style={{ color: "grey" }}>{ticker.currency}</span>
                </StyledTableCell>
                <StyledTableCell sx={change24HColor}>
                  {ticker.ticker.change24H}%
                </StyledTableCell>
                <StyledTableCell>{ticker.ticker.volume}</StyledTableCell>
              </StyledTableRow>
            );
          };

          const firstTicker = tickersArr[0];
          const restTickers = tickersArr.slice(1);

          return (
            <TableBody key={coinIndex} sx={{ cursor: "pointer" }}>
              {renderTickerRow(firstTicker, 0)}
              {restTickers.map((ticker, tickerIndex: number) =>
                renderTickerRow(ticker, tickerIndex + 1)
              )}
            </TableBody>
          );
        })}
      </Table>
    </TableContainer>
  );
}
