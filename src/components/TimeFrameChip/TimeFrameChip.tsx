import React from "react";
import Stack from "@mui/material/Stack";
import { config } from "@/configs/ohlcv.constant";
import { StyledChip, StyledPara } from "./styles/TimeFrameChip.style";

export default function TimeFrameChips(props: {
  // eslint-disable-next-line no-unused-vars
  onSelect: (label: string) => void;
  selectedLabel: string | null;
}) {
  return (
    <Stack direction="row" gap={1}>
      {config.timeFrameOptions.map((label, labeIndex) => (
        <StyledChip
          key={labeIndex + label}
          label={label}
          onClick={() => props.onSelect(label)}
          color={props.selectedLabel === label ? "primary" : "default"}
        />
      ))}
      <StyledPara>
        X-Axis: Time
        <br />
        Y-Axis: Price
      </StyledPara>
    </Stack>
  );
}
