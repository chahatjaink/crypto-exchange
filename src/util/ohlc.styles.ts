import { styled } from '@mui/system';
import { Stack } from "@mui/material";
import { config } from '@/configs/ohlcv.constant';

export const ChartContainer = styled(Stack)(
    {
        display: "flex",
        backgroundColor: config.defaultColor,
        alignItems: "flex-start",
        margin: "auto",
    }
)