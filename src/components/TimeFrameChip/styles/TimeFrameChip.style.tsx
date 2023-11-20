import { config } from "@/configs/ohlcv.constant";
import { Chip } from "@mui/material";
import { styled } from "@mui/system";

export const StyledChip = styled(Chip)({
  borderRadius: 0.5,
  border: `1px solid ${config.defaultColor}`,
  color: "white",
});

export const StyledPara = styled("p")({
  position: "absolute",
  color: "grey",
  right: 20,
  bottom:50,
  fontSize: "14px",
});
