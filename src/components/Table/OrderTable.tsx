import { TableBody, TableHead, TableRow } from "@mui/material";
import { OrderData } from "@/interface";
import {
  StyledCell,
  StyledHeadCell,
  StyledHeadRow,
  StyledTable,
  StyledTableContainer,
  grayTextStyles,
} from "./styles/OrderTable.styles";
import React from "react";

export default function OrderTable(props: {
  orderData: Array<OrderData>;
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
    <StyledTableContainer>
      <StyledTable>
        <caption style={grayTextStyles}>Order Book</caption>
        <TableHead>
          <StyledHeadRow>
            {props.type === "bid"
              ? columns.map((column) => (
                  <StyledHeadCell key={column.name}>
                    {column.name.charAt(0).toUpperCase() + column.name.slice(1)}
                  </StyledHeadCell>
                ))
              : reversedColumns.map((column) => (
                  <StyledHeadCell key={column.name}>
                    {column.name.charAt(0).toUpperCase() + column.name.slice(1)}
                  </StyledHeadCell>
                ))}
          </StyledHeadRow>
        </TableHead>
        {props.orderData.length > 0
          ? props.orderData.map((row: any, index: number) => (
              <TableBody key={index}>
                <TableRow key={index}>
                  {props.type === "bid"
                    ? columns.map((column) => (
                        <StyledCell key={`${column.name}${index}`}>
                          {row[column.name as keyof typeof row]}
                        </StyledCell>
                      ))
                    : reversedColumns.map((column) => (
                        <StyledCell key={`${column.name}${index}`}>
                          {row[column.name as keyof typeof row]}
                        </StyledCell>
                      ))}
                </TableRow>
              </TableBody>
            ))
          : null}
      </StyledTable>
    </StyledTableContainer>
  );
}
