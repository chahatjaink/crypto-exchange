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
    { name: "count" },
    { name: "amount" },
    { name: "total" },
    { name: "price" },
  ];

  const reversedColumns = [
    { name: "price" },
    { name: "total" },
    { name: "amount" },
    { name: "count" },
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
        <caption style={{color:"GrayText"}}>Order Book</caption>
        <TableHead>
          <TableRow sx={{ color: "GrayText" }}>
            {props.type === "bid"
              ? columns.map((column) => (
                  <TableCell sx={{ color: "GrayText" }} key={column.name}>
                    {column.name.charAt(0).toUpperCase() + column.name.slice(1)}
                  </TableCell>
                ))
                : reversedColumns.map((column) => (
                  <TableCell sx={{ color: "GrayText" }} key={column.name}>
                    {column.name.charAt(0).toUpperCase() + column.name.slice(1)}
                  </TableCell>
                ))}
          </TableRow>
        </TableHead>
        {props.orderData.length > 0
          ? props.orderData.map((row: any, index: number) => (
              <TableBody>
                <TableRow key={index}>
                  {props.type === "bid"
                    ? columns.map((column) => (
                        <StyledTableCell key={`${column.name}${index}`}>
                          {row[column.name as keyof typeof row]}
                        </StyledTableCell>
                      ))
                    : reversedColumns.map((column) => (
                        <StyledTableCell key={`${column.name}${index}`}>
                          {row[column.name as keyof typeof row]}
                        </StyledTableCell>
                      ))}
                </TableRow>
              </TableBody>
            ))
          : null}
      </Table>
    </TableContainer>
  );
}
