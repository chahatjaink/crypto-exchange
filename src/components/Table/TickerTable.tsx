import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableSortLabel } from "@mui/material";
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { config } from "@/configs/ohlcv.constant";
import { GroupedData, TickerGroupedData, Tickers } from "@/interface";
import { StyledTableCell, StyledTableRow } from "./styles/TickerTable.styles";

interface Column {
  id: "name" | "last" | "24h" | "vol_usd";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
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

export default function TickersTable(props: {
  tickers: GroupedData | undefined;
  onClick: (symbol: string) => void;
}) {
  const [orderBy, setOrderBy] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc"); //enum

  const coinsArr: Array<string> = props.tickers
    ? Object.keys(props.tickers)
    : [];

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnId);
  };

  const sortedCoins = useMemo(() => {
    const sortedArr = [...coinsArr];

    switch (orderBy) {
      case "name":
        sortedArr.sort((a: string, b: string) => {
          return order === "asc" ? a.localeCompare(b) : b.localeCompare(a);
        });
        break;

      default:
        return sortedArr;
    }

    return sortedArr;
  }, [orderBy, order, coinsArr]);

  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table" size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id} align={column.align}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={() => handleSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        {sortedCoins.map((coin, coinIndex) => {
          const tickers = props.tickers?.[coin] || [];

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
                onClick={() => props.onClick(ticker.ticker.symbol)}
              >
                <StyledTableCell>{index === 0 ? coin : ""}</StyledTableCell>
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

          const firstTicker = tickers[0];
          const restTickers = tickers.slice(1);

          return (
            <TableBody key={coinIndex} sx={{ cursor: "pointer" }}>
              {renderTickerRow(firstTicker, 0)}
              {restTickers.map((ticker, tickerIndex) =>
                renderTickerRow(ticker, tickerIndex + 1)
              )}
            </TableBody>
          );
        })}
      </Table>
    </TableContainer>
  );
}
