import { styled } from "@mui/system";
import { TableCell, TableRow } from "@mui/material";
import { config } from "@/configs/ohlcv.constant";

export const StyledTableRow = styled(TableRow)({
  color: "white",
  backgroundColor: config.defaultColor,
  borderRadius: 0.5,
  border: `1px solid ${config.defaultColor}`,
});

export const StyledTableCell = styled(TableCell)({
  color: "white",
  backgroundColor: config.defaultColor,
  border: "none",
  padding: " 1px 5px",
});
