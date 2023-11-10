import { styled } from '@mui/system';
import { Stack } from "@mui/material";
import { config } from '@/configs/ohlcv.constant';

export const ChartContainer = styled(Stack)(
    {
        backgroundColor: config.defaultColor,
    }
)

export const TickerChartContainer = styled(Stack)(
    { flexDirection: 'row', gap: 6, margin: 'auto', height: '88vh' })

export const MainStack = styled(Stack)(
    {
        backgroundColor: 'black',
        height: '100vh'
    }
)
