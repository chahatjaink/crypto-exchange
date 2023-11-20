import { config } from "@/configs/ohlcv.constant";
import {
  TableContainer,
  Table,
  Stack,
  TableRow,
  TableCell,
} from "@mui/material";
import { styled } from "@mui/system";

export const StyledStack = styled(Stack)({
  flexDirection: "row",
  justifyContent: "center",
  margin: "auto",
  marginRight: 50,
  marginLeft: 50,
});

export const InnerStack = styled(Stack)({
  margin: "auto",
  padding: 10,
});

export const StyledTableContainer = styled(TableContainer)({
  width: "100%",
  margin: "auto",
  backgroundColor: config.defaultColor,
  color: "white",
  borderRadius: 1,
});

export const StyledTable = styled(Table)({
  padding: "checkbox",
  minWidth: 500,
  borderCollapse: "collapse",
  ariaLabel: "caption table",
});

export const grayTextStyles = {
  color: "gray",
};

export const StyledHeadRow = styled(TableRow)({
  color: "gray",
});

export const StyledHeadCell = styled(TableCell)({
  color: "gray",
  border:"none"
});

export const StyledCell = styled(TableCell)({
  color: "white",
  padding: " 2px 18px",
  border: "none",
});
