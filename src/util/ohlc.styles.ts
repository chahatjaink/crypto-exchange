import { styled } from '@mui/system';
import { Stack } from "@mui/material";
import { config } from '@/configs/ohlcv.constant';

export const ChartContainer = styled(Stack)(
    {
        backgroundColor: config.defaultColor,
    }
)