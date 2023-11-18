import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { OrderData } from "@/interface";
import { config } from "@/configs/ohlcv.constant";
import { StyledTableCell } from "./styles/TickerTable.styles";

export default function OrderTable(props: {
  orderData: Array<OrderData>;
  count: number;
  type: string;
}) {
  const columns = [
    { name: "Count" },
    { name: "Amount" },
    { name: "Total" },
    { name: "Price" },
  ];
  const reversedColumns = [
    { name: "Price" },
    { name: "Total" },
    { name: "Amount" },
    { name: "Count" },
  ];
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        margin: "auto",
        backgroundColor: config.defaultColor,
        color: "white",
      }}
    >
      <Table
        padding="checkbox"
        sx={{ minWidth: 500, borderCollapse: "collapse" }}
        aria-label="caption table"
      >
        <caption>Order Book</caption>
        <TableHead>
          <TableRow sx={{ color: "GrayText" }}>
            {props.type === "bid"
              ? columns.map((column) => (
                  <TableCell sx={{ color: "GrayText" }} key={column.name}>{column.name}</TableCell>
                ))
              : reversedColumns.map((column) => (     
                  <TableCell sx={{ color: "GrayText" }} key={column.name}>{column.name}</TableCell>
                ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.orderData.length > 0
            ? props.orderData.map((row: OrderData, index: number) => (
                <TableRow key={index} >
                  <StyledTableCell sx={{ color: "white" }} key={`count${index}`}>{row.count}</StyledTableCell>
                  <StyledTableCell key={`amount${index}`}>{row.amount}</StyledTableCell>
                  <StyledTableCell key={`total${index}`}>{row.total}</StyledTableCell>
                  <StyledTableCell key={`price${index}`}>{row.price}</StyledTableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
